@extends('master.master-reg')
@section('title', 'Sidelines')

@section('content')
    <!-- Content Wrapper. Contains page content -->
<div class="right_col" role="main">
  <div class="page-title"></div>
    <div class="clearfix">
        <div class="title_center light_blue"><p class="font-32">Let's get started!</p></div>
        <div class="title_center gray content_font"><p class="font-18">First, select who you are.</p></div>
    </div>
    <div class="container" style="height:440px;">
        <div class="row"><br/>
            <div class="col-md-4 col-sm-4 col-xs-12">
                {!! Form::open(array('url' => 'signup/student', 'class' => 'form')) !!}
        			{!!  Form::hidden('user_type', 'c') !!}
                    <a href="#">
                        <div class="x_panel panel_user1">
                            <div class="x_content">
                                <div>
                                  <img src="/dist/img/company.png" alt="..." class="img-circle choose_img1 img_responsive">
                                </div>
                                <div>
                                  <br><br><p class="font-22 dark_blue title_center">I'm an employer</p>
                                </div>
                            </div>
                        </div>
                    </a>
                {!! Form::close() !!}
            </div>

            <div class="col-md-4 col-sm-4 col-xs-12">
                <a href="{{ URL::route('users.pickstudent', Auth::user()->id) }}">
                    <div class="x_panel panel_user2">
                        <div class="x_content">
                            <div>
                              <img src="/dist/img/student.png" alt="..." class="img-circle choose_img2 img_responsive">
                            </div>
                            <div>
                              <br><br><p class="font-22 light_green title_center">I'm a student</p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-md-4 col-sm-4 col-xs-12">
                <a href="#">
                    <div class="x_panel panel_user3">
                        <div class="x_content">
                            <div>
                              <img src="/dist/img/faculty.png" alt="..." class="img-circle choose_img3 img_responsive">
                            </div>
                            <div>
                              <br/><br/><p class="font-22 light_red title_center">I'm a teacher</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 bottom text-center"></div>
                </a>
            </div>
        </div>
      <!-- end of row -->
  </div>
</div>

@endsection
