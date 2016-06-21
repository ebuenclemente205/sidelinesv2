<?php

namespace sidelines\Http\Controllers;

use Illuminate\Http\Request;

use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;

use sidelines\User;
use sidelines\Student;
use sidelines\StudentRecommendation;

class PagesController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function userShow()
    {
        return view('users.show');
    }
    public function signUp()
    {
        return view('auth.signup');
    }
    public function userChoose()
    {
        return view('users.choose_user');
    }
    public function userSteps()
    {
        return view('users.student_steps');
    }

    public function userRecommend()
    {
        $user = User::find(277);
        $student = Student::find($user->userable_id);
        $student_recommendation = StudentRecommendation::where('student_id', $student->id)->get();
        
        return view('email.recommend', compact('user', 'student', 'student_recommendation'));
    }
}
