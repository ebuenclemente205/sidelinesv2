<?php

namespace sidelines\Http\Controllers;

use Illuminate\Http\Request;

use sidelines\Student;
use sidelines\Skill;
use sidelines\School;
use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;
use Auth;

class StudentsController extends Controller
{
    public function __contstruct()
    {
        $this->middleware('student', ['except' => 'studentsBySkill', 'submitForReview']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(\Auth::user()->user_type === 'sa')
        {
            $students = Student::where('school_id', \Auth::user()->userable->id)->orderBy('created_at', 'DESC')->get();
        }
        else if(\Auth::user()->user_type === 'd' || \Auth::user()->user_type === 'f')
        {
            $students = Student::where('school_id', \Auth::user()->userable->school_id)->orderBy('created_at', 'DESC')->get();
        }
        else if(\Auth::user()->user_type === 's')
        {
            $students = Student::orderBy('created_at', 'DESC')->get();

            return view('students.showSkills', compact('students'));
        }
        else if(\Auth::user()->user_type === 'c')
        {
            return redirect('/');
        }

        return view('students.index', compact('students'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function show($id)
    // {
    //     if(Student::where('id', $id)->exists())
    //     {
    //         $student = Student::find($id);
    //
    //         return view('students.show')
    //             ->with('student', $student);
    //     }
    //     else
    //     {
    //         return \Redirect::route('students.index');
    //     }
    // }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $student = Student::find($id);
        $skills = Skill::lists('name', 'name');
        $schools = School::lists('name', 'id');

        return view('students.edit', compact('student', 'skills', 'schools'));
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
        $student = Student::find($id);

        if(!empty($request->file('image')))
        {
            $image = $request->file('image');
            $filename  = time() . rand(1, 9999) . '.' . $image->getClientOriginalExtension();
            $request->file('image')->move(
                base_path() . '/public/img/profilepics', $filename //pass to image field
            );

            $student->user->update([
                'image' => $filename,
            ]);

            dd($filename);
        }

        $student->user->update([
            'email' => $request['email'],
        ]);

        $student->update($request->all());

        if($request['school_id'] != null)
        {
            $student_school = $request['school_id'];
            $school = School::find($student_school[0]);
            $school->students()->save($student);
        }

        if($request['skill_list'] != null && count($request['skill_list'] > 0))
        {
            // find a skill based on their name and if it doesn't exist create it in the Database
            // store all ids in the skills array , existing skills or new created skills

            $skills = array();
            foreach($request['skill_list'] as $skill_name)
            {
                $skill = Skill::firstOrCreate(array('name' => $skill_name));
                $skills[] = $skill->id;
            }

            $student->skills()->sync($skills);
        }

        return \Redirect::route('students.show', $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // public function destroy($id)
    // {
    //     Student::find($id)->user()->delete();
    // }

    /**
     *
     * Custom methods for Students Controller
     *
     */

     public function studentsBySkill($name)
     {
        // $recommendations = \DB::table('recommendations')->count();
        //
        // if($recommendations == 0)
        // {
        //     $skill = Skill::with('students')->where('name', $name)->first();
        // }
        // else
        // {
        //     $skill = Skill::with(['students' => function($query) {
        //         $query->leftJoin('recommendations', 'recommendations.student_id', '=', 'students.id')
        //               ->join('users', 'users.userable_id', '=', 'students.id')
        //               ->select('students.*', \DB::raw('count(recommendations.student_id) as recommendations'))
        //               ->where('users.user_type', '=', 's')
        //               ->orderBy('recommendations', 'DESC')
        //               ->groupBy('recommendations.student_id')
        //               ->get();
        //     }])->where('name', $name)->first();
        //     // dd($skill->students);
        // }

        $skill = Skill::with('students')->where('name', $name)->first();

        $students = $skill->students;

        return view('students.showSkills', compact('students'));
     }

     public function submitForReview(Request $request)
     {

         $student = Student::find(\Auth::user()->userable->id);
         $student->review_status = 1;
         $student->save();

         return \Redirect::route('users.show', \Auth::user()->id);
     }
}
