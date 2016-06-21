<?php

namespace sidelines\Http\Controllers;

use Illuminate\Http\Request;

use sidelines\Company;
use sidelines\School;
use sidelines\Student;
use sidelines\Job;
use sidelines\Category;
use sidelines\Degree;
use sidelines\Payment;
use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;

class ReportsController extends Controller
{
    public function sortPartnerships()
    {
        return view('reports.partnersort');
    }

    public function getPartnerships(Request $request)
    {
        if(\Auth::user()->user_type === 'c' || \Auth::user()->user_type === 'sa')
        {
            if($request['sortby'] == 'name_a')
            {
                $partners = \Auth::user()->userable->partners()->wherePivot('status', '1')->orderBy('name', 'asc')->get();
            }
            else if($request['sortby'] == 'name_d')
            {
                $partners = \Auth::user()->userable->partners()->wherePivot('status', '1')->orderBy('name', 'desc')->get();
            }
            else if($request['sortby'] == 'datepartnered_a')
            {
                $partners = \Auth::user()->userable->partners()->wherePivot('status', '1')->orderBy('pivot_created_at', 'asc')->get();
            }
            else if($request['sortby'] == 'datepartnered_d')
            {
                $partners = \Auth::user()->userable->partners()->wherePivot('status', '1')->orderBy('pivot_created_at', 'desc')->get();
            }
        }
        else if(\Auth::user()->user_type === 'admin')
        {
            if($request['sortby'] == 'schoolname_a')
            {
                $partners = \DB::table('partnerships')
                                ->join('schools', 'schools.id', '=', 'partnerships.school_id')
                                ->join('companies', 'companies.id', '=', 'partnerships.company_id')
                                ->select('companies.name as company_name', 'schools.name as school_name', 'partnerships.*')
                                ->where('partnerships.status', '=', '1')
                                ->orderBy('schools.name', 'asc')
                                ->get();
            }
            else if($request['sortby'] == 'schoolname_d')
            {
                $partners = \DB::table('partnerships')
                                ->join('schools', 'schools.id', '=', 'partnerships.school_id')
                                ->join('companies', 'companies.id', '=', 'partnerships.company_id')
                                ->select('companies.name as company_name', 'schools.name as school_name', 'partnerships.*')
                                ->where('partnerships.status', '=', '1')
                                ->orderBy('schools.name', 'desc')
                                ->get();
            }
            else if($request['sortby'] == 'companyname_a')
            {
                $partners = \DB::table('partnerships')
                                ->join('schools', 'schools.id', '=', 'partnerships.school_id')
                                ->join('companies', 'companies.id', '=', 'partnerships.company_id')
                                ->select('companies.name as company_name', 'schools.name as school_name', 'partnerships.*')
                                ->where('partnerships.status', '=', '1')
                                ->orderBy('companies.name', 'asc')
                                ->get();
            }
            else if($request['sortby'] == 'companyname_d')
            {
                $partners = \DB::table('partnerships')
                                ->join('schools', 'schools.id', '=', 'partnerships.school_id')
                                ->join('companies', 'companies.id', '=', 'partnerships.company_id')
                                ->select('companies.name as company_name', 'schools.name as school_name', 'partnerships.*')
                                ->where('partnerships.status', '=', '1')
                                ->orderBy('companies.name', 'desc')
                                ->get();
            }
            else if($request['sortby'] == 'datepartnered_a')
            {
                $partners = \DB::table('partnerships')
                                ->join('schools', 'schools.id', '=', 'partnerships.school_id')
                                ->join('companies', 'companies.id', '=', 'partnerships.company_id')
                                ->select('companies.name as company_name', 'schools.name as school_name', 'partnerships.*')
                                ->where('partnerships.status', '=', '1')
                                ->orderBy('partnerships.created_at', 'asc')
                                ->get();
            }
            else if($request['sortby'] == 'datepartnered_d')
            {
                $partners = \DB::table('partnerships')
                                ->join('schools', 'schools.id', '=', 'partnerships.school_id')
                                ->join('companies', 'companies.id', '=', 'partnerships.company_id')
                                ->select('companies.name as company_name', 'schools.name as school_name', 'partnerships.*')
                                ->where('partnerships.status', '=', '1')
                                ->orderBy('partnerships.created_at', 'desc')
                                ->get();
            }
        }

        return view('reports.partners', compact('partners'));
    }

    public function sortJobs()
    {
        $categories = Category::lists('name', 'id');

        return view('reports.jobsort', compact('categories'));
    }

