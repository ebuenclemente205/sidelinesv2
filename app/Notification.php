<?php

namespace sidelines;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    public function user()
    {
        return $this->belongsTo('sidelines\User', 'user_id');
    }

    public function sender()
    {
        return $this->belongsTo('sidelines\User', 'sender_id');
    }
}
