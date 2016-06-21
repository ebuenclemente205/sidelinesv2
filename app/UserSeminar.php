<?php

namespace sidelines;

use Illuminate\Database\Eloquent\Model;

class UserSeminar extends Model
{
    public function student()
    {
        return $this->belongsTo('sidelines\Student');
    }
}
