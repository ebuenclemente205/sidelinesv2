<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, maximum-scale=1">
<title>@yield('title')</title>

<link rel="shortcut icon" href="/dist/img/icon.ico">
<link rel="icon" href="favicon.png" type="image/png">
<link rel="stylesheet" type="text/css" href="{!! asset('dist/css/bootstrap.min.css') !!}">
<link rel="stylesheet" type="text/css" href="{!! asset('dist/css/AdminLTE.min.css') !!}">
<link href="{!! asset('dist/plugins/Butterfly/css/bootstrap.css') !!}" rel="stylesheet" type="text/css">
<link href="{!! asset('dist/plugins/Butterfly/css/style.css') !!}" rel="stylesheet" type="text/css">
<link href="{!! asset('dist/plugins/Butterfly/css/linecons.css') !!}" rel="stylesheet" type="text/css">
<link href="{!! asset('dist/plugins/Butterfly/css/font-awesome.css') !!}" rel="stylesheet" type="text/css">
<link href="{!! asset('dist/plugins/Butterfly/css/responsive.css') !!}" rel="stylesheet" type="text/css">
<link href="{!! asset('dist/plugins/Butterfly/css/animate.css') !!}" rel="stylesheet" type="text/css">
<link href="{!! asset('dist/css/carousel.css') !!}" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="{!! asset('dist/css/style.css') !!}">

<link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
<link href='http://fonts.googleapis.com/css?family=Lato:400,900,700,700italic,400italic,300italic,300,100italic,100,900italic' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Dosis:400,500,700,800,600,300,200' rel='stylesheet' type='text/css'>


<!--[if IE]><style type="text/css">.pie {behavior:url(PIE.htc);}</style><![endif]-->

<script type="text/javascript" src="{!! asset('dist/plugins/Butterfly/js/jquery.1.8.3.min.js') !!}"></script>
<script type="text/javascript" src="{!! asset('dist/plugins/Butterfly/js/bootstrap.js') !!}"></script>
<script type="text/javascript" src="{!! asset('dist/plugins/Butterfly/js/jquery-scrolltofixed.js') !!}"></script>
<script type="text/javascript" src="{!! asset('dist/plugins/Butterfly/js/jquery.easing.1.3.js') !!}"></script>
<script type="text/javascript" src="{!! asset('dist/plugins/Butterfly/js/jquery.isotope.js') !!}"></script>
<script type="text/javascript" src="{!! asset('dist/plugins/Butterfly/js/wow.js') !!}"></script>
<script type="text/javascript" src="{!! asset('dist/plugins/Butterfly/js/classie.js') !!}"></script>
<script data-require="jquery-cookie@1.3.1" data-semver="1.3.1" src="//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.3.1/jquery.cookie.js"></script>
    <script>

      $(document).ready(function () {
    // Read the cookie and if it's defined scroll to id
    var scroll = $.cookie('scroll');
    if(scroll){
        scrollToID(scroll, 1000);
        $.removeCookie('scroll');
    }

    // Handle event onclick, setting the cookie when the href != #
    $('.nav2 a').click(function (e) {
        e.preventDefault();
        var id = $(this).data('id');
        var href = $(this).attr('href');
        if(href === '#'){
            scrollToID(id, 1000);
        }else{
            $.cookie('scroll', id);
            window.location.href = href;
        }
    });

    // scrollToID function
    function scrollToID(id, speed) {
        var offSet = 70;
        var obj = $('#' + id).offset();
        var targetOffset = obj.top - offSet;
        $('html,body').animate({ scrollTop: targetOffset }, speed);
    }
});

    </script>

<!--[if lt IE 9]>
    <script src="js/respond-1.1.0.min.js"></script>
    <script src="js/html5shiv.js"></script>
    <script src="js/html5element.js"></script>
<![endif]-->

