<?php

namespace sidelines;

use Illuminate\Database\Eloquent\Model;

class Degree extends Model
{
    protected $fillable = ['acronym', 'name'];

    public function students()
    {
        return $this->hasMany('sidelines\Student');
    }

    public function educations()
    {
        return $this->hasMany('sidelines\UserEducation');
    }
}
