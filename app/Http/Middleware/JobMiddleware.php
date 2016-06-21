<?php

namespace sidelines\Http\Middleware;

use Closure;
use sidelines\Job;

class JobMiddleware
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
                if(ends_with($request->route()->getActionName(), 'JobsController@edit'))
                {
                    $parameters = $request->route()->parameters();

                    $job = Job::find($parameters['jobs']);

                    if($job != null)
                    {
                        if($request->user()->userable->id != $job->company->id)
                        {
                            return redirect('/jobs' . '/' . $job->id);
                        }
                    }
                    else
                    {
                        return redirect('/jobs');
                    }
                }
            }
            else
            {
                return redirect('/jobs');
            }
        }
        else {
            return redirect('/jobs');
        }

        return $next($request);
    }
}
