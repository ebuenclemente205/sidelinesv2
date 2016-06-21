<?php

namespace sidelines;

use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    // The attributes that are mass assignable.
    protected $fillable = ['name', 'description', 'address', 'country', 'zipcode', 'tel_no', 'website', 'keycode'];

    public function user() {
        return $this->morphOne('sidelines\User', 'userable');
    }

    public function deans_faculties()
    {
        return $this->hasMany('sidelines\DeanFaculty');
    }

    public function students()
    {
        return $this->hasMany('sidelines\Student');
    }

    public function partners()
    {
        return $this->belongsToMany('sidelines\Company', 'partnerships')
                    ->withPivot('status')
                    ->withTimestamps();
    }

    public function educations()
    {
        return $this->hasMany('sidelines\Student');
    }
}
