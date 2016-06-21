<?php

namespace sidelines;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    // The attributes that are mass assignable.
    protected $fillable = ['name', 'description', 'address', 'country', 'zipcode', 'tel_no', 'website'];

    public function user() {
        return $this->morphOne('sidelines\User', 'userable');
    }

    public function jobs()
    {
        return $this->hasMany('sidelines\Job');
    }

    public function partners()
    {
        return $this->belongsToMany('sidelines\School', 'partnerships')
                    ->withPivot('status')
                    ->withTimestamps();
    }

    public function payments()
    {
        return $this->hasMany('sidelines\Payment');
    }
}
