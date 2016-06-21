<?php

namespace sidelines\Http\Requests;

use sidelines\Http\Requests\Request;

class StudentExperienceRequest extends Request
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
                   'exp_title' => 'required|max:60',
         'exp_name_of_company' => 'required|max:60',
                'exp_location' => 'required',
                   'exp_start' => 'required',
                     'exp_end' => 'required|less_than_current_date|greater_than:exp_start',
             'exp_description' => 'max:1000',
        ];
    }
}
