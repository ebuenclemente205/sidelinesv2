<?php

namespace sidelines\Http\Requests;

use sidelines\Http\Requests\Request;

class StudentSeminarRequest extends Request
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
               'seminar_title' => 'required|max:60',
                'seminar_date' => 'required|date|less_than_current_date',               
        ];
    }
}
