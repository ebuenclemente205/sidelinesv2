var React = require('react');

module.exports = React.createClass({
    getInitialState: function(){
        return{
          image: "avatar-default.png"           
        }
    },
    componentWillMount: function(){
      setInterval(function () {
          this.setState({
            image: this.props.user.image
          });
      }.bind(this), 500);
    },
    render: function() {
        if(this.state.image == "avatar-default.png"){
          var image_src = "/img/profilepics/"+this.state.image;
        }
        else{
          var image_src = "/img/profilepics/"+this.props.user.image;
        }        

        return (
          <header>
           <div id="whole-div"></div>
            <div className="navbar navbar-default navbar-fixed-top nav_color">
             <div className="container">
               <div className="navbar-header">
                <a href="/">
                    <img src="/dist/img/slogo.png" className="pull-left img-responsive logo-size"/>
                </a>
                 <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                   <span className="icon-bar"></span>
                   <span className="icon-bar"></span>
                   <span className="icon-bar"></span>
                 </button>
               </div>
               <div className="navbar-collapse collapse">
                 <ul className="nav navbar-nav">
                     <li className="dropdown">
                       <a href="#" className="dropdown-toggle" data-toggle="dropdown"> JOBS <b className="caret"></b></a>
                       <ul className="dropdown-menu drop-jobs">
                         <li><a href="#">Jobs Posted</a></li>
                         <li><a href="#">Job Post</a></li>
                       </ul>
                     </li>
                     <li className="dropdown">
                       <a href="#" className="dropdown-toggle" data-toggle="dropdown">STUDENTS <b className="caret"></b></a>
                       <ul className="dropdown-menu drop-jobs">
                         <li><a href="#">Recommended Students</a></li>
                         <li><a href="#">Hired Students</a></li>
                         <li><a href="#">All Students</a></li>
                       </ul>
                     </li>
                     <li><a href="#contact">COMPANIES</a></li>
                     <li><a href="#">SCHOOLS</a></li>
                 </ul>

                 <ul className="nav navbar-nav navbar-right">
                     <li role="presentation" className="dropdown">
                       <a href="javascript:;" className="dropdown-toggle info-number" data-toggle="dropdown" aria-expanded="false">
                         <i className="fa fa-bell-o"></i>
                         <span className="badge bg-green">6</span>
                       </a>
                       <ul id="menu1" className="dropdown-menu list-unstyled msg_list" role="menu">
                         <li>
                           <a className="msg-font">
                             <span className="image">
                                <img src="dist/img/img.jpg" alt="Profile Image" />
                             </span>
                             <span>
                             <span>John Smith</span>
                             <span className="time">3 mins ago</span>
                             </span>
                             <span className="message">
                                Film festivals used to be do-or-die moments for movie makers. They were where...
                             </span>
                           </a>
                         </li>
                         <li>
                           <a className="msg-font">
                             <span className="image">
                                <img src="dist/img/img.jpg" alt="Profile Image" />
                             </span>
                             <span>
                             <span>John Smith</span>
                             <span className="time">3 mins ago</span>
                             </span>
                             <span className="message">
                                Film festivals used to be do-or-die moments for movie makers. They were where...
                             </span>
                           </a>
                         </li>
                         <li>
                          <a className="msg-font">
                             <span className="image">
                                <img src="dist/img/img.jpg" alt="Profile Image" />
                             </span>
                             <span>
                             <span>John Smith</span>
                             <span className="time">3 mins ago</span>
                             </span>
                             <span className="message">
                                Film festivals used to be do-or-die moments for movie makers. They were where...
                             </span>
                           </a>
                         </li>
                         <li>
                           <a className="msg-font">
                             <span className="image">
                                <img src="dist/img/img.jpg" alt="Profile Image" />
                             </span>
                             <span>
                             <span>John Smith</span>
                             <span className="time">3 mins ago</span>
                             </span>
                             <span className="message">
                               Film festivals used to be do-or-die moments for movie makers. They were where...
                             </span>
                           </a>
                         </li>
                         <li>
                           <div className="text-center">
                             <a>
                               <strong>See All Alerts</strong>
                               <i className="fa fa-angle-right"></i>
                             </a>
                           </div>
                         </li>
                       </ul>
                     </li>
                       <li className="">
                         <a href="javascript:;" className="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                           <img src={image_src}/>
                           <span>{this.props.user.fname} </span>
                         </a>
                         <ul className="dropdown-menu dropdown-usermenu pull-right">
                           <li><a href="javascript:;">  Profile</a>
                           </li>
                           <li>
                             <a href="javascript:;">
                               <span className="badge bg-red pull-right">50%</span>
                               <span>Settings</span>
                             </a>
                           </li>
                           <li>
                             <a href="javascript:;">Help</a>
                           </li>
                           <li><a href="/logout"><i className="fa fa-sign-out pull-right"></i> Log Out</a>
                           </li>
                         </ul>
                       </li>
                    </ul>
                 </div>
               </div>
            </div>
        </header>
        );
    }
});