    public function getJobs(Request $request)
    {
        if(\Auth::user()->user_type === 'sa')
        {
            if(!empty($request['categories_id']))
            {
                $category = Category::find($request['categories_id']);

                if($request['sortby'] == 'jobname_a')
                {
                    $category = Category::with(['jobs' => function($query) {
                        $query->orderBy('name', 'asc');
                    }])->find($request['categories_id']);

                    $jobs = $category->jobs;
                }
                else if($request['sortby'] == 'jobname_d')
                {
                    $category = Category::with(['jobs' => function($query) {
                        $query->orderBy('name', 'desc');
                    }])->find($request['categories_id']);

                    $jobs = $category->jobs;
                }
                else if($request['sortby'] == 'dateposted_a')
                {
                    $category = Category::with(['jobs' => function($query) {
                        $query->orderBy('created_at', 'asc');
                    }])->find($request['categories_id']);

                    $jobs = $category->jobs;
                }
                else if($request['sortby'] == 'dateposted_d')
                {
                    $category = Category::with(['jobs' => function($query) {
                        $query->orderBy('created_at', 'desc');
                    }])->find($request['categories_id']);

                    $jobs = $category->jobs;
                }
                else if($request['sortby'] == 'deadline_a')
                {
                    $category = Category::with(['jobs' => function($query) {
                        $query->orderBy('deadline_of_application', 'asc');
                    }])->find($request['categories_id']);

                    $jobs = $category->jobs;
                }
                else if($request['sortby'] == 'deadline_d')
                {
                    $category = Category::with(['jobs' => function($query) {
                        $query->orderBy('deadline_of_application', 'desc');
                    }])->find($request['categories_id']);

                    $jobs = $category->jobs;
                }
            }
            else
            {
                if($request['sortby'] == 'jobname_a')
                {
                    $jobs = Job::orderBy('name', 'asc')->get();
                }
                else if($request['sortby'] == 'jobname_d')
                {
                    $jobs = Job::orderBy('name', 'desc')->get();
                }
                else if($request['sortby'] == 'dateposted_a')
                {
                    $jobs = Job::orderBy('created_at', 'asc')->get();
                }
                else if($request['sortby'] == 'dateposted_d')
                {
                    $jobs = Job::orderBy('created_at', 'desc')->get();
                }
                else if($request['sortby'] == 'deadline_a')
                {
                    $jobs = Job::orderBy('deadline_of_application', 'asc')->get();
                }
                else if($request['sortby'] == 'deadline_d')
                {
                    $jobs = Job::orderBy('deadline_of_application', 'desc')->get();
                }
            }

            return view('reports.jobpost', compact('jobs'));
        }

        // If the user is a company it will proceed here
        if(!empty($request['categories_id']))
        {
            $category = Category::find($request['categories_id']);

            if($request['sortby'] == 'jobname_a')
            {
                $category = Category::with(['jobs' => function($query) {
                    $query->where('company_id', '=', \Auth::user()->userable->id)
                          ->orderBy('name', 'asc');
                }])->find($request['categories_id']);

                $jobs = $category->jobs;
            }
            else if($request['sortby'] == 'jobname_d')
            {
                $category = Category::with(['jobs' => function($query) {
                    $query->where('company_id', '=', \Auth::user()->userable->id)
                          ->orderBy('name', 'desc');
                }])->find($request['categories_id']);

                $jobs = $category->jobs;
            }
            else if($request['sortby'] == 'dateposted_a')
            {
                $category = Category::with(['jobs' => function($query) {
                    $query->where('company_id', '=', \Auth::user()->userable->id)
                          ->orderBy('created_at', 'asc');
                }])->find($request['categories_id']);

                $jobs = $category->jobs;
            }
            else if($request['sortby'] == 'dateposted_d')
            {
                $category = Category::with(['jobs' => function($query) {
                    $query->where('company_id', '=', \Auth::user()->userable->id)
                          ->orderBy('created_at', 'desc');
                }])->find($request['categories_id']);

                $jobs = $category->jobs;
            }
            else if($request['sortby'] == 'deadline_a')
            {
                $category = Category::with(['jobs' => function($query) {
                    $query->where('company_id', '=', \Auth::user()->userable->id)
                          ->orderBy('deadline_of_application', 'asc');
                }])->find($request['categories_id']);

                $jobs = $category->jobs;
            }
            else if($request['sortby'] == 'deadline_d')
            {
                $category = Category::with(['jobs' => function($query) {
                    $query->where('company_id', '=', \Auth::user()->userable->id)
                          ->orderBy('deadline_of_application', 'desc');
                }])->find($request['categories_id']);

                $jobs = $category->jobs;
            }
        }
        else
        {
            if($request['sortby'] == 'jobname_a')
            {
                $jobs = \Auth::user()->userable->jobs()->orderBy('name', 'asc')->get();
            }
            else if($request['sortby'] == 'jobname_d')
            {
                $jobs = \Auth::user()->userable->jobs()->orderBy('name', 'desc')->get();
            }
            else if($request['sortby'] == 'dateposted_a')
            {
                $jobs = \Auth::user()->userable->jobs()->orderBy('created_at', 'asc')->get();
            }
            else if($request['sortby'] == 'dateposted_d')
            {
                $jobs = \Auth::user()->userable->jobs()->orderBy('created_at', 'desc')->get();
            }
            else if($request['sortby'] == 'deadline_a')
            {
                $jobs = \Auth::user()->userable->jobs()->orderBy('deadline_of_application', 'asc')->get();
            }
            else if($request['sortby'] == 'deadline_d')
            {
                $jobs = \Auth::user()->userable->jobs()->orderBy('deadline_of_application', 'desc')->get();
            }
        }

        return view('reports.jobpost', compact('jobs'));
    }

