<?php

namespace sidelines\Http\Middleware;

use Closure;

class UserMiddleware
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
            if($request->user()->id != $request->id)
            {
                return redirect('/' . $request->id);
            }
        }
        else {
            return redirect('/preregister');
        }

        // dd($request->user()->id);
        return $next($request);
    }
}
