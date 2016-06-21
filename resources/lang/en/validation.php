<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'accepted'             => 'The :attribute must be accepted.',
    'active_url'           => 'The :attribute is not a valid URL.',
    'after'                => 'The :attribute must be a date after :date.',
    'alpha'                => 'The :attribute may only contain letters.',
    'alpha_dash'           => 'The :attribute may only contain letters, numbers, and dashes.',
    'alpha_num'            => 'The :attribute may only contain letters and numbers.',
    'array'                => 'The :attribute must be an array.',
    'before'               => 'The :attribute must be a date before :date.',
    'between'              => [
        'numeric' => 'The :attribute must be between :min and :max.',
        'file'    => 'The :attribute must be between :min and :max kilobytes.',
        'string'  => 'The :attribute must be between :min and :max characters.',
        'array'   => 'The :attribute must have between :min and :max items.',
    ],
    'boolean'              => 'The :attribute field must be true or false.',
    'confirmed'            => 'The :attribute confirmation does not match.',
    'date'                 => 'The :attribute is not a valid date.',
    'date_format'          => 'The :attribute does not match the format :format.',
    'different'            => 'The :attribute and :other must be different.',
    'digits'               => 'The :attribute must be :digits digits.',
    'digits_between'       => 'The :attribute must be between :min and :max digits.',
    'email'                => 'The :attribute must be a valid email address.',
    'exists'               => 'The selected :attribute is invalid.',
    'filled'               => 'The :attribute field is required.',
    'image'                => 'The :attribute must be an image.',
    'in'                   => 'The selected :attribute is invalid.',
    'integer'              => 'The :attribute must be an integer.',
    'ip'                   => 'The :attribute must be a valid IP address.',
    'json'                 => 'The :attribute must be a valid JSON string.',
    'max'                  => [
        'numeric' => 'The :attribute may not be greater than :max.',
        'file'    => 'The :attribute may not be greater than :max kilobytes.',
        'string'  => 'The :attribute may not be greater than :max characters.',
        'array'   => 'The :attribute may not have more than :max items.',
    ],
    'mimes'                => 'The :attribute must be a file of type: :values.',
    'min'                  => [
        'numeric' => 'The :attribute must be at least :min.',
        'file'    => 'The :attribute must be at least :min kilobytes.',
        'string'  => 'The :attribute must be at least :min characters.',
        'array'   => 'The :attribute must have at least :min items.',
    ],
    'not_in'               => 'The selected :attribute is invalid.',
    'numeric'              => 'The :attribute must be a number.',
    'regex'                => 'The :attribute format is invalid.',
    'required'             => 'The :attribute field is required.',
    'required_if'          => 'The :attribute field is required when :other is :value.',
    'required_unless'      => 'The :attribute field is required unless :other is in :values.',
    'required_with'        => 'The :attribute field is required when :values is present.',
    'required_with_all'    => 'The :attribute field is required when :values is present.',
    'required_without'     => 'The :attribute field is required when :values is not present.',
    'required_without_all' => 'The :attribute field is required when none of :values are present.',
    'same'                 => 'The :attribute and :other must match.',
    'size'                 => [
        'numeric' => 'The :attribute must be :size.',
        'file'    => 'The :attribute must be :size kilobytes.',
        'string'  => 'The :attribute must be :size characters.',
        'array'   => 'The :attribute must contain :size items.',
    ],
    'string'               => 'The :attribute must be a string.',
    'timezone'             => 'The :attribute must be a valid zone.',
    'unique'               => 'The :attribute has already been taken.',
    'url'                  => 'The :attribute format is invalid.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'fname' => [
            'required' => 'First name is required',
            'max' => 'Maximum of 255 characters',
            'regex' => 'Valid characters are (a-z A-Z) only.'
        ],
        'lname' => [
            'required' => 'Last name is required',
            'max' => 'Maximum of 255 characters',
            'regex' => 'Valid characters are (a-z A-Z) only.'
        ],
        'school_id' => [
            'required' => 'School field is required',
        ],
        'degree_id' => [
            'required' => 'Degree is required',
            'required_if' => 'Course field is required',
        ],
        'yr_lvl' => [
            'required' => 'Year level is required',
            'integer' => 'Must be numeric',
            'between' => 'Must be between 1 & 10'
        ],
        'contact_no' => [
            'regex' => 'Valid characters are (1-9) only.'
        ],
        'date_of_birth' => [
            'required' => 'Date of birth is required',
            'date_format' => 'Date format should be mm-dd-yyyy.'
        ],
        'educational_attainment' => [
            'required' => 'Choose from given options'
        ],
        'edu_start' => [
            'required' => 'Year attended is required',
        ],
        'edu_end' => [
            'required' => 'Year attended is required',
            'greater_than' => 'Year started must be a date before year ended',
            'less_than' => 'School ended is invalid'
        ],
        'work_start' => [
            'required' => 'Time period fields are required',
        ],
        'work_end' => [
            'required' => 'Time period fields are required. ',
            'greater_than' => 'Work started must be a date before work ended. ',
            'less_than_current_date' => 'Work ended is an invalid. '
        ],
        'exp_start' => [
            'required' => 'Time period fields are required',
        ],
        'exp_end' => [
            'required' => 'Time period fields are required',
            'greater_than' => 'Time started must be a date before time ended',
            'less_than_current_date' => 'Date must not be after today'
        ],
        'achieve_date' => [
            'less_than_current_date' => 'Date must not be after today'
        ],
        'seminar_date' => [
            'less_than_current_date' => 'Date must not be after today'
        ],
        'org_start' => [
            'required' => 'Year attended is required',
        ],
        'org_end' => [
            'required' => 'Year attended is required',
            'greater_than' => 'Year started must be a date before year ended',
            'less_than_current_date' => 'Year ended is invalid'
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */

    'attributes' => [],

];
