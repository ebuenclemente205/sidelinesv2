<?php

namespace sidelines\Http\Controllers;

use Illuminate\Http\Request;

use sidelines\Student;
use sidelines\School;
use sidelines\DeanFaculty;
use sidelines\Notification;
use sidelines\Company;
use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;

class RecommendationsController extends Controller
{
    public function __construct()
    {
        $this->middleware('recommendation', ['only' => ['edit', 'getStudents']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(\Auth::check())
        {
            if(\Auth::user()->user_type === 'd' || \Auth::user()->user_type === 'f')
            {
                $students = \Auth::user()->userable->recommendations;

                return view('recommendation.index', compact('students'));
            }
            elseif(\Auth::user()->user_type === 'sa')
            {
                $students = \DB::table('students')
                                ->join('recommendations', 'recommendations.student_id', '=', 'students.id')
                                ->join('degrees', 'degrees.id', '=', 'students.degree_id')
                                ->join('users', 'users.userable_id', '=', 'students.id')
                                ->select('users.id as user_id', 'students.id', 'students.lname', 'students.fname', 'students.yr_lvl', 'degrees.name as degree', \DB::raw('count(recommendations.student_id) as recommendations'))
                                ->where('users.user_type', '=', 's')
                                ->where('students.school_id', '=', \Auth::user()->userable->id)
                                ->groupBy('recommendations.student_id')
                                ->get();

                return view('recommendation.index', compact('students'));
            }
            else if(\Auth::user()->user_type === 'c')
            {
                $students = \DB::table('students')
                                ->join('recommendations', 'recommendations.student_id', '=', 'students.id')
                                ->join('degrees', 'degrees.id', '=', 'students.degree_id')
                                ->join('users', 'users.userable_id', '=', 'students.id')
                                ->select('users.id as user_id', 'students.id', 'students.lname', 'students.fname', 'students.yr_lvl', 'degrees.name as degree', \DB::raw('count(recommendations.student_id) as recommendations'))
                                ->where('users.user_type', '=', 's')
                                ->groupBy('recommendations.student_id')
                                ->get();

                return view('recommendation.index', compact('students'));
            }
            else if(\Auth::user()->user_type === 's'){

                $faculties = \Auth::user()->userable->recommendations;

                // Changing notifcations status to 1
                // foreach(\Auth::user()->notifications()->where('notification_type', 'recommendation')->get() as $notification)
                // {
                //     $notification->s_status = 0;
                //     $notification->save();
                // }

                return view('recommendation.index', compact('faculties'));
            }
        }
        else
            return \Redirect::route('jobs.index');        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(!\Auth::user()->userable->recommendations->contains($request['student_id']))
        {
            \Auth::user()->userable->recommendations()
                ->attach(array($request['student_id'] => array('recommendation_details' => $request['recommendation_letter'])));

            //Student Notification
            $notify = new Notification();
            $notify->user_type = 's';
            $notify->s_status = 1;
            $notify->notification_type = 'recommendation';

            \Auth::user()->notifications_sent()->save($notify);

            $student = Student::find($request['student_id']);
            $student->user->notifications_received()->save($notify);

            //School Notification
            $notify_school = new Notification();
            $notify_school->user_type = 'sa';
            $notify_school->sa_status = 1;
            $notify_school->notification_type = 'recommendation';
            \Auth::user()->notifications_sent()->save($notify_school);

            $school = School::find($student->school_id);
            $school->user->notifications_received()->save($notify_school);

            //Company Notification
            $companies = Company::all();
            foreach($companies as $company)
            {
                $notify_company = new Notification();
                $notify_company->c_status = 1;
                $notify_company->user_type = 'c';
                $notify_company->notification_type = 'recommendation';
                \Auth::user()->notifications_sent()->save($notify_company);

                $company->user->notifications_received()->save($notify_company);
            }
        }

        return \Redirect::route('recommendations.index')->with(['flash_message' => 'You recommended '.$student->fname.' '.$student->lname.' !']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // if(\Auth::user()->user_type === 'd' || \Auth::user()->user_type === 'f')
        // {
        //     $student = \Auth::user()->userable->recommendations()->where('student_id', $id)->first();
        //
        //     return view('recommendation.show', compact('student'));
        // }
        // else
        // {
            $recommendation = \DB::table('recommendations')->where('id', $id)->get();

            $faculty = DeanFaculty::find($recommendation[0]->dean_faculty_id);
            $student = $faculty->recommendations()->where('student_id', $recommendation[0]->student_id)->first();

            return view('recommendation.show', compact('student'));
        // }

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $student = \Auth::user()->userable->recommendations()->where('student_id', $id)->first();

        return view('recommendation.edit', compact('student'));
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
        // $student = \Auth::user()->userable->recommendations()->where('student_id', $id)->first();
        // dd($request);
        \Auth::user()->userable->recommendations()
            ->updateExistingPivot($id, array('recommendation_details' => $request['recommendation_details']));

        return \Redirect::route('recommendations.show', $request['recommendation_id']);
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

    // Custom methods

    public function getStudents()
    {
        $students = Student::where('school_id', \Auth::user()->userable->school_id)->get();

        return view('recommendation.students', compact('students'));
    }

    public function recommendStudent(Request $request)
    {
        $student = Student::find($request['student_id']);

        return view('recommendation.create', compact('student'));
    }

    public function viewRecommendationsOfStudent($id)
    {
        $student = Student::with('recommendations')->find($id);
        $faculties = $student->recommendations;
        // dd($faculties);
        return view('recommendation.viewrecommendations', compact('faculties', 'student'));
    }
}
