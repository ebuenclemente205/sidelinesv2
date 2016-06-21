<?php

namespace sidelines\Http\Requests;

use sidelines\Http\Requests\Request;

class StudentEditProfileRequest extends Request
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
                    'fname' => 'required|max:255|regex:/^[a-zA-ZÑñ\s]+$/',
                    'lname' => 'required|max:255|regex:/^[a-zA-ZÑñ\s]+$/',
                     'file' => 'image|mimes:jpg,jpeg,png',
               'contact_no' => 'required|regex:/^[-0-9\+]+$/',
                'school_id' => 'required',
                'degree_id' => 'required',
        ];
    }
}
