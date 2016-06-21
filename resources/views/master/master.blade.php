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
    <link href="{!! asset('/dist/plugins/bootstrap/dist/css/bootstrap.min.css') !!}" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="{!! asset('/dist/plugins/font-awesome/css/font-awesome.min.css') !!}" rel="stylesheet">
    <!-- iCheck -->
    <link href="{!! asset('/dist/plugins/iCheck/skins/flat/green.css') !!}" rel="stylesheet">
    <!-- starrr -->
    <link href="{!! asset('/dist/plugins/starrr/dist/starrr.css') !!}" rel="stylesheet">
    <!-- bootstrap-progressbar -->
    <link href="{!! asset('/dist/plugins/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css') !!}" rel="stylesheet">
    <!-- jVectorMap -->
    <link href="{!! asset('/dist/css/maps/jquery-jvectormap-2.0.3.css" rel="stylesheet') !!}"/>

    <!-- Custom Theme Style -->
    <link href="{!! asset('/dist/css/custom.css') !!}" rel="stylesheet">
  </head>

   <body class="nav-md">
       <div class="container body">
           <div class="main_container">
                @include('master.master-header')
                @yield('content')
                @include('master.master-footer')
            </div>
        </div>
    </body>
    <!-- jQuery -->
    <script src="{!! asset('dist/plugins/jQuery/jQuery-2.1.4.min.js') !!}"></script>
    <script src="{!! asset('dist/plugins/jQueryUI/jquery-ui-1.10.3.min.js') !!}" type="text/javascript"></script>
    <!-- Bootstrap -->
    <script src="{!! asset('/dist/plugins/bootstrap/dist/js/bootstrap.min.js') !!}"></script>
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
    <!-- starrr -->
    <script src="{!! asset('/dist/plugins/starrr/dist/starrr.js') !!}"></script>
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

    <!-- React JS -->
    <script src="{!! asset('dist/js/react.js') !!}"></script>
    <script src="{!! asset('dist/js/react-dom.js') !!}"></script>
    <script src="{!! asset('dist/js/browser.min.js') !!}"></script>
    @yield('script')

    <!-- bootstrap-daterangepicker -->
    <script>
      $(document).ready(function() {

        var cb = function(start, end, label) {
          console.log(start.toISOString(), end.toISOString(), label);
          $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        };

        var optionSet1 = {
          startDate: moment().subtract(29, 'days'),
          endDate: moment(),
          minDate: '01/01/2012',
          maxDate: '12/31/2015',
          dateLimit: {
            days: 60
          },
          showDropdowns: true,
          showWeekNumbers: true,
          timePicker: false,
          timePickerIncrement: 1,
          timePicker12Hour: true,
          ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
          },
          opens: 'left',
          buttonClasses: ['btn btn-default'],
          applyClass: 'btn-small btn-primary',
          cancelClass: 'btn-small',
          format: 'MM/DD/YYYY',
          separator: ' to ',
          locale: {
            applyLabel: 'Submit',
            cancelLabel: 'Clear',
            fromLabel: 'From',
            toLabel: 'To',
            customRangeLabel: 'Custom',
            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            firstDay: 1
          }
        };
        $('#reportrange span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
        $('#reportrange').daterangepicker(optionSet1, cb);
        $('#reportrange').on('show.daterangepicker', function() {
          console.log("show event fired");
        });
        $('#reportrange').on('hide.daterangepicker', function() {
          console.log("hide event fired");
        });
        $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
          console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
        });
        $('#reportrange').on('cancel.daterangepicker', function(ev, picker) {
          console.log("cancel event fired");
        });
        $('#options1').click(function() {
          $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
        });
        $('#options2').click(function() {
          $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
        });
        $('#destroy').click(function() {
          $('#reportrange').data('daterangepicker').remove();
        });
      });
      $(document).ready(function() {
        $(".stars").starrr();
        $(".stars2").starrr();

        $('.stars-existing').starrr({
          rating: 4
        });

        $('.starrr').on('click', function (e) {
          e.preventDefault();
        });

        $('.stars').on('starrr:change', function (e, value) {
          $('.stars-count').html(value);
          var character = $('#character_rating').text();
        });

        $('.stars2').on('starrr:change', function (e, value) {
          $('.stars-count-2').html(value);
          var skill = $('#skill_rating').text();
        });

        $('.stars-existing').on('starrr:change', function (e, value) {
          $('.stars-count-existing').html(value);
        });



        $('#submit_rating').on('click', function (e) {
          e.preventDefault();
          var id = window.location.href.split('/')[4];
          var code = window.location.href.split('/')[5];

          var formData = new FormData();
          var character_rating = parseInt($('#character_rating').text());
          var skill_rating = parseInt($('#skill_rating').text());
          formData.append('character_rating', character_rating);
          formData.append('skill_rating', skill_rating);

              $.ajax({
                type: "POST",
                url: "/api/v1/recommendation/"+id+"/"+code,
                data: formData,
                processData: false,
                contentType: false,
                success: function(response){
                    window.location = "/signup"; 
                }.bind(this)
              });
        });
      });
    </script>
    <!-- /bootstrap-daterangepicker -->
</html>
