<?php

namespace sidelines\Http\Requests;

use sidelines\Http\Requests\Request;

class JobFormRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
            'major_benefit' => 'required',
            'categories' => 'required|min:1',
            'deadline_of_application' => 'required|after:today',
        ];
    }
}
