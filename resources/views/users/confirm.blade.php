@extends('master.master-reg')
@section('title', 'Sidelines')

@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="right_col signup_bg" role="main">
        <div class="container">
            <div class="col-md-12 col-sm-12 col-xs-12 signup_box">
                <div class="x_panel_confirmation panel_confirm ">
                    <div class="x_content confirmation_content">
                        <div class="row">
                            <div class="col-lg-5 col-md-5 col-sm-6 col-xs-12">
                                <img src="{{ asset('dist/img/confirm-mail.png')}}" class="confirm_mail_img img-responsive">
                            </div>
                            <div class="col-lg-7 col-md-7 col-sm-6 col-xs-12">
                                <h4 class="sky_blue"> JUST ONE MORE STEP... </h4>

                                <p class="confirm_text">
                                    Please verify your email adress so you can sign
                                    in if you ever forget your password. We’ve sent a
                                    confirmation email to:
                                </p>
                                <p class="text-center user_confirm_email">
                                    {{ Auth::user()->email }}
                                </p>
                            </div>
                        </div>
                    </div>
                    {!! Form::open(array('url' => Auth::user()->id . "/verify", 'class' => 'form', 'id' => 'demo-form')) !!}
                    <div class="col-xs-12 confirm_bottom text-center">
                        @if(empty($message))
                            If you still dont see it, you can {!! Form::submit('resend the confirmation email.', ['id' => 'submit']) !!} </a>
                        @else
                            <span class="resend-confirmation-link"> Mail sent! Please check your email </span>
                        @endif
                    </div>
                    {!! Form::close() !!}
                </div>
                @if(!empty($message))
                    <div class="btn btn-danger">
                        {{ $message }}
                    </div>
                @endif
            </div>
        </div>
    </div>


@endsection
