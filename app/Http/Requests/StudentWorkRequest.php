<?php

namespace sidelines\Http\Requests;

use sidelines\Http\Requests\Request;

class StudentWorkRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if(\Auth::check())
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
                   'work_title' => 'required|max:60',
                'work_position' => 'max:60',
                   'work_start' => 'required',
                     'work_end' => 'required|less_than_current_date|greater_than:work_start',
                     'work_url' => 'url',
                         'file' => 'image|mimes:jpg,jpeg,png',
             'work_description' => 'required|max:1000',
        ];
    }
}
