<div class="navbar navbar-default navbar-fixed-top nav_color">
    <div class="container">
        <div class="navbar-header">
         <a href="/"><img src="/dist/img/slogo.png" class="pull-left img-responsive logo-size"></a>
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        @if(!Auth::check())
            <div class="navbar-collapse collapse nav-reg">
                <ul class="register-nav">
                    <li class="pull-right white font-14">Already have an account? <a href="login" class="href-login">Login</a></li>
                </ul>
            </div>
        @else
            <div class="navbar-collapse collapse nav-reg">
                <ul class="register-nav">
                    <li class="pull-right white font-14">
                        <a href="/logout" class="href-login">Logout</a>
                    </li>
                </ul>
            </div>
        @endif
    </div>
</div>
