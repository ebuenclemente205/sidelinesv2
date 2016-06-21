<?php

namespace sidelines\Http\Controllers\Admin;

use Illuminate\Http\Request;

use sidelines\DeanFaculty;
use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;

class FacultiesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $faculties = DeanFaculty::with('user')->get();

        return view('admin._facultyLists', compact('faculties'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $faculty = DeanFaculty::find($id);

        $faculty->user->destroy();
        $faculty->destroy();
    }
}
