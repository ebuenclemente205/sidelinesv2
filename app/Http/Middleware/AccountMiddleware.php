<?php

namespace sidelines\Http\Middleware;

use Closure;

class AccountMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(\Auth::check())
        {
            $user_type = \Auth::user()->user_type;

            if($user_type === 's')
            {
                // TODO: Redirect to jobs
                return redirect('/' . \Auth::user()->id);
            }
            else if($user_type === 'sa')
            {
                return redirect('/students');
            }
            else if($user_type === 'c')
            {
                // TODO: Redirect to applications
                return redirect('/' . \Auth::user()->id);
            }
            else if($user_type === 'd')
            {
                // TODO: Redirect to applications
                return redirect('/' . \Auth::user()->id);
            }
            else if($user_type === 'f')
            {
                // TODO: Redirect to applications
                return redirect('/' . \Auth::user()->id);
            }
        }

        return $next($request);
    }
}
