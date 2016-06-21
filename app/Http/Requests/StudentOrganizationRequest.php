<?php

namespace sidelines\Http\Requests;

use sidelines\Http\Requests\Request;

class StudentOrganizationRequest extends Request
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
                    'org_name' => 'required|max:60',
                'org_position' => 'required|max:60',
                   'org_start' => 'required',
                     'org_end' => 'required|less_than_current_date|greater_than:org_start',
        ];
    }
}
