<?php

namespace sidelines;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    // The attributes that are mass assignable.
    protected $fillable = ['lname', 'fname', 'mname', 'gender', 'address',
            'date_of_birth', 'address', 'yr_lvl', 'contact_no', 'objective', 'about_me', 'experience',
            'education', 'achievements', 'seminars', 'organizations'];

    public function user() {
        return $this->morphOne('sidelines\User', 'userable');
    }

    public function school()
    {
        return $this->belongsTo('sidelines\School');
    }

    public function skills()
    {
        return $this->belongsToMany('sidelines\Skill')->withTimestamps();
    }

    public function getSkillListAttribute()
    {
        return $this->skills->lists('name')->toArray();
    }

    public function applications()
    {
        return $this->belongsToMany('sidelines\Job', 'applications')->withTimestamps();
    }

    public function degree()
    {
        return $this->belongsTo('sidelines\Degree');
    }

    public function recommendations()
    {
        return $this->belongsToMany('sidelines\DeanFaculty', 'recommendations')
                    ->withPivot('id', 'recommendation_details', 'attachments')
                    ->withTimestamps();
    }

    public function payments()
    {
        return $this->hasMany('sidelines\Payment');
    }

    public function user_works()
    {
        return $this->hasMany('sidelines\UserWork');
    }

    public function user_experiences()
    {
        return $this->hasMany('sidelines\UserExperience');
    }

    public function user_qualifications()
    {
        return $this->hasMany('sidelines\UserQualification');
    }

    public function user_educations()
    {
        return $this->hasMany('sidelines\UserEducation');
    }

    public function user_achievements()
    {
        return $this->hasMany('sidelines\UserAchievement');
    }

    public function user_seminars()
    {
        return $this->hasMany('sidelines\UserSeminar');
    }

    public function user_organizations()
    {
        return $this->hasMany('sidelines\UserOrganization');
    }

    public function student_recommendations()
    {
        return $this->hasMany('sidelines\StudentRecommendation');
    }
}
