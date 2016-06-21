<?php

namespace sidelines\Http\Controllers;

use Illuminate\Http\Request;

use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;

use sidelines\User;
use sidelines\Student;
use sidelines\StudentRecommendation;

class StudentRecommendationController extends Controller
{
    public function getStudentRecommendation($id, $code)
    {
        $user = User::find($id);
        $student = Student::with('student_recommendations')->find($user->userable_id);
        
        $student_recommendation = StudentRecommendation::where('student_id', $user->userable_id)->whereRecommendationCode($code)->first();

        if( ! $student_recommendation)
        {
            return \Redirect::to('/');
        }

        return view('email.rating', compact('student'));
    }
}
