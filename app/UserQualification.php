<?php

namespace sidelines;

use Illuminate\Database\Eloquent\Model;

class UserQualification extends Model
{
    protected $fillable = ['qual_description'];

    public function student()
    {
        return $this->belongsTo('sidelines\Student');
    }
}
