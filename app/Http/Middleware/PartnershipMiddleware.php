<?php

namespace sidelines\Http\Middleware;

use Closure;

class PartnershipMiddleware
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
            if(\Auth::user()->user_type === 'sa' || \Auth::user()->user_type === 'c')
            {
                return $next($request);
            }
            else
            {
                return \Redirect('partnership.index');
            }
        }
        else
        {
            return \Redirect('partnership.index');
        }
    }
}
