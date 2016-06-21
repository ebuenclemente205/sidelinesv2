<?php

namespace sidelines\Http\Controllers;

use Illuminate\Http\Request;

use Auth;
use sidelines\User;
use sidelines\School;
use sidelines\Skill;
use sidelines\Degree;
use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;

use sidelines\Http\Requests\StudentEditProfileRequest;
use sidelines\Http\Requests\UserFormRequest;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('user', ['except' => 'show', 'print', 'getOnBoardingType']);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function show($id)
    {
        $user = User::find($id);

        if($user == null)
        {
            return \Redirect::to('/');
        }

        $user_type = $user->user_type;

        if(\Auth::check())
        {
            if($user_type === 's')
            {
                return view('users.show', compact('user'));
            }
            else if($user_type === 'c')
            {
                $company = $user->userable;

                return view('users.show', compact('company', 'user_type'));
            }
            else if($user_type === 'sa')
            {
                $school = $user->userable;

                // TODO: view('users.edit')
                return view('users.show', compact('school', 'user_type'));
            }
            else if($user_type === 'f')
            {
                $faculty = $user->userable;

                return view('users.show', compact('faculty', 'user_type'));
            }
            else if($user_type === 'd')
            {
                $faculty = $user->userable;

                return view('users.show', compact('faculty', 'user_type'));
            }
            else if($user_type === 'admin')
            {
                return \Redirect::to('/');
            }
        }
        else
        {
            return \Redirect::to('login');
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
        $user = User::find($id);

        if($user == null)
        {
            return \Redirect::to('/'. $id);
        }

        $user_type = $user->user_type;

        if($user_type === 's')
        {
            $student = $user->userable;
            $skills = Skill::lists('name', 'name');
            $schools = School::lists('name', 'id');
            $degrees = Degree::lists('name', 'id');

            return view('users.edit', compact('student', 'skills', 'schools', 'degrees', 'user_type'));
            // return view('users.edit');
        }
        else if($user_type === 'c')
        {
            $company = $user->userable;

            return view('users.edit', compact('company', 'user_type'));
        }
        else if($user_type === 'sa')
        {
            $school = $user->userable;
            // TODO: view('users.edit')
            return view('users.edit', compact('school', 'user_type'));
        }
        else if($user_type === 'f')
        {
            $faculty = $user->userable;

            return view('users.edit', compact('faculty', 'user_type'));
        }
        else if($user_type === 'd')
        {
            $faculty = $user->userable;

            return view('users.edit', compact('faculty', 'user_type'));
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserFormRequest $request, $id)
    {
        $user = User::find($id);

        if($request->file('file'))
        {
            $file = $request->file('file');
            $filename  = time() . rand(1, 9999) . '.' . $file->getClientOriginalExtension();

            if(!empty($user->image) || $user->image != null)
            {
                \File::delete(public_path('img/profilepics/' . $user->image));
            }

            $request->file('file')->move(
                base_path() . '/public/img/profilepics', $filename //pass to file field
            );

            //getClientSize();

            $user->update([
                'image' => $filename,
            ]);
        }

        // email not editable
        // $user->update([
        //     'email' => $request['email'],
        // ]);

        $user_type = $user->user_type;

        if($user_type === 's')
        {
            $student = $user->userable;

            $student->sample_works = $request['sample_works'];
            $student->update($request->all());

            if($request['school_id'] != null)
            {
                // dd($request['school_id']);
                // $student_school = $request['school_id'];
                $school = School::find($request['school_id']);

                if($school != null)
                {
                    $school->students()->save($student);
                }
            }

            if($request['degree_id'] != null)
            {
                $degree = Degree::find($request['degree_id']);
                $degree->students()->save($student);
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
            else
            {
                $student->skills()->detach();
            }
        }
        else if($user_type === 'c')
        {
            $company = $user->userable;

            $company->update($request->all());
        }
        else if($user_type === 'sa')
        {
            $school = $user->userable;

            $school->update($request->all());
        }
        else if($user_type === 'd' || $user_type === 'f')
        {
            $dean_faculty = $user->userable;

            $dean_faculty->update($request->all());

            // if($request['skill_list'] != null && count($request['skill_list'] > 0))
            // {
            //     // find a skill based on their name and if it doesn't exist create it in the Database
            //     // store all ids in the skills array , existing skills or new created skills
            //
            //     $skills = array();
            //     foreach($request['skill_list'] as $skill_name)
            //     {
            //         $skill = Skill::firstOrCreate(array('name' => $skill_name));
            //         $skills[] = $skill->id;
            //     }
            //
            //     $dean_faculty->skills()->sync($skills);
            // }
            // else
            // {
            //     $dean_faculty->skills()->detach();
            // }
        }

        return \Redirect::to('/'. $id)->with([
            'flash_message' => 'Profile successfully updated!',
        ]);
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

    public function printTemplate1($id)
    {
        $user = User::find($id);

        if($user == null)
        {
            return \Redirect::to('/');
        }

        $user_type = $user->user_type;

        $student = $user->userable;
        $skills = Skill::lists('name', 'name');
        $schools = School::lists('name', 'id');
        $degrees = Degree::lists('name', 'id');

        return view('users.print', compact('student', 'skills', 'schools', 'user_type'));
    }

    public function printTemplate2($id)
    {
        $user = User::find($id);

        if($user == null)
        {
            return \Redirect::to('/');
        }

        $user_type = $user->user_type;

        $student = $user->userable;
        $skills = Skill::lists('name', 'name');
        $schools = School::lists('name', 'id');
        $degrees = Degree::lists('name', 'id');

        return view('users.print2', compact('student', 'skills', 'schools', 'user_type'));
    }

    public function printTemplate3($id)
    {
        $user = User::find($id);

        if($user == null)
        {
            return \Redirect::to('/');
        }

        $user_type = $user->user_type;

        $student = $user->userable;
        $skills = Skill::lists('name', 'name');
        $schools = School::lists('name', 'id');
        $degrees = Degree::lists('name', 'id');

        return view('users.print3', compact('student', 'skills', 'schools', 'user_type'));
    }

    public function getTypeOnBoarding()
    {
        if(\Auth::check())
        {
            if(empty(\Auth::user()->user_type) || \Auth::user()->user_type == null)
            {
                return view('users.choose_user');
            }
            elseif(\Auth::user()->registration_status < 3 && \Auth::user()->confirmed == 0)
            {
                return \Redirect::to(\Auth::user()->id . '/pickuser/student');
            }
            elseif(\Auth::user()->confirmed == 0)
            {
                return \Redirect::to(\Auth::user()->id . '/verify');
            }
            else
            {
                return \Redirect::to('/');
            }
        }
    }

    public function getStudentOnBoarding()
    {
        if(\Auth::user()->registration_status < 3)
        {
            return view('users.student_steps');
        }
        else
        {
            return \Redirect::route('users.show', \Auth::user()->id);
        }
    }

    public function getEmailVerification()
    {
        if(Auth::check())
        {
            if(Auth::user()->confirmed == 1)
            {
                return \Redirect::to('/' . Auth::user()->id);
            }
            elseif(Auth::user()->confirmed == 0)
            {
                return view('users.confirm');
            }
        }
    }

    public function postResendEmailVerification(Request $request, $id)
    {
        $user = User::find($id);

        $new_confirmation_code = str_random(30);
        $user->confirmation_code = $new_confirmation_code;
        $user->save();

        \Mail::send('email.welcome', ['user' => $user], function($message) use ($user) {
            $message->subject('Verification');
            $message->to($user->email);
        });

        return view('users.confirm')->with([
            'message' => 'Successfully sent'
        ]);
    }
}
