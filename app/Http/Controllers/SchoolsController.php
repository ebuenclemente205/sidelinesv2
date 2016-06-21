<?php

namespace sidelines\Http\Controllers;

use Illuminate\Http\Request;

use sidelines\School;
use sidelines\Company;
use sidelines\Notification;
use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;

class SchoolsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $schools = School::all();

        return view('schools.index', compact('schools'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if(School::where('id', $id)->exists())
        {
            $school = School::find($id);

            return view('schools.show', compact('school'));
        }
        else
        {
            return \Redirect::route('schools.index');
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if(School::where('id', $id)->exists())
        {
            $school = School::find($id);

            return view('schools.edit')
                ->with('school', $school);
        }
        else
        {
            return \Redirect::route('schools.index');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $school = School::find($id);

        if(count($request->all()) > 0)
        {
            if(!empty($request->file('image')))
            {
                $image = $request->file('image');
                $filename  = time() . rand(1, 9999) . '.' . $image->getClientOriginalExtension();

                $request->file('image')->move(
                    base_path() . '/public/img/profilepics', $filename //pass to image field
                );

                $school->user->update([
                    'image' => $filename,
                ]);
            }
        }

        $school->user->update([
            'email' => $request['email'],
        ]);

        $school->update($request->all());

        return \Redirect::route('users.show', $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function requestPartnership(Request $request)
    {
        \Auth::user()->userable->partners()->attach(array($request['company_id'] => array('status' => 3)));

        $notify_partnership = new Notification();
        $notify_partnership->user_type = 'c';
        $notify_partnership->c_status = 1;
        $notify_partnership->notification_type = 'partnership';

        \Auth::user()->notifications_sent()->save($notify_partnership);

        $company = Company::find($request['company_id']);
        $company->user->notifications_received()->save($notify_partnership);

        return \Redirect::route('companies.index');
    }

    public function acceptPartnership(Request $request)
    {
        \Auth::user()->userable->partners()->updateExistingPivot($request['company_id'], array('status' => 1));

        return \Redirect::route('companies.index')->with(['flash_message' => 'Successfully partnered !']);
    }

    public function cancelPartnership(Request $request)
    {
        \Auth::user()->userable->partners()->detach($request['company_id']);

        return \Redirect::route('companies.index')->with(['remove_message' => 'Partnership removed']);
    }
}
