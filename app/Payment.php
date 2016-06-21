<?php

namespace sidelines;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    public function company()
    {
        return $this->belongsTo('sidelines\Company');
    }

    public function student()
    {
        return $this->belongsTo('sidelines\Student');
    }
}
