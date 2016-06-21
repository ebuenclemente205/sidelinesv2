<?php

namespace sidelines\Http\Controllers;

use Illuminate\Http\Request;

use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;
use sidelines\Company;
use sidelines\Notification;
use sidelines\School;

class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companies = Company::all();

        return view('companies.index', compact('companies'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $company = Company::find($id);

        return view('companies.show', compact('company'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $company = Company::find($id);

        return view('companies.edit', compact('company'));
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
        $company = Company::find($id);

        if(count($request->all()) > 0)
        {
            if(!empty($request->file('image')))
            {
                $image = $request->file('image');
                $filename  = time() . rand(1, 9999) . '.' . $image->getClientOriginalExtension();

                $request->file('image')->move(
                    base_path() . '/public/img/profilepics', $filename //pass to image field
                );

                $company->user->update([
                    'image' => $filename,
                ]);

                dd($filename);
            }
        }

        $company->user->update([
            'email' => $request['email'],
        ]);

        $company->update($request->all());

        return \Redirect::route('companies.show', $id);
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

    public function getJobsPosted($id)
    {
        $company = Company::with('jobs')->find($id);

        if($company != null)
        {
            $jobs = $company->jobs;
            return view('companies.jobPost', compact('jobs'));
        }
        else
        {
            return \Redirect::route('companies.index');
        }
        // TODO: return view('')->with('jobs_posted', $company->jobs);
    }

    public function requestPartnership(Request $request)
    {
        \Auth::user()->userable->partners()->attach(array($request['school_id'] => array('status' => 2)));

        //School admin Notification
        $notify_partnership = new Notification();
        $notify_partnership->user_type = 'sa';
        $notify_partnership->sa_status = 1;
        $notify_partnership->notification_type = 'partnership';

        \Auth::user()->notifications_sent()->save($notify_partnership);

        $school = School::find($request['school_id']);
        $school->user->notifications_received()->save($notify_partnership);

        return \Redirect::route('schools.index');
    }

    public function acceptPartnership(Request $request)
    {
        \Auth::user()->userable->partners()->updateExistingPivot($request['school_id'], array('status' => 1));

        return \Redirect::route('schools.index')->with(['flash_message' => 'Successfully partnered !']);
    }

    public function cancelPartnership(Request $request)
    {
        \Auth::user()->userable->partners()->detach($request['school_id']);

        return \Redirect::route('schools.index')->with(['remove_message' => 'Partnership removed']);
    }
}
