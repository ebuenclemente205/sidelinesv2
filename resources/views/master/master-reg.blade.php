<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title> @yield('title')</title>

    <link rel="shortcut icon" href="{!! asset('dist/img/icon.ico') !!}">
    <!-- Bootstrap -->
    <link href="{!! asset('dist/plugins/bootstrap/dist/css/bootstrap.min.css') !!}" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="{!! asset('dist/plugins/font-awesome/css/font-awesome.min.css') !!}" rel="stylesheet">
    <!-- iCheck -->
    <link href="{!! asset('dist/plugins/iCheck/skins/flat/green.css') !!}" rel="stylesheet">
    <!-- bootstrap-progressbar -->
    <link href="{!! asset('dist/plugins/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css') !!}" rel="stylesheet">
    <!-- jVectorMap -->
    <link href="{!! asset('dist/css/maps/jquery-jvectormap-2.0.3.css') !!}" rel="stylesheet"/>
    <!-- switch -->
    <link href="{!! asset('dist/plugins/switchery/dist/switchery.min.css') !!}" rel="stylesheet">
    <!-- select 2 -->
    <link href="{!! asset('dist/plugins/select2/dist/css/select2.min.css') !!}" rel="stylesheet">

    <!-- Custom Theme Style -->
    <link href="{!! asset('dist/css/custom.css') !!}" rel="stylesheet">

    <!-- Monserrat font -->
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>

  </head>

  <body class="nav-md">
      <div class="container body">
          <div class="main_container">

            @include('master.master-header-reg')
            @yield('content')
            @include('master.master-footer-reg')

        </div>
      </div>
      <!-- jQuery -->
      <script src="{!! asset('dist/plugins/jQuery/jQuery-2.1.4.min.js') !!}"></script>
      <script src="{!! asset('dist/plugins/jQueryUI/jquery-ui-1.10.3.min.js') !!}" type="text/javascript"></script>
      <!-- switch -->
      <script src="{!! asset('dist/plugins/switchery/dist/switchery.min.js') !!}"></script>
      <!-- Bootstrap -->
      <script src="{!! asset('dist/plugins/bootstrap/dist/js/bootstrap.min.js') !!}"></script>
      <!-- FastClick -->
      <script src="{!! asset('dist/plugins/fastclick/lib/fastclick.js') !!}"></script>
      <!-- NProgress -->
      <script src="{!! asset('dist/plugins/nprogress/nprogress.js') !!}"></script>
      <!-- Chart.js -->
      <script src="{!! asset('dist/plugins/Chart.js/dist/Chart.min.js') !!}"></script>
      <!-- gauge.js -->
      <script src="{!! asset('dist/plugins/bernii/gauge.js/dist/gauge.min.js') !!}"></script>
      <!-- bootstrap-progressbar -->
      <script src="{!! asset('dist/plugins/bootstrap-progressbar/bootstrap-progressbar.min.js') !!}"></script>
      <!-- iCheck -->
      <script src="{!! asset('dist/plugins/iCheck/icheck.min.js') !!}"></script>
      <!-- Skycons -->
      <script src="{!! asset('dist/plugins/skycons/skycons.js') !!}"></script>
      <!-- Flot -->
      <script src="{!! asset('dist/plugins/Flot/jquery.flot.js') !!}"></script>
      <script src="{!! asset('dist/plugins/Flot/jquery.flot.pie.js') !!}"></script>
      <script src="{!! asset('dist/plugins/Flot/jquery.flot.time.js') !!}"></script>
      <script src="{!! asset('dist/plugins/Flot/jquery.flot.stack.js') !!}"></script>
      <script src="{!! asset('dist/plugins/Flot/jquery.flot.resize.js') !!}"></script>
      <!-- Flot plugins -->
      <script src="{!! asset('dist/js/flot/jquery.flot.orderBars.js') !!}"></script>
      <script src="{!! asset('dist/js/flot/date.js') !!}"></script>
      <script src="{!! asset('dist/js/flot/jquery.flot.spline.js') !!}"></script>
      <script src="{!! asset('dist/js/flot/curvedLines.js') !!}"></script>
      <!-- jVectorMap -->
      <script src="{!! asset('dist/js/maps/jquery-jvectormap-2.0.3.min.js') !!}"></script>
      <!-- bootstrap-daterangepicker -->
      <script src="{!! asset('dist/js/moment/moment.min.js') !!}"></script>
      <script src="{!! asset('dist/js/datepicker/daterangepicker.js') !!}"></script>

      <!-- Select 2 -->
      <script src="{!! asset('dist/plugins/select2/dist/js/select2.full.min.js') !!}"></script>

      <!-- Autocomplete -->
      <script src="{!! asset('dist/plugins/devbridge-autocomplete/dist/jquery.autocomplete.min.js') !!}"></script>

      <!-- Custom Theme Scripts -->
      <script src="{!! asset('dist/js/custom.js') !!}"></script>

      <!-- React JS -->
      <script src="{!! asset('dist/js/react.js') !!}"></script>
      <script src="{!! asset('dist/js/react-dom.js') !!}"></script>
      <script src="{!! asset('dist/js/browser.min.js') !!}"></script>
      @yield('script')

</body>
</html>