<script type="text/javascript">
	$(document).ready(function(e) {
        $('.res-nav_click').click(function(){
      		$('ul.toggle').slideToggle(600)
      	});

  	$(document).ready(function() {
      $(window).bind('scroll', function() {
               if ($(window).scrollTop() > 0) {
                   $('#header_outer').addClass('fixed');
               }
               else {
                   $('#header_outer').removeClass('fixed');
               }
      });
  	});
	});
  function resizeText() {
  	var preferredWidth = 767;
  	var displayWidth = window.innerWidth;
  	var percentage = displayWidth / preferredWidth;
  	var fontsizetitle = 25;
  	var newFontSizeTitle = Math.floor(fontsizetitle * percentage);
  	$(".divclass").css("font-size", newFontSizeTitle)
}
</script>
</head>
<body class="unable-scroll" >

  <!--Header_section-->
  <header id="header_outer" class="top-border" style="width:100%;">
    <div class="container">
      <div class="header_section">
        <div class="logo">
          <a href="{{URL::to('/') }}" data-id="top_content">
            <img src="{!! asset('dist/img/sidelogo.png') !!}" style="width:185px;margin-right: 40px" alt="" class="img-responsive">
          </a>
        </div>
  	  <nav class="nav2 nav-margin" id="nav">
  		  <ul class="toggle">
  			<li><a href='/' data-id="features">Features</a></li>
  			<li><a href="{{URL::route('jobs.index') }}">Jobs</a></li>
  			<li><a href="#">Companies</a></li>
  			<li><a href='/' data-id="team">Team</a></li>
  			<li><a href='/' data-id="contact">Contact us</a></li>
  		  </ul>
  		  <ul class="">
  			  <li><a href='/' data-id="features">Features</a></li>
    			<li><a href="{{URL::route('jobs.index') }}">Jobs</a></li>
    			<li><a href="#">Companies</a></li>
    			<li><a href='/' data-id="team">Team</a></li>
    			<li><a href='/' data-id="contact">Contact us</a></li>
  		  </ul>
  	  </nav>
	  <nav class="nav nav-margin" id="nav">
		@if(Auth::check() == true)
		  <ul>
			@if(Auth::user()->user_type == 'c' || Auth::user()->user_type == 'sa')
			  <li><a href="{{ URL::to('/' . Auth::user()->id) }}">{{ Auth::user()->userable->name  }}</a></li>
			@elseif(Auth::user()->user_type == 'admin')
			  <li><a href="{{ URL::to('/' . Auth::user()->id) }}">Super Admin </a></li>
			@else
			  <li>
				<a href="{{ URL::to('/' . Auth::user()->id) }}">
				  {{ Auth::user()->userable->fname . " " . Auth::user()->userable->lname  }}
				</a>
			  </li>
			@endif
			  <li><a href="{{ url('/logout') }}">Logout</a></li>
		  </ul>
		@else
	  <ul class="" id="drop-nav">
		<li class="sub-menu-parent"><a href="#" class="not-clickable">Sign up</a>
		  <ul class="sub-menu">
			<div class="drop-down-box">
				<li>
					{!! Form::open(array('url' => 'signup/student', 'class' => 'form')) !!}

					  {!!  Form::hidden('user_type', 's') !!}
					  <input class="btn-a" type="submit" value="as Student" style="right:0px;">

				  {!! Form::close() !!}
				</li>
				<li>
					{!! Form::open(array('url' => 'signup/company', 'class' => 'form')) !!}

					  {!!  Form::hidden('user_type', 'c') !!}
					  <input class="btn-a" type="submit" value="as Company" style="right:0px;">

				  {!! Form::close() !!}
				</li>
				<li>
					{!! Form::open(array('url' => 'signup/faculty', 'class' => 'form')) !!}

					  {!!  Form::hidden('user_type', 'df') !!}
					  <input class="btn-a" type="submit" value="as Dean/Faculty" style="right:0px;">

				  {!! Form::close() !!}
				</li>
				<li>
					{!! Form::open(array('url' => 'signup/schooladmin', 'class' => 'form')) !!}

					  {!!  Form::hidden('user_type', 'sa') !!}
					  <input class="btn-a" type="submit" value="as School Admin" style="right:0px;">

				  {!! Form::close() !!}
				</li>
			</div>
		  </ul>
		</li>
		<li ><a href="{{ URL::to('/login') }}">Log in</a></li>
	  </ul>
		@endif
	  </nav>
        <a class="res-nav_click animated wobble wow"  href="javascript:void(0)"><i class="fa-bars"></i></a> </div>
    </div>
  </header>
  <!--Header_section-->

  @yield('content')

  @include('login-footer')


