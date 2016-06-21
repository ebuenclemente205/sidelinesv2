<?php

namespace sidelines\Http\Controllers;

use Illuminate\Http\Request;

use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;
use sidelines\DeanFaculty;

class FacultiesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('layouts.master-content');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $faculty = DeanFaculty::find($id);

        return view('users.show', compact('faculty'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $faculty =  DeanFaculty::find($id);

        return view('users.edit', compact('faculty'));
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
        $faculty =  DeanFaculty::find($id);

        if(count($request->all()) > 0)
        {
            if(!empty($request->file('image')))
            {
                $image = $request->file('image');
                $filename  = time() . rand(1, 9999) . '.' . $image->getClientOriginalExtension();

                $request->file('image')->move(
                    base_path() . '/public/img/profilepics', $filename //pass to image field
                );


                $faculty->user->update([
                    'image' => $filename,
                ]);
                dd($filename);
            }

            $faculty->user->update([
                'email' => $request['email'],
            ]);

            $faculty->update($request->all());

            return \Redirect::route('faculties.show', $id);
        }
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
}
