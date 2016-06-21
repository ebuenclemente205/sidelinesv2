<?php

namespace sidelines;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = ['name'];

    public function students()
    {
        return $this->belongsToMany('sidelines\Student')->withTimestamps();
    }

    public function degree()
    {
        return $this->belongsTo('sidelines\Degree');
    }
}
