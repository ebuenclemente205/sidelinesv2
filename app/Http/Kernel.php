<?php

namespace sidelines\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * @var array
     */
    protected $middleware = [
        \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
        \sidelines\Http\Middleware\EncryptCookies::class,
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        //\sidelines\Http\Middleware\VerifyCsrfToken::class,
    ];

    /**
     * The application's route middleware.
     *
     * @var array
     */
    protected $routeMiddleware = [
        'auth' => \sidelines\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'guest' => \sidelines\Http\Middleware\RedirectIfAuthenticated::class,
        'user' => \sidelines\Http\Middleware\UserMiddleware::class,
        'account' => \sidelines\Http\Middleware\AccountMiddleware::class,
        'job' => \sidelines\Http\Middleware\JobMiddleware::class,
        'application' => \sidelines\Http\Middleware\ApplicationMiddleware::class,
        'recommendation' => \sidelines\Http\Middleware\RecommendationMiddleware::class,
        'partnership' =>  \sidelines\Http\Middleware\PartnershipMiddleware::class,
        'payment' =>  \sidelines\Http\Middleware\PaymentMiddleware::class,
        'admin' => \sidelines\Http\Middleware\AdminMiddleware::class,
    ];
}
