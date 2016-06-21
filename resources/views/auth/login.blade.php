@extends('master.master-reg')
@section('title', 'Sidelines')

@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="right_col signup_bg" role="main">
      <div class="page-title"></div>
        <div class="container">
            <div class="col-md-12 col-sm-12 col-xs-12 signup_box">
                <div class="x_panel_login panel_login">
                    <div class="x_content login_content">
                      <div class="title_center">
                          <p class="font-26"> User Login </p>
                      </div>
                      {!! Form::open(array('url' => 'login', 'class' => 'form', 'id' => 'demo-form')) !!}
                        @if(!empty($errors->all()))
                          <div class="alert alert-danger alert-dismissable">
                           {{ $errors->first() }}
                          </div>
                        @endif
                        <div class="form-group has-feedback">
                            {!! Form::text('email', null, ['class'=>'form-control','placeholder'=>'Email']) !!}
                        </div>
                        <div class="form-group has-feedback">
                            {!! Form::password('password', ['class'=>'form-control','placeholder'=>'Password']) !!}
                        </div>
                        <div class="forgot-pass pull-right">
                            <a href="{{ URL::to('/login') }}"> Forgot your password? </a>
                        </div>
                        <div class="row">
                          <div class="col-md-12 col-sm-12 col-xs-12">
                              {!! Form::submit('Sign in', ['class'=>'btn btn-block btn-flat btn-login']) !!}
                          </div><!-- /.col -->
                        </div><!-- Close Row -->
                        <hr/>
                            <div class="row social-login">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <button class="btn btn-facebook btn-block btn-sm font-14 btn-social-icon-login">
                                        <i class="fa fa-facebook"></i> Connect with Facebook
                                    </button>
                                </div>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <button class="btn btn-google btn-block btn-sm font-14 btn-social-icon-login">
                                        <i class="fa fa-google"></i> Connect with Gmail
                                    </button>
                                </div><!-- /.col -->
                            </div><!-- Close Row -->

                        {!! Form::close() !!}
                    </div>
                    <div class="col-xs-12 login-bottom text-center">
                        <p>
                            Don't have an account? <a href="/signup" class="sign-up-link"> Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
