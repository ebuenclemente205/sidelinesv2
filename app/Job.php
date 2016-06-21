<?php

namespace sidelines;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Job extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'description', 'major_benefit', 'other_benefits', 'deadline_of_application'];

    protected $dates = ['deleted_at'];

    public function company()
    {
        return $this->belongsTo('sidelines\Company');
    }

    public function categories()
    {
        return $this->belongsToMany('sidelines\Category')->withTimestamps();
    }

    public function applicants()
    {
        return $this->belongsToMany('sidelines\Student', 'applications')->withTimestamps();
    }

    public function getJobListAttribute()
    {
        $this->categories->lists('id')->toArray();
    }
}
