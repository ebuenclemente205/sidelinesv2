<?php

namespace sidelines\Http\Controllers\Auth;

use sidelines\User;
use sidelines\Student;
use sidelines\Company;
use sidelines\School;
use sidelines\DeanFaculty;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Registrar;
use sidelines\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    // Redirect to this path after registration or login.
    protected $redirectPath = '/';
    protected $redirectAfterLogout = '/';
    protected $loginPath = '/login';

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('account', ['except' => ['getLogout', 'confirm']]);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        $rules = [
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6',
        ];

        $validator = Validator::make($data, $rules);

        return $validator;
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        $confirmation_code = str_random(30);

        $user = User::create([
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'confirmation_code' => $confirmation_code
        ]);

        $this->redirectPath = '/' . $user->id;
        $user_email = $data['email'];

        \Mail::send('email.welcome', ['user' => $user, 'data' => $data], function($message) use ($user) {
            $message->subject('Verification');
            $message->to($user->email);
        });

        \Mail::send('email.newuser', ['user' => $user], function($message)  {
            $message->subject('Registration');
            $message->to('sidelinesasia@gmail.com');
        });

        /* ADMIN REGISTRATION */
        // if($user_type === 'admin')
        // {
        //     $this->redirectPath = '/';
        //     $user = User::create([
        //         'email' => $data['email'],
        //         'password' => bcrypt($data['password']),
        //         'user_type' => 'admin',
        //     ]);
        //
        //     return $user;
        // }   D

        return $user;
    }

    public function registerByUserType(Request $request)
    {
        if($request['user_type'] === 's')
        {
            $schools = School::lists('name', 'id');

            return view('auth.register_student')->with('schools', $schools);
        }
        else if($request['user_type'] === 'sa')
        {
            return view('auth.register_schooladmin');
        }
        else if($request['user_type'] === 'df')
        {
            $schools = School::lists('name', 'id');

            return view('auth.register_faculty')->with('schools', $schools);
        }
        else if($request['user_type'] === 'c')
        {
            return view('auth.register_company');
        }
    }

    public function getStudentRegister()
    {
        $schools = School::lists('name', 'id');

        return view('auth.register_student')->with('schools', $schools);
    }

    public function signUpAsStudent(Request $request)
    {
        $schools = School::lists('name', 'id');

        return view('auth.register_student')->with('schools', $schools);
    }

    public function getCompanyRegister()
    {
        return view('auth.register_company');
    }

    public function signUpAsCompany(Request $request)
    {
        return view('auth.register_company');
    }

    public function getSchoolAdminRegister()
    {
        return view('auth.register_schooladmin');
    }

    public function signUpAsSchoolAdmin(Request $request)
    {
        return view('auth.register_schooladmin');
    }

    public function getDeanFacultyRegister()
    {
        $schools = School::lists('name', 'id');

        return view('auth.register_faculty')->with('schools', $schools);
    }

    public function signUpAsDeanFaculty(Request $request)
    {
        $schools = School::lists('name', 'id');

        return view('auth.register_faculty')->with('schools', $schools);
    }

    public function authenticated(Request $request, User $user)
    {
        if($user->user_type === 's')
        {
            if($user->registration_status < 3)
            {
                $this->redirectPath = '/' . \Auth::user()->id . '/pickuser/student';
            }
            elseif($user->registration_status == 3 && $user->confirmed == 0)
            {
                $this->redirectPath = $user->id . '/verify' ;
            }
            else
            {
                $this->redirectPath = '/' . $user->id;
            }
        }
        else if($user->user_type === 'sa')
        {
            $this->redirectPath = '/students';
        }
        else if($user->user_type === 'c')
        {
            $this->redirectPath = '/recommendations';
        }
        else if($user->user_type === 'd' || $user->user_type === 'f')
        {
            $this->redirectPath = '/applications';
        }
        else if($user->user_type === 'admin')
        {
            $this->redirectPath = '/jobs';
        }
        else
        {
            $this->redirectPath = '/' . \Auth::user()->id . '/pickuser';
        }

        return redirect()->intended($this->redirectPath());
    }

    public function registerAsAdmin()
    {
        return view('admin.register');
    }


    public function getRegister()
    {
        return view('auth.signup');
    }
    /**
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function postRegister(Request $request)
    {
        $validator = $this->validator($request->all());

        if ($validator->fails()) {
            $this->throwValidationException(
                $request, $validator
            );
        }

        $remember = true;

        \Auth::login($this->create($request->all()), $remember);

        if(\Auth::check())
        {
            if(\Auth::user()->user_type === 'admin')
            {
                $this->redirectPath = '/';
            }
            else
            {
                $this->redirectPath = '/' . \Auth::user()->id . '/pickuser';
            }
        }

        return redirect($this->redirectPath())->with([
            'flash_login' => 1,
        ]);
    }

    public function confirm($id, $confirmation_code)
    {
        if( ! $confirmation_code)
        {
            throw new InvalidConfirmationCodeException;
        }

        $user = User::find($id)->whereConfirmationCode($confirmation_code)->first();

        if ( ! $user)
        {
            $this->redirectPath = '/' . $id . '/verify';
        }
        else
        {
            $user->confirmed = 1;
            $user->confirmation_code = null;
            $user->save();

            if($user->user_type === 's')
            {
                //$this->redirectPath = '/jobs';

                if($user->registration_status < 3)
                {
                    $this->redirectPath = '/' . \Auth::user()->id . '/pickuser/student';
                }
                else
                {
                    $this->redirectPath = '/' . $user->id;
                }
            }
        }

        return redirect()->intended($this->redirectPath());
    }
}
