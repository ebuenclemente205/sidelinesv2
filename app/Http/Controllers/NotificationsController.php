<?php

namespace sidelines\Http\Controllers;

use Illuminate\Http\Request;

use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;

use sidelines\Notification;

class NotificationsController extends Controller
{
    public function index()
    {
        $notifications = \Auth::user()->notifications_received;

        return view('pages.notifications', compact('notifications'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $notification = Notification::find($id);

        if(\Auth::user()->user_type == 's')
        {
            $notification->s_status = 0;
            $notification->save();
        }
        elseif(\Auth::user()->user_type == 'c')
        {
            $notification->c_status = 0;
            $notification->save();
        }
        elseif(\Auth::user()->user_type == 'd' || \Auth::user()->user_type == 'f' )
        {
            $notification->f_status = 0;
            $notification->save();
        }
        elseif(\Auth::user()->user_type == 'sa')
        {
            $notification->sa_status = 0;
            $notification->save();
        }
        elseif(\Auth::user()->user_type == 'admin')
        {
            $notification->admin_status = 0;
            $notification->save();
        }

        if($notification->notification_type == 'recommendation')
        {
            if(\Auth::user()->user_type == 's')
            {
                $recommendation = \Auth::user()->userable->recommendations()->where('dean_faculty_id', '=', $notification->sender->userable->id)->first();

                return \Redirect::route('recommendations.show', $recommendation->pivot->id);
            }
            elseif(\Auth::user()->user_type == 'c' || \Auth::user()->user_type == 'sa')
            {
                $recommendation = \DB::table('recommendations')->where('dean_faculty_id', '=', $notification->sender->userable->id)->first();

                return \Redirect::route('recommendations.show', $recommendation->id);
            }
        }
        if($notification->notification_type == 'application')
        {
            return \Redirect::route('application.index');
        }
        if($notification->notification_type == 'partnership')
        {
            if(\Auth::user()->user_type == 'c')
            {
                return \Redirect::route('schools.index');
            }
            elseif(\Auth::user()->user_type == 'sa')
            {
                return \Redirect::route('companies.index');
            }
        }
        if($notification->notification_type == 'hirement')
        {
            if(\Auth::user()->user_type == 's')
            {
                return \Redirect::route('payments.index');
            }
            elseif(\Auth::user()->user_type == 'admin')
            {
                return \Redirect::route('payments.index');
            }
        }
    }
}
