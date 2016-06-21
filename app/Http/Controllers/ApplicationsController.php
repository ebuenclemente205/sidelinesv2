<?php

namespace sidelines\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;

use sidelines\Student;
use sidelines\School;
use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;

class ApplicationsController extends Controller
{

    public function __construct()
    {
        $this->middleware('application');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(\Auth::user()->user_type === 'd' || \Auth::user()->user_type === 'f')
        {
            $applications = \DB::table('applications')
                                ->join('students', 'applications.student_id', '=', 'students.id')
                                ->join('users', 'users.userable_id', '=', 'students.id')
                                ->join('jobs', 'applications.job_id', '=', 'jobs.id')
                                ->join('companies', 'jobs.company_id', '=', 'companies.id')
                                ->select('applications.*', 'jobs.name', 'jobs.company_id', 'jobs.major_benefit', 'jobs.created_at as job_posted',
                                            'companies.name as company_name', 'companies.address', 'users.id', 'students.fname', 'students.lname')
                                ->where('students.school_id', '=', \Auth::user()->userable->school->id)
                                ->where('users.user_type', '=', 's')
                                ->orderBy('applications.created_at', 'desc')
                                ->get();

            return view('job_apps.index', compact('applications'));
        }
        else if(\Auth::user()->user_type === 'sa')
        {
            $applications = \DB::table('applications')
                                ->join('students', 'applications.student_id', '=', 'students.id')
                                ->join('users', 'users.userable_id', '=', 'students.id')
                                ->join('jobs', 'applications.job_id', '=', 'jobs.id')
                                ->join('companies', 'jobs.company_id', '=', 'companies.id')
                                ->select('applications.*', 'jobs.name', 'jobs.company_id', 'jobs.major_benefit', 'jobs.created_at as job_posted',
                                            'companies.name as company_name', 'companies.address', 'users.id', 'students.fname', 'students.lname')
                                ->where('students.school_id', '=', \Auth::user()->userable->id)
                                ->where('users.user_type', '=', 's')
                                ->orderBy('applications.created_at', 'desc')
                                ->get();

            return view('job_apps.index', compact('applications'));
        }
        else if(\Auth::user()->user_type === 'c')
        {
            $applications = \DB::table('applications')
                                ->join('students', 'applications.student_id', '=', 'students.id')
                                ->join('users', 'users.userable_id', '=', 'students.id')
                                ->join('jobs', 'applications.job_id', '=', 'jobs.id')
                                ->join('companies', 'jobs.company_id', '=', 'companies.id')
                                ->select('applications.*', 'jobs.name', 'jobs.company_id', 'jobs.major_benefit', 'jobs.created_at as job_posted',
                                            'companies.name as company_name', 'companies.address', 'users.id', 'students.fname', 'students.lname')
                                ->where('jobs.company_id', '=', \Auth::user()->userable->id)
                                ->where('users.user_type', '=', 's')
                                ->orderBy('applications.created_at', 'desc')
                                ->get();

            return view('job_apps.index', compact('applications'));
        }
        else if(\Auth::user()->user_type === 's')
        {
            $applications = \Auth::user()->userable->applications;
            // dd($applications);
            return view('job_apps.index', compact('applications'));
        }
    }
}
