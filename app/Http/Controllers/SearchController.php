<?php

namespace sidelines\Http\Controllers;

use Illuminate\Http\Request;

use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;

use sidelines\Student;
use sidelines\DeanFaculty;
use sidelines\Company;
use sidelines\School;

class SearchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        if(!empty($request['search_keyword']))
        {
            // $students = Student::where('lname', 'LIKE', '%' . $request['search_keyword'] . '%')
            //                     ->orWhere('mname', 'LIKE', '%' . $request['search_keyword'] . '%')
            //                     ->orWhere('fname', 'LIKE', '%' . $request['search_keyword'] . '%')
            //                     ->get();

            $students = Student::whereRaw("CONCAT(fname, ' ', lname) LIKE '%" . $request['search_keyword'] . "%'")->get();

            // $faculties = DeanFaculty::where('lname', 'LIKE', '%' r. $request['search_keyword'] . '%')
            //                                 ->orWhere('mname', 'LIKE', '%' . $request['search_keyword'] . '%')
            //                                 ->orWhere('fname', 'LIKE', '%' . $request['search_keyword'] . '%')
            //                                 ->get();

            $faculties = DeanFaculty::whereRaw("CONCAT(fname, ' ', lname) LIKE '%" . $request['search_keyword'] . "%'")->get();

            $companies = Company::where('name', 'LIKE', '%' . $request['search_keyword'] . '%')
                                            ->get();

            $schools = School::where('name', 'LIKE', '%' . $request['search_keyword'] . '%')
                                            ->get();


            //dd($schools);
            //dd($faculties);
            //dd($companies);
            //dd($students);

            return view('users.search', compact('students', 'faculties', 'companies', 'schools'));
        }

        return \Redirect::to('/jobs');
    }
}
