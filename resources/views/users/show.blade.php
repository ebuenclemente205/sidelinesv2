<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title> Sidelines</title>
    <link rel="shortcut icon" href="{!! asset('dist/img/icon.ico') !!}">
    <!-- Bootstrap -->
    <link href="{!! asset('/dist/plugins/bootstrap/dist/css/bootstrap.min.css') !!}" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="{!! asset('/dist/plugins/font-awesome/css/font-awesome.min.css') !!}" rel="stylesheet">
    <!-- iCheck -->
    <link href="{!! asset('/dist/plugins/iCheck/skins/flat/green.css') !!}" rel="stylesheet">
    <!-- bootstrap-progressbar -->
    <link href="{!! asset('/dist/plugins/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css') !!}" rel="stylesheet">
    <!-- jVectorMap -->
    <link href="{!! asset('/dist/css/maps/jquery-jvectormap-2.0.3.css" rel="stylesheet') !!}"/>
    <!-- select 2 -->
    <link href="{!! asset('dist/plugins/select2/dist/css/select2.min.css') !!}" rel="stylesheet">
    <link rel="stylesheet" href="https://npmcdn.com/react-select/dist/react-select.css">

    <!-- Custom Theme Style -->
    <link href="{!! asset('/dist/css/custom.css') !!}" rel="stylesheet">

    <link rel="stylesheet" href="{!! asset('dist/plugins/tourist/tourist.css') !!}" type="text/css" media="screen">

  </head>

   <body class="nav-md">
       <div class="container body">
           <div class="main_container" id="personal-info">
               <script>  window.userid  = '{{ $user->id }}'; </script>
               <script>  window.registration  = '{{ Auth::user()->registration_status }}'; </script>
            </div>
        </div>
    </body>
    <!-- jQuery -->
    <script src="{!! asset('dist/plugins/jQuery/jQuery-2.1.4.min.js') !!}"></script>
    <script src="{!! asset('dist/plugins/jQueryUI/jquery-ui-1.10.3.min.js') !!}" type="text/javascript"></script>
    <!-- Bootstrap -->
    <script src="{!! asset('/dist/plugins/bootstrap/dist/js/bootstrap.min.js') !!}"></script>
    <!-- Tourist -->
    <script src="{!! asset('/dist/plugins/tourist/underscore-1.4.4.js') !!}"></script>
    <script src="{!! asset('/dist/plugins/tourist/backbone-1.0.0.js') !!}"></script>
    <script src="{!! asset('/dist/plugins/tourist/tourist.js') !!}"></script>
    <!-- Select 2 -->
    <script src="{!! asset('dist/plugins/select2/dist/js/select2.full.min.js') !!}"></script>
    <!-- FastClick -->
    <script src="{!! asset('/dist/plugins/fastclick/lib/fastclick.js') !!}"></script>
    <!-- NProgress -->
    <script src="{!! asset('/dist/plugins/nprogress/nprogress.js') !!}"></script>
    <!-- Chart.js -->
    <script src="{!! asset('/dist/plugins/Chart.js/dist/Chart.min.js') !!}"></script>
    <!-- gauge.js -->
    <script src="{!! asset('/dist/plugins/bernii/gauge.js/dist/gauge.min.js') !!}"></script>
    <!-- bootstrap-progressbar -->
    <script src="{!! asset('/dist/plugins/bootstrap-progressbar/bootstrap-progressbar.min.js') !!}"></script>
    <!-- iCheck -->
    <script src="{!! asset('/dist/plugins/iCheck/icheck.min.js') !!}"></script>
    <!-- Skycons -->
    <script src="{!! asset('/dist/plugins/skycons/skycons.js') !!}"></script>
    <!-- Flot -->
    <script src="{!! asset('/dist/plugins/Flot/jquery.flot.js') !!}"></script>
    <script src="{!! asset('/dist/plugins/Flot/jquery.flot.pie.js') !!}"></script>
    <script src="{!! asset('/dist/plugins/Flot/jquery.flot.time.js') !!}"></script>
    <script src="{!! asset('/dist/plugins/Flot/jquery.flot.stack.js') !!}"></script>
    <script src="{!! asset('/dist/plugins/Flot/jquery.flot.resize.js') !!}"></script>

    <!-- Flot plugins -->
    <script src="{!! asset('/dist/js/flot/jquery.flot.orderBars.js') !!}"></script>
    <script src="{!! asset('/dist/js/flot/date.js') !!}"></script>
    <script src="{!! asset('/dist/js/flot/jquery.flot.spline.js') !!}"></script>
    <script src="{!! asset('/dist/js/flot/curvedLines.js') !!}"></script>
    <!-- jVectorMap -->
    <script src="{!! asset('/dist/js/maps/jquery-jvectormap-2.0.3.min.js') !!}"></script>
    <!-- bootstrap-daterangepicker -->
    <script src="{!! asset('/dist/js/moment/moment.min.js') !!}"></script>
    <script src="{!! asset('/dist/js/datepicker/daterangepicker.js') !!}"></script>

    <!-- Custom Theme Scripts -->
    <script src="{!! asset('/dist/js/custom.js') !!}"></script>

    <!-- jVectorMap -->
    <script src="{!! asset('/dist/js/maps/jquery-jvectormap-world-mill-en.js') !!}"></script>
    <script src="{!! asset('/dist/js/maps/jquery-jvectormap-us-aea-en.js') !!}"></script>
    <script src="{!! asset('/dist/js/maps/gdp-data.js') !!}"></script>

    <!-- React -->
    <script src="{!! asset('/dist/js/application.js') !!}"></script>

</html>
