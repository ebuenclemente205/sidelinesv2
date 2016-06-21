<?php

namespace sidelines\Http\Middleware;

use Closure;

class ApplicationMiddleware
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
            if(\Auth::user()->user_type === 'c')
            {
                return \Redirect::route('recommendations.index');
            }
            else
            {
                return $next($request);
            }
        }
        else
        {
            return redirect('preregister');
        }
    }
}
