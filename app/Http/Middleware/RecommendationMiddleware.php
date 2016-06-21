<?php

namespace sidelines\Http\Middleware;

use Closure;

class RecommendationMiddleware
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
            if(\Auth::user()->user_type === 'd' || \Auth::user()->user_type === 'f')
            {
                return $next($request);
            }
            else
            {
                return \Redirect('recommendations.index');
            }
        }
        else
        {
            return \Redirect('recommendations.index');
        }

    }
}
