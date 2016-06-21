<?php

namespace sidelines;

use Illuminate\Database\Eloquent\Model;

class UserWork extends Model
{
    protected $fillable = ['work_description'];

    public function student()
    {
        return $this->belongsTo('sidelines\Student');
    }
}