<script type="text/javascript">
    $(document).ready(function(e) {
        $('#header_outer').scrollToFixed();
        $('.res-nav_click').click(function(){
            $('.main-nav').slideToggle();
            return false

        });

    });
</script>
<script>
    wow = new WOW(
      {
        animateClass: 'animated',
        offset:       100
      }
    );
    wow.init();
    document.getElementById('').onclick = function() {
      var section = document.createElement('section');
      section.className = 'wow fadeInDown';
	  section.className = 'wow shake';
	  section.className = 'wow zoomIn';
	  section.className = 'wow lightSpeedIn';
      this.parentNode.insertBefore(section, this);
    };
  </script>
<script type="text/javascript">
	$(window).load(function(){

		$('a').bind('click',function(event){
			var $anchor = $(this);

			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top - 91
			}, 1500,'easeInOutExpo');
			/*
			if you don't want to use the easing effects:
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1000);
			*/
			event.preventDefault();
		});
	})
</script>

<!--<script type="text/javascript">

$(window).load(function(){


  var $container = $('.portfolioContainer'),
      $body = $('body'),
      colW = 350,
      columns = null;


  $container.isotope({
    // disable window resizing
    resizable: true,
    masonry: {
      columnWidth: colW
    }
  });

  $(window).smartresize(function(){
    // check if columns has changed
    var currentColumns = Math.floor( ( $body.width() -30 ) / colW );
    if ( currentColumns !== columns ) {
      // set new column count
      columns = currentColumns;
      // apply width to container manually, then trigger relayout
      $container.width( columns * colW )
        .isotope('reLayout');
    }

  }).smartresize(); // trigger resize to set container width
  $('.portfolioFilter a').click(function(){
        $('.portfolioFilter .current').removeClass('current');
        $(this).addClass('current');

        var selector = $(this).attr('data-filter');
        $container.isotope({

            filter: selector,
         });
         return false;
    });

});

</script>


-->

<script type="text/javascript">


  jQuery(document).ready(function($){
// Portfolio Isotope
	var container = $('#portfolio-wrap');


	container.isotope({
		animationEngine : 'best-available',
	  	animationOptions: {
	     	duration: 200,
	     	queue: false
	   	},
		layoutMode: 'fitRows'
	});

	$('#filters a').click(function(){
		$('#filters a').removeClass('active');
		$(this).addClass('active');
		var selector = $(this).attr('data-filter');
	  	container.isotope({ filter: selector });
        setProjects();
	  	return false;
	});


		function splitColumns() {
			var winWidth = $(window).width(),
				columnNumb = 1;


			if (winWidth > 1024) {
				columnNumb = 4;
			} else if (winWidth > 900) {
				columnNumb = 2;
			} else if (winWidth > 479) {
				columnNumb = 2;
			} else if (winWidth < 479) {
				columnNumb = 1;
			}

			return columnNumb;
		}

		function setColumns() {
			var winWidth = $(window).width(),
				columnNumb = splitColumns(),
				postWidth = Math.floor(winWidth / columnNumb);

			container.find('.portfolio-item').each(function () {
				$(this).css( {
					width : postWidth + 'px'
				});
			});
		}

		function setProjects() {
			setColumns();
			container.isotope('reLayout');
		}

		container.imagesLoaded(function () {
			setColumns();
		});


		$(window).bind('resize', function () {
			setProjects();
		});

});
$( window ).load(function() {
	jQuery('#all').click();
	return false;
});
</script>
</body>
</html>
