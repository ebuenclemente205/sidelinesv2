<?php

namespace sidelines\Http\Requests;

use sidelines\Http\Requests\Request;

class StudentAchievementRequest extends Request
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
                        'file' => 'image|mimes:jpg,jpeg,png',
               'achieve_title' => 'required|max:60',
                'achieve_date' => 'required|date|less_than_current_date',               
         'achieve_description' => 'max:1000',
        ];
    }
}
