@extends('master.master')
@section('title', 'Sidelines')

@section('content')
    <!-- Content Wrapper. Contains page content -->

    <div class="right_col signup_bg" role="main">
        <div class="container">
            <div class="col-md-12 col-sm-12 col-xs-12 signup_box">
                <div class="x_panel_confirmation panel_confirm ">
                    <div class="x_content_rating">
                        <div class="rating_header">
                            <div class="img_wrapper">
                                @if($student->user->image)
                                  <img src="{{ asset('img/profilepics/' . $student->user->image )}}" class="rating_img img-responsive">
                                @endif
                                <h2 class="text-center"> {{ $student->fname . " " . $student->lname }} </h2>
                            </div>
                        </div>
                        <div class="rating_body">
                            <h5 class="text-center"> How do you rate {{ $student->fname }}'s: </h5>
                            <div class="rating_student">
                                <form class="form">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-md-offset-9">
                                                <h5 class="text-center"> Rating </h5>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <h3 class="rating_align"> Character </h3>
                                            </div>
                                            <div class="col-md-6">
                                                <div>
                                                    <div class="starrr stars"></div>
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <h3> <span class="stars-count" id="character_rating">0</span> </h3>
                                            </div>
                                            <div class="col-md-4">
                                                <h3 class="rating_align"> Skills </h3>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="starrr stars2"></div>
                                            </div>
                                            <div class="col-md-2">
                                                <h3> <span class="stars-count-2" id="skill_rating">0</span> </h3>
                                            </div>
                                        </div>
                                        <div class="col-md-12 col-sm-12 col-xs-12 rating_instruction">
                                            <p class="text-center"> Hover and click on a star to rate.</p>
                                        </div>
                                        <div class="col-md-offset-3 col-md-6 col-sm-12 col-xs-12">
                                            <input type="submit" id="submit_rating" class="btn btn-block btn-flat btn-login" value="Submit">
                                        </div>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


@endsection
