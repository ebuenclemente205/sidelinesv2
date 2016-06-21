<?php

namespace sidelines\Http\Controllers\Admin;

use Illuminate\Http\Request;

use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;

class RecommendationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $students = \DB::table('students')
                        ->join('recommendations', 'recommendations.student_id', '=', 'students.id')
                        ->join('degrees', 'degrees.id', '=', 'students.degree_id')
                        ->join('dean_faculties', 'dean_faculties.id', '=', 'recommendations.dean_faculty_id')
                        ->select('degrees.name as degree_name', 'students.lname as student_lname', 'students.fname as student_fname',
                                'students.yr_lvl', 'degrees.name as degree', 'dean_faculties.lname as faculty_lname', 'dean_faculties.fname as faculty_fname', 'recommendations.id as recommendation_id')
                        ->get();
                        // dd($students);
        return view('admin._recommendLists', compact('students'));
    }
}
