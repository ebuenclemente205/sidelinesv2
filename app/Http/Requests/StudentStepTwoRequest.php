<?php

namespace sidelines\Http\Requests;

use sidelines\Http\Requests\Request;

class StudentStepTwoRequest extends Request
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
            'school_id' => 'required',
            'degree_id' => 'required_if:educational_attainment,College',
            'educational_attainment' => 'required|in:College,Highschool,Elementary',
            'edu_start' => 'required',
            'edu_end' => 'required|less_than|greater_than:edu_start',
        ];
    }
}
