<?php

namespace sidelines\Http\Controllers;


define("PP_CONFIG_PATH", '..\vendor\paypal\sdk-core-php\tests');

use Illuminate\Http\Request;

use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;
use PayPal\Rest\ApiContext;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\RedirectUrls;
use PayPal\Api\ExecutePayment;
use PayPal\Api\PaymentExecution;
use PayPal\Api\Transaction;

use sidelines\Student;
use sidelines\Notification;
use sidelines\User;

class PaymentsController extends Controller
{
    private $_api_context;

    public function __construct()
    {
        // setup PayPal api context
        $this->middleware('payment', ['except' => 'index']);

        $paypal_conf = \Config::get('paypal');
        $this->_api_context = new ApiContext(new OAuthTokenCredential($paypal_conf['client_id'], $paypal_conf['secret']));
        $this->_api_context->setConfig($paypal_conf['settings']);
    }

    public function show($id)
    {
        $payer = \sidelines\Payment::find($id);
        return view('payments.details', compact('payer'));
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function index()
     {
        if(\Auth::check())
        {
            if(\Auth::user()->user_type == 'c')
                $payments = \sidelines\Payment::where('company_id', \Auth::user()->userable->id)->orderBy('created_at', 'DESC')->paginate(15);
            elseif(\Auth::user()->user_type == 'admin')
                $payments = \sidelines\Payment::orderBy('created_at', 'DESC')->paginate(20);
            else
                return \Redirect::route('jobs.index');
        }
        else
            return \Redirect::route('jobs.index');

        return view('payments.index', compact('payments'));
     }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function postCreate(Request $request)
    {
        $student_id = $request['student_id'];

        return view('payments.create', compact('student_id'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $payer = new Payer();
        $payer->setPaymentMethod('paypal');

        $item_1 = new Item();
        $item_1->setName('Hire a student') // item name
            ->setCurrency('PHP')
            ->setQuantity(1)
            ->setPrice(6260); // unit price

        // add item to list
        $item_list = new ItemList();
        $item_list->setItems(array($item_1));

        $amount = new Amount();
        $amount->setCurrency('PHP')
            ->setTotal(6260);

        $transaction = new Transaction();
        $transaction->setAmount($amount)
            ->setItemList($item_list)
            ->setDescription('Your transaction description');

        $redirect_urls = new RedirectUrls();
        $redirect_urls->setReturnUrl(\URL::route('payments.status'))
            ->setCancelUrl(\URL::route('payments.status'));

        $payment = new Payment();
        $payment->setIntent('Sale')
            ->setPayer($payer)
            ->setRedirectUrls($redirect_urls)
            ->setTransactions(array($transaction));

        try {
            $payment->create($this->_api_context);
        } catch (\PayPal\Exception\PPConnectionException $ex) {
            if (\Config::get('app.debug')) {
                echo "Exception: " . $ex->getMessage() . PHP_EOL;
                $err_data = json_decode($ex->getData(), true);
                exit;
            } else {
                die('Some error occur, sorry for inconvenient');
            }
        }

        foreach($payment->getLinks() as $link) {
            if($link->getRel() == 'approval_url') {
                $redirect_url = $link->getHref();
                break;
            }
        }

        // add payment ID to session
        \Session::put('paypal_payment_id', $payment->getId());
        \Session::put('student_id', $request['student_id']);

        if(isset($redirect_url)) {
            // redirect to paypal
            return \Redirect::away($redirect_url);
        }

        return \Redirect::route('original.route')
            ->with('error', 'Unknown error occurred');
    }

    public function getPaymentStatus()
    {
        // Get the payment ID before session clear
        $payment_id = \Session::get('paypal_payment_id');
        $student_id = \Session::get('student_id');

        // clear the session payment ID and student ID
        \Session::forget('paypal_payment_id');
        \Session::forget('student_id');

        if (empty(\Input::get('PayerID')) || empty(\Input::get('token'))) {
            return \Redirect::route('payments.index')
                ->with('error', 'Payment failed');
        }

        $payment = Payment::get($payment_id, $this->_api_context);

        // PaymentExecution object includes information necessary
        // to execute a PayPal account payment.
        // The payer_id is added to the request query parameters
        // when the user is redirected from paypal back to your site
        $execution = new PaymentExecution();
        $execution->setPayerId(\Input::get('PayerID'));

        //Execute the payment
        $result = $payment->execute($execution, $this->_api_context);

        // Display JSON
        //echo '<pre>';print_r($result);echo '</pre>';exit; // DEBUG RESULT, remove it later

        $payer_details = json_decode($result);
        $payer = new \sidelines\Payment();

        //Payer details
        $payer->payer_id    = \Input::get('PayerID');
        $payer->payer_name  = $payer_details->payer->payer_info->shipping_address->recipient_name;
        $payer->email       = $payer_details->payer->payer_info->email;
        $payer->phone       = $payer_details->payer->payer_info->phone;
        $payer->paypal_id  = $payment_id;
        $payer->payment_method = 'paypal';
        $payer->token       = \Input::get('token');

        foreach($payer_details->transactions as $transaction)
        {
            $payer->amount = $transaction->amount->total;
        }

        $student = Student::find($student_id);
        $student->status = 2;
        $student->save();

        //save payments table with company_id
        \Auth::user()->userable->payments()->save($payer);
        //save student_id
        $student->payments()->save($payer);

        //notify super admin
        $admins = User::where('user_type', 'admin')->get();
        foreach($admins as $admin)
        {
            $notify = new Notification();
            $notify->user_type = 'admin';
            $notify->admin_status = 1;
            $notify->notification_type = 'hirement';
            \Auth::user()->notifications_sent()->save($notify);

            $admin->notifications_received()->save($notify);
        }

        //Student Notification
        $notify = new Notification();
        $notify->user_type = 's';
        $notify->s_status = 1;
        $notify->notification_type = 'hirement';

        \Auth::user()->notifications_sent()->save($notify);

        $student = Student::find($student_id);
        $student->user->notifications_received()->save($notify);

        return \Redirect::route('payments.index');

    }
}
