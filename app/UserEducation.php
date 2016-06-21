<?php

namespace sidelines;

use Illuminate\Database\Eloquent\Model;

class UserEducation extends Model
{
    public function student()
    {
        return $this->belongsTo('sidelines\Student');
    }

    public function school()
    {
        return $this->belongsTo('sidelines\School');
    }

    public function degree()
    {
        return $this->belongsTo('sidelines\Degree');
    }
}