    public function sortStudents()
    {
        $schools = School::lists('name', 'id');
        $degrees = Degree::lists('name', 'id');

        return view('reports.studentsort', compact('schools', 'degrees'));
    }

    public function getStudents(Request $request)
    {
        if(\Auth::user()->user_type === 'sa')
        {
            if(empty($request['degrees_id']))
            {

                if($request['sortby'] == 'fname_a')
                {
                    $students = \Auth::user()->userable->students()->orderBy('fname', 'asc')->get();
                }
                else if($request['sortby'] == 'fname_d')
                {
                    $students = \Auth::user()->userable->students()->orderBy('fname', 'desc')->get();
                }
                else if($request['sortby'] == 'lname_a')
                {
                    $students = \Auth::user()->userable->students()->orderBy('lname', 'asc')->get();
                }
                else if($request['sortby'] == 'lname_d')
                {
                    $students = \Auth::user()->userable->students()->orderBy('lname', 'desc')->get();
                }
                else if($request['sortby'] == 'year_a')
                {
                    $students = \Auth::user()->userable->students()->orderBy('yr_lvl', 'asc')->get();
                }
                else if($request['sortby'] == 'year_d')
                {
                    $students = \Auth::user()->userable->students()->orderBy('yr_lvl', 'desc')->get();
                }
            }
            else
            {
                $degree = Degree::find($request['degrees_id']);

                if($request['sortby'] == 'fname_a')
                {
                    $students = $degree->students()->where('school_id', \Auth::user()->userable->id)->orderBy('fname', 'asc')->get();
                }
                else if($request['sortby'] == 'fname_d')
                {
                    $students = $degree->students()->where('school_id', \Auth::user()->userable->id)->orderBy('fname', 'desc')->get();
                }
                else if($request['sortby'] == 'lname_a')
                {
                    $students = $degree->students()->where('school_id', \Auth::user()->userable->id)->orderBy('lname', 'asc')->get();
                }
                else if($request['sortby'] == 'lname_d')
                {
                    $students = $degree->students()->where('school_id', \Auth::user()->userable->id)->orderBy('lname', 'desc')->get();
                }
                else if($request['sortby'] == 'year_a')
                {
                    $students =$degree->students()->where('school_id', \Auth::user()->userable->id)->orderBy('yr_lvl', 'asc')->get();
                }
                else if($request['sortby'] == 'year_d')
                {
                    $students =$degree->students()->where('school_id', \Auth::user()->userable->id)->orderBy('yr_lvl', 'desc')->get();
                }
            }

            return view('reports.students', compact('students'));
        }

        // If the user is a company it will proceed here
        if(empty($request['schools_id']))
        {
            if(empty($request['degrees_id']))
            {

                if($request['sortby'] == 'fname_a')
                {
                    $students = Student::orderBy('fname', 'asc')->get();
                }
                else if($request['sortby'] == 'fname_d')
                {
                    $students = Student::orderBy('fname', 'desc')->get();
                }
                else if($request['sortby'] == 'lname_a')
                {
                    $students = Student::orderBy('lname', 'asc')->get();
                }
                else if($request['sortby'] == 'lname_d')
                {
                    $students = Student::orderBy('lname', 'desc')->get();
                }
                else if($request['sortby'] == 'year_a')
                {
                    $students = Student::orderBy('yr_lvl', 'asc')->get();
                }
                else if($request['sortby'] == 'year_d')
                {
                    $students = Student::orderBy('yr_lvl', 'desc')->get();
                }
            }
            else
            {
                $degree = Degree::find($request['degrees_id']);

                if($request['sortby'] == 'fname_a')
                {
                    $students = $degree->students()->orderBy('fname', 'asc')->get();
                }
                else if($request['sortby'] == 'fname_d')
                {
                    $students = $degree->students()->orderBy('fname', 'desc')->get();
                }
                else if($request['sortby'] == 'lname_a')
                {
                    $students = $degree->students()->orderBy('lname', 'asc')->get();
                }
                else if($request['sortby'] == 'lname_d')
                {
                    $students = $degree->students()->orderBy('lname', 'desc')->get();
                }
                else if($request['sortby'] == 'year_a')
                {
                    $students =$degree->students()->orderBy('yr_lvl', 'asc')->get();
                }
                else if($request['sortby'] == 'year_d')
                {
                    $students =$degree->students()->orderBy('yr_lvl', 'desc')->get();
                }
            }

            return view('reports.students', compact('students'));
        }
        else
        {
            $school = School::find($request['schools_id']);

            if(empty($request['degrees_id']))
            {
                if($request['sortby'] == 'fname_a')
                {
                    $students = $school->students()->orderBy('fname', 'asc')->get();
                }
                else if($request['sortby'] == 'fname_d')
                {
                    $students = $school->students()->orderBy('fname', 'desc')->get();
                }
                else if($request['sortby'] == 'lname_a')
                {
                    $students = $school->students()->orderBy('lname', 'asc')->get();
                }
                else if($request['sortby'] == 'lname_d')
                {
                    $students = $school->students()->orderBy('lname', 'desc')->get();
                }
                else if($request['sortby'] == 'year_a')
                {
                    $students = $school->students()->orderBy('yr_lvl', 'asc')->get();
                }
                else if($request['sortby'] == 'year_d')
                {
                    $students = $school->students()->orderBy('yr_lvl', 'desc')->get();
                }

                return view('reports.students', compact('students'));
            }
            else
            {
                $degree = Degree::find($request['degrees_id']);

                if($request['sortby'] == 'fname_a')
                {
                    $students = $degree->students()->where('school_id', $request['schools_id'])->orderBy('fname', 'asc')->get();
                }
                else if($request['sortby'] == 'fname_d')
                {
                    $students = $degree->students()->where('school_id', $request['schools_id'])->orderBy('fname', 'desc')->get();
                }
                else if($request['sortby'] == 'lname_a')
                {
                    $students = $degree->students()->where('school_id', $request['schools_id'])->orderBy('lname', 'asc')->get();
                }
                else if($request['sortby'] == 'lname_d')
                {
                    $students = $degree->students()->where('school_id', $request['schools_id'])->orderBy('lname', 'desc')->get();
                }
                else if($request['sortby'] == 'year_a')
                {
                    $students = $degree->students()->where('school_id', $request['schools_id'])->orderBy('yr_lvl', 'asc')->get();
                }
                else if($request['sortby'] == 'year_d')
                {
                    $students = $degree->students()->where('school_id', $request['schools_id'])->orderBy('yr_lvl', 'desc')->get();
                }

                return view('reports.students', compact('students'));
            }
        }
    }

    public function sortPayments()
    {
        return view('reports.paymentsort');
    }

    public function getPayments(Request $request)
    {
        if(\Auth::user()->user_type == 'c')
        {
            if($request['sortby'] == 'date_a')
            {
                $payments = \Auth::user()->userable->payments()->orderBy('created_at', 'asc')->get();
            }
            else if($request['sortby'] == 'date_d')
            {
                $payments = \Auth::user()->userable->payments()->orderBy('created_at', 'desc')->get();
            }

            return view('reports.payments', compact('payments'));
        }
        else if(\Auth::user()->user_type == 'admin')
        {
            if($request['sortby'] == 'date_a')
            {
                $payments = Payment::orderBy('created_at', 'asc')->get();
            }
            else if($request['sortby'] == 'date_d')
            {
                $payments = Payment::orderBy('created_at', 'desc')->get();
            }

            return view('reports.payments', compact('payments'));
        }
    }
}
