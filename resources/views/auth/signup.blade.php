@extends('master.master-reg')
@section('title', 'Sidelines')

@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="right_col signup_bg" role="main">
      <div class="page-title"></div>
        <div class="container">
            <div class="row"><br/>
                <div class="col-md-12 col-sm-12 col-xs-12 signup_box">
                    <div class="x_panel panel_signup">
                        <div class="x_content signup_content">
                          <div class="title_center">
                              <p class="font-26"> Sign up </p>
                          </div>
                          {!! Form::open(array('url' => 'register', 'class' => 'form', 'id' => 'demo-form')) !!}
                                <div>
                                    <button class="btn btn-facebook btn-block btn-sm font-16 btn-social-icon">
                                        <i class="fa fa-facebook"></i> Login with Facebook
                                    </button>
                                    <button class="btn btn-google btn-block btn-sm font-16 btn-social-icon">
                                        <i class="fa fa-google"></i> Login with Gmail
                                    </button>
                                </div>
                                <div class="login_form"><h4 class="title_center">or</h4></div>
                                <div class="form-group-signup has-feedback">
                                    {!! Form::text('email', null, ['class'=>'form-control','placeholder'=>'Email']) !!}

                                    <span class="fa fa-user form-control-feedback"></span>
                                </div>
                                <div class="form-group-signup has-feedback">
                                    {!! Form::password('password', ['class'=>'form-control','placeholder'=>'Password']) !!}

                                    <span class="fa fa-lock form-control-feedback"></span>
                                </div>
                                @if(!empty($errors->all()))
                                  <div class="alert alert-danger alert-dismissable">
                                    {{ $errors->first() }}
                                  </div>
                                @endif
                                <div class="row">
                                      <div class="col-md-8 col-sm-8 col-xs-12">
                                        <label class="label-form">
                                          Already have an account? <a href="{{ URL::to('/login') }}" class="sign-up-link">Login</a>
                                        </label>
                                      </div><!-- /.col -->
                                      <div class="col-md-4 col-sm-4 col-xs-12">
                                          {!! Form::submit('Sign up', ['class'=>'btn btn-primary btn-block btn-flat']) !!}
                                      </div><!-- /.col -->
                                </div><!-- Close Row -->
                                <!-- Close Form -->
                                <p class="label-form title_center term-adjust">
                                    By signing up, you agree to Sidelines' <a href="#" class="link-href">Terms.</a>
                                </p>
                            {!! Form::close() !!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


@endsection
