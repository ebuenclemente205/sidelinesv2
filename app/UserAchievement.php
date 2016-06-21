<?php

namespace sidelines;

use Illuminate\Database\Eloquent\Model;

class UserAchievement extends Model
{
    protected $fillable = ['achieve_description'];

    public function student()
    {
        return $this->belongsTo('sidelines\Student');
    }
}
