<?php

namespace sidelines\Http\Controllers\Admin;

use Illuminate\Http\Request;

use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;

class ApplicationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $applications = \DB::table('applications')
                            ->join('students', 'applications.student_id', '=', 'students.id')
                            ->join('users', 'users.userable_id', '=', 'students.id')
                            ->join('jobs', 'applications.job_id', '=', 'jobs.id')
                            ->join('companies', 'jobs.company_id', '=', 'companies.id')
                            ->select('applications.*', 'jobs.name', 'jobs.company_id', 'jobs.major_benefit', 'jobs.created_at as job_posted',
                                        'companies.name as company_name', 'companies.address', 'users.id', 'students.fname', 'students.lname')
                            ->where('users.user_type', '=', 's')
                            ->orderBy('applications.created_at', 'desc')
                            ->get();

        // $applications = \DB::table('applications')
        //                     ->join('students', 'applications.student_id', '=', 'students.id')
        //                     ->join('users', 'users.userable_id', '=', 'students.id')
        //                     ->join('jobs', 'applications.job_id', '=', 'jobs.id')
        //                     ->join('companies', 'jobs.company_id', '=', 'companies.id')
        //                     ->select('applications.*', 'jobs.name', 'jobs.company_id', 'jobs.major_benefit', 'jobs.created_at as job_posted',
        //                                 'companies.name as company_name', 'companies.address', 'users.id', 'students.fname', 'students.lname')
        //                     ->where('students.school_id', '=', \Auth::user()->userable->id)
        //                     ->where('users.user_type', '=', 's')
        //                     ->orderBy('applications.created_at', 'desc')
        //                     ->get();
        //
        // return view('job_apps.index', compact('applications'));

        return view('admin._applicationLists', compact('applications'));
    }

    public function showPendingApplications()
    {
        $applications = \DB::table('applications')
                            ->join('students', 'applications.student_id', '=', 'students.id')
                            ->join('users', 'users.userable_id', '=', 'students.id')
                            ->join('jobs', 'applications.job_id', '=', 'jobs.id')
                            ->join('companies', 'jobs.company_id', '=', 'companies.id')
                            ->select('applications.*', 'jobs.name', 'jobs.company_id', 'jobs.major_benefit', 'jobs.created_at as job_posted',
                                        'companies.name as company_name', 'companies.address', 'users.id', 'students.fname', 'students.lname')
                            ->where('applications.status', '=', '0')
                            ->orderBy('applications.created_at', 'desc')
                            ->get();

        return view('admin._applicationLists', compact('applications'));
    }

    public function showSuccessfulApplications()
    {
        $applications = \DB::table('applications')
                            ->join('students', 'applications.student_id', '=', 'students.id')
                            ->join('users', 'users.userable_id', '=', 'students.id')
                            ->join('jobs', 'applications.job_id', '=', 'jobs.id')
                            ->join('companies', 'jobs.company_id', '=', 'companies.id')
                            ->select('applications.*', 'jobs.name', 'jobs.company_id', 'jobs.major_benefit', 'jobs.created_at as job_posted',
                                        'companies.name as company_name', 'companies.address', 'users.id', 'students.fname', 'students.lname')
                            ->where('applications.status', '=', '1')
                            ->orderBy('applications.created_at', 'desc')
                            ->get();

        return view('admin._applicationLists', compact('applications'));
    }

    public function declinedApplications()
    {
        $applications = \DB::table('applications')
                            ->join('students', 'applications.student_id', '=', 'students.id')
                            ->join('users', 'users.userable_id', '=', 'students.id')
                            ->join('jobs', 'applications.job_id', '=', 'jobs.id')
                            ->join('companies', 'jobs.company_id', '=', 'companies.id')
                            ->select('applications.*', 'jobs.name', 'jobs.company_id', 'jobs.major_benefit', 'jobs.created_at as job_posted',
                                        'companies.name as company_name', 'companies.address', 'users.id', 'students.fname', 'students.lname')
                            ->where('applications.status', '=', '2')
                            ->orderBy('applications.created_at', 'desc')
                            ->get();

        return view('admin._applicationLists', compact('applications'));
    }
}
