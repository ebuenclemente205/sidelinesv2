<?php

namespace sidelines\Http\Controllers\Admin;

use Illuminate\Http\Request;

use sidelines\School;
use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;

class SchoolsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $schools = School::with('user', 'students')->get();

        return view('admin._schoolLists', compact('schools'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $school = School::find($id);

        $school->user->destroy();
        $school->destroy();
    }
}
