@extends('master.master-reg')
@section('title', 'Sidelines')

@section('content')
    <!-- Content Wrapper. Contains page content -->
<div class="container body">
  <div class="main_container">
    <div class="right_col" role="main">
      <div class="page-title"></div>
        <div class="clearfix">
            <div class="title_center light_blue"><p class="font-32">Hi! Let's build your profile.</p></div>
        </div>
        <div class="container">
            <div class="row" id="student-steps">
                <script>  window.userid  = '{{ Auth::user()->id }}'; </script>
                <script>  window.step = '{{ Auth::user()->registration_status }}'; </script>
            </div>
        </div>
    </div>
  </div>
</div>

@endsection

@section('script')
    <script src="{!! asset('react-pages/onboarding/studentSteps.js') !!}"></script>
@endsection
