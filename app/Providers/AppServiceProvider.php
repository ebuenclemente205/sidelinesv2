<?php

namespace sidelines\Providers;

use sidelines\Category;
use sidelines\Job;
use sidelines\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(Request $request)
    {
        \Validator::extend('less_than', function($attribute, $value, $parameters, $validator) {
            $year_present = date('Y');

            return $value <= $year_present;
        });

        \Validator::extend('less_than_current_date', function($attribute, $value, $parameters, $validator) {
            $year_present = date('Y-m-d');

            return $value <= $year_present;
        });

        \Validator::extend('greater_than', function($attribute, $value, $parameters, $validator) {
          $min_field = $parameters[0];
          $data = $validator->getData();
          $min_value = $data[$min_field];
          return $value > $min_value;
        });

        \View::composer('layouts.main-sidebar', function($view)
        {
            $categories = Category::with(['jobs' => function($query) {
                $query->where('deadline_of_application', '>=', date("Y-m-d"));
            }])->get();

            $jobs = Job::where('deadline_of_application', '>=', date("Y-m-d"))->orderBy('created_at', 'DESC')->get();

            $view->with([
                'categories' => $categories,
                'jobs' => $jobs
            ]);
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
