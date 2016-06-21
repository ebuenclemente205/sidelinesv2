<?php

namespace sidelines\Http\Controllers\Admin;

use Illuminate\Http\Request;

use sidelines\Company;
use sidelines\Http\Requests;
use sidelines\Http\Controllers\Controller;

class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companies = Company::with('user')->get();

        return view('admin._companyLists', compact('companies'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $company = Company::find($id);

        $company->user->destroy();
        $company->destroy();
    }
}
