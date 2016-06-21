<?php

namespace sidelines;

use Illuminate\Database\Eloquent\Model;

class DeanFaculty extends Model
{
    // The attributes that are mass assignable.
    protected $fillable = ['lname', 'fname', 'mname', 'gender', 'address', 'date_of_birth',
            'address', 'contact_no', 'about_me', 'experience', 'education', 'achievements', 'seminars', 'organizations'];

    public function user()
    {
        return $this->morphOne('sidelines\User', 'userable');
    }

    public function school()
    {
        return $this->belongsTo('sidelines\School');
    }

    public function recommendations()
    {
        return $this->belongsToMany('sidelines\Student', 'recommendations')
                    ->withPivot('id', 'recommendation_details', 'attachments')
                    ->withTimestamps();
    }
}
