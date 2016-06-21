<?php

namespace sidelines\Http\Controllers\admin;

use Illuminate\Http\Request;

use sidelines\Http\Requests;
use sidelines\Student;
use sidelines\Http\Controllers\Controller;

class ReviewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function submittedReviews()
    {
        $students = Student::with('user')->where('review_status', 1)->get();

        return view('admin._reviews', compact('students'));
    }

    public function acceptedReviews()
    {
        $students = Student::with('user')->where('review_status', 2)->get();

        return view('admin._reviews', compact('students'));
    }

    public function acceptReview($id)
    {
        $student = Student::where('id', $id)->first();
        $student->review_status = 2;
        $student->save();

        return \Redirect::to('admin/accepted-reviews');
    }

    public function denyReview($id)
    {
        $student = Student::where('id', $id)->first();
        $student->review_status = 0;
        $student->save();

        return \Redirect::to('admin/submitted-reviews');
    }
}
