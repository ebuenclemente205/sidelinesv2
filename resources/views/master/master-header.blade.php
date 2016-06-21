<div class="navbar navbar-default navbar-fixed-top nav_color">
 <div class="container">
   <div class="navbar-header">
    <a href="/"><img src="/dist/img/slogo.png" class="pull-left img-responsive logo-size"></a>
     <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
       <span class="icon-bar"></span>
       <span class="icon-bar"></span>
       <span class="icon-bar"></span>
     </button>
   </div>
   <div class="navbar-collapse collapse">
     <ul class="nav navbar-nav">
         <li class="dropdown">
           <a href="#" class="dropdown-toggle" data-toggle="dropdown">JOBS <b class="caret"></b></a>
           <ul class="dropdown-menu drop-jobs">
             <li><a href="#">Jobs Posted</a></li>
             <li><a href="#">Job Post</a></li>
           </ul>
         </li>
         <li class="dropdown">
           <a href="#" class="dropdown-toggle" data-toggle="dropdown">STUDENTS <b class="caret"></b></a>
           <ul class="dropdown-menu drop-jobs">
             <li><a href="#">Recommended Students</a></li>
             <li><a href="#">Hired Students</a></li>
             <li><a href="#">All Students</a></li>
           </ul>
         </li>
         <li><a href="#contact">COMPANIES</a></li>
         <li><a href="#">SCHOOLS</a></li>
     </ul>


     <ul class="nav navbar-nav navbar-right">
        @if(Auth::check())
         <li role="presentation" class="dropdown">
           <a href="javascript:;" class="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
             <i class="fa fa-bell-o"></i>
             <span class="badge bg-green">6</span>
           </a>
           <ul id="menu1" class="dropdown-menu list-unstyled msg_list" role="menu">
             <li>
               <a class="msg-font">
                 <span class="image">
                                   <img src="dist/img/img.jpg" alt="Profile Image" />
                               </span>
                 <span>
                                   <span>John Smith</span>
                 <span class="time">3 mins ago</span>
                 </span>
                 <span class="message">
                                   Film festivals used to be do-or-die moments for movie makers. They were where...
                               </span>
               </a>
             </li>
             <li>
               <a class="msg-font">
                 <span class="image">
                                   <img src="dist/img/img.jpg" alt="Profile Image" />
                               </span>
                 <span>
                                   <span>John Smith</span>
                 <span class="time">3 mins ago</span>
                 </span>
                 <span class="message">
                                   Film festivals used to be do-or-die moments for movie makers. They were where...
                               </span>
               </a>
             </li>
             <li>
              <a class="msg-font">
                 <span class="image">
                                   <img src="dist/img/img.jpg" alt="Profile Image" />
                               </span>
                 <span>
                                   <span>John Smith</span>
                 <span class="time">3 mins ago</span>
                 </span>
                 <span class="message">
                                   Film festivals used to be do-or-die moments for movie makers. They were where...
                               </span>
               </a>
             </li>
             <li>
               <a class="msg-font">
                 <span class="image">
                                   <img src="dist/img/img.jpg" alt="Profile Image" />
                               </span>
                 <span>
                                   <span>John Smith</span>
                 <span class="time">3 mins ago</span>
                 </span>
                 <span class="message">
                                   Film festivals used to be do-or-die moments for movie makers. They were where...
                               </span>
               </a>
             </li>
             <li>
               <div class="text-center">
                 <a>
                   <strong>See All Alerts</strong>
                   <i class="fa fa-angle-right"></i>
                 </a>
               </div>
             </li>
           </ul>
         </li>
           <li class="">
             <a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false" id="user-header">
               <span class=" fa fa-angle-down"></span>
             </a>
             <ul class="dropdown-menu dropdown-usermenu pull-right">
               <li><a href="javascript:;">  Profile</a>
               </li>
               <li>
                 <a href="javascript:;">
                   <span class="badge bg-red pull-right">50%</span>
                   <span>Settings</span>
                 </a>
               </li>
               <li>
                 <a href="javascript:;">Help</a>
               </li>
               <li><a href="/logout"><i class="fa fa-sign-out pull-right"></i> Log Out</a>
               </li>
             </ul>
           </li>
        @else
            <li>
                <a href="/signup">
                    Signup
                </a>
            </li>
            <li>
                <a href="/login">
                    Login
                </a>
            </li>
        @endif
        </ul>
     </div><!--/.nav-collapse -->
   </div>
</div>
