<?php

namespace sidelines;

use Illuminate\Database\Eloquent\Model;

class UserExperience extends Model
{
    protected $fillable = ['exp_description'];

    public function student()
    {
        return $this->belongsTo('sidelines\Student');
    }
}
