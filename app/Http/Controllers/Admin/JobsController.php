<?php

namespace sidelines\Http\Controllers\Admin;

use Illuminate\Http\Request;

use sidelines\Job;
use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;

class JobsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $jobs = Job::withTrashed()->get();

        return view('admin._jobLists', compact('jobs'));
    }

    public function activeJobs()
    {
        $jobs = Job::all();

        return view('admin._jobLists', compact('jobs'));
    }

    public function expiredJobs()
    {
        $jobs = Job::onlyTrashed()->get();

        return view('admin._jobLists', compact('jobs'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $job = Job::withTrashed()->where('id', $id)->first();

        $job->forceDelete();

        return \Redirect::to('admin/jobs');
    }

    public function retrieve($id)
    {
        $job = Job::onlyTrashed()->where('id', $id)->first();

        if($job != null && $job->deleted_at != null)
        {
            $job->restore();
        }

        return \Redirect::to('admin/jobs');
    }

    public function setJobAsExpired($id)
    {
        $job = Job::find($id);

        if($job != null)
        {
            $job->delete();
        }

        return \Redirect::to('admin/jobs');
    }
}
