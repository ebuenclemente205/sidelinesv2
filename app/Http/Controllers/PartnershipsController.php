<?php

namespace sidelines\Http\Controllers;

use Illuminate\Http\Request;

use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;

class PartnershipsController extends Controller
{
    public function __construct()
    {
        $this->middleware('partnership', ['only' => ['index', 'acceptPartnership']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(\Auth::user()->user_type === 'c')
        {
            $partners = \DB::table('partnerships')
                            ->join('schools', 'schools.id', '=', 'partnerships.school_id')
                            ->join('users', function($join) {
                                $join->on('users.userable_id', '=', 'schools.id')
                                     ->where('users.user_type', '=', 'sa');
                            })
                            ->select('partnerships.*', 'users.image as school_image', 'schools.name as school_name')
                            ->groupBy('partnerships.company_id', 'partnerships.school_id')
                            ->where('partnerships.company_id', '=', \Auth::user()->userable->id)
                            ->where('partnerships.status', '=', '1')
                            ->get();
        }
        else if(\Auth::user()->user_type === 'sa')
        {
            $partners = \DB::table('partnerships')
                            ->join('companies', 'companies.id', '=', 'partnerships.company_id')
                            ->join('users', function($join) {
                                $join->on('users.userable_id', '=', 'companies.id')
                                     ->where('users.user_type', '=', 'c');
                            })
                            ->select('partnerships.*', 'users.image as company_image', 'companies.name as company_name')
                            ->groupBy('partnerships.school_id', 'partnerships.company_id')
                            ->where('partnerships.school_id', '=', \Auth::user()->userable->id)
                            ->where('partnerships.status', '=', '1')
                            ->get();
        }

        // dd($partners);
        return view('partnership.index', compact('partners'));
    }
}
