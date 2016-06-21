<?php

namespace sidelines\Http\Controllers\Admin;

use Illuminate\Http\Request;

use sidelines\User;
use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
    }

    public function retrieve($id)
    {
        $user = User::find($id);

        if(!empty($user->image) || $user->image != null)
        {
            \File::delete(public_path('img/profilepics/' . $user->image));
        }

        $user->userable->status = '1';
        $user->userable->save();

        $user->status = '1';
        $user->save();

        if($user->user_type === 's')
        {
            return \Redirect::to('admin/students');
        }
        else if($user->user_type === 'd' || $user->user_type === 'f')
        {
            return \Redirect::to('admin/faculties');
        }
        else if($user->user_type === 'c')
        {
            return \Redirect::to('admin/companies');
        }
        else if($user->user_type === 'sa')
        {
            return \Redirect::to('admin/schools');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if(!empty($user->image) || $user->image != null)
        {
            \File::delete(public_path('img/profilepics/' . $user->image));
        }

        $user->userable->status = '0';
        $user->userable->save();

        $user->status = '0';
        $user->save();

        if($user->user_type === 's')
        {
            return \Redirect::to('admin/students');
        }
        else if($user->user_type === 'd' || $user->user_type === 'f')
        {
            return \Redirect::to('admin/faculties');
        }
        else if($user->user_type === 'c')
        {
            return \Redirect::to('admin/companies');
        }
        else if($user->user_type === 'sa')
        {
            return \Redirect::to('admin/schools');
        }
    }

    public function forceDelete($id)
    {
        $user = User::find($id);

        if(!empty($user->image) || $user->image != null)
        {
            \File::delete(public_path('img/profilepics/' . $user->image));
        }

        $user->userable->delete();

        if($user->user_type === 's')
        {
            $user->delete();
            return \Redirect::to('admin/students');
        }
        else if($user->user_type === 'd' || $user->user_type === 'f')
        {
            $user->delete();
            return \Redirect::to('admin/faculties');
        }
        else if($user->user_type === 'c')
        {
            $user->delete();
            return \Redirect::to('admin/companies');
        }
        else if($user->user_type === 'sa')
        {
            $user->delete();
            return \Redirect::to('admin/schools');
        }
    }
}
