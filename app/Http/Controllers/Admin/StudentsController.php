<?php

namespace sidelines\Http\Controllers\Admin;

use Illuminate\Http\Request;

use sidelines\Student;
use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;

class StudentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $students = Student::with('user')->get();

        return view('admin._studentLists', compact('students'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $student = Student::find($id);

        $student->user->destroy();
        $student->destroy();
    }
}
