var React = require('react');
var ReactDOM = require('react-dom');

var Header = require("./master-files/header");
var Footer = require("./master-files/footer");
var PersonalInfo = require("./personal-info");
var Skills = require("./skills");
var Tips = require("./tips");
var Works = require("./works");
var Experience = require("./experience");
var Education = require("./education");
var Achievement = require("./achievement");
var Seminar = require('./seminar');
var Organization = require('./organization');
var Overview = require("./overview");
var StudentRecommendation = require("./recommendation");
var id = window.userid;
var registration = window.registration;

var App = React.createClass({
	getInitialState: function() {
	    return {
            user: {},
		    progress: ""
	    };
	},
	loadedData: {
		user: null
	},
	componentWillMount: function() {
		this.fetchUser();
		setTimeout(function () {
            this.setState({
                progress: "40%"
        });
	        if(registration == 3){
	           $('#whole-div').addClass('tourist-backdrop');
	           STEP_OPTIONS = {
	            one: 1,
	            two: 2
	          };

	          STEPS = [{
	            content: '<p>Tell us why you are the right person to be hired.</p>',
	            nextButton: true,
	            target: $('#step1'),
	            my: 'top center',
	            at: 'bottom center',
	            setup: function(tour, options) {
	              $('html, body').animate({ scrollTop: $('#step1-scroll').offset().top }, 'slow');
	              return { target: $('#step1') };
	            }
	          },{
	            content: '<p>Here you can find the parts of your profile that are missing.</p>',
	            nextButton: true,
	            target: $('#step2'),
	            my: 'top center',
	            at: 'bottom center',
	            setup: function(tour, options) {
	              $('html, body').animate({ scrollTop: $('#step2-scroll').offset().top }, 'slow');
	              return { target: $('#step2') };
	            }
	          },{
	            content: '<p>Do you know the email of your teacher? Ask for a recommendation.</p>',
	            okButton: true,
	            target: $('#step3'),
	            my: 'top center',
	            at: 'bottom center',
	            setup: function(tour, options) {
	              $('html, body').animate({ scrollTop: $('#step3-scroll').offset().top }, 'slow');
	              $('.tour-close').addClass('pull-right');
	              return { target: $('#step3') };
	            },
	            teardown: function(tour, options) {
	              $('html, body').animate({ scrollTop: $('html').offset().top }, 'slow');
	              $('#whole-div').fadeOut('slow');
	              return;
	            }
	          }]

	          FINAL = {}

	          TOUR = new Tourist.Tour({
	            stepOptions: STEP_OPTIONS,
	            steps: STEPS,
	            successStep: FINAL,
	            tipOptions:{
	              showEffect: 'slidein'
	            }
	          });
	          TOUR.start();
	        }
   		}.bind(this), 500);
	},
	setChanges: function() {
		this.setState({
			user: {},
		});
		this.fetchUser();
		console.log("Failed server and requery or reset");
	},
	fetchUser: function() {
			$.ajax({
			type: "GET",
			url: "/api/v1/students/"+id,
			error: function(){
				this.setChanges();
				return;
			}.bind(this),
			success: function(response){
				if(response.user.image == null){
					this.setState({
						user: {
							fname: response.fname,
							lname: response.lname,
							image: "avatar-default.png",
							school: response.school.name,
							degree: response.degree.name,
							email: response.user.email,
							contact_no: response.contact_no
						}
					})
				}
				else{
					this.setState({
						user: {
							fname: response.fname,
							lname: response.lname,
							image: response.user.image,
							school: response.school.name,
							degree: response.degree.name,
							email: response.user.email,
							contact_no: response.contact_no
						}
					})
				}
			}.bind(this)
		});

		if(this.loadedData.user != null){
			this.loadedData.user = this.state.user;
		}
		this.checkLoadedData();
	},
	checkLoadedData: function() {
		if(this.loadedData.user) {
			this.setState({
				user: this.loadedData.user
			});
			this.loadedData = null;
		}
	},
	render: function() {
		return (
		<div id="last-scroll">
			<Header user={this.state.user}/>
				<div className="right_col" role="main" id="step1-scroll">
					<content>
		                <div className="page-title"></div>
		                    <div className="clearfix"></div>

		                        <div className="row">
		                            <div className="col-md-9 col-sm-12 col-xs-12">
		                                <div className="x_panel">
		                                  <div className="x_title">
		                                    <h2>User Profile</h2>
		                                    <ul className="nav navbar-right panel_toolbox">
		                                      <li>
		                                        <a href="#" role="button" data-tooltip="Print Resume"><i className="fa fa-print"></i></a>
		                                      </li>
		                                    </ul>
		                                    <div className="clearfix"></div>
		                                  </div>
		                                  <div className="x_content">
		                                    <PersonalInfo setChanges={this.setChanges}/>
		                                    <div className="col-md-9 col-sm-9 col-xs-12">
		                                      <Overview />
		                                      <Skills />
		                                    </div>
		                                  </div>
		                                </div>
										<Tips />
										<Works />
										<Experience />
										<Education />
										<Achievement />
										<Seminar />
										<Organization />
		                            </div>
		                            <div id="step3-scroll" className="col-md-3 col-sm-12 col-xs-12">
		                                <StudentRecommendation />		                                
		                    </div>
		                </div>
		            </content>
	            </div>
			<Footer />
		</div>
		);
	}
});

var element = React.createElement(App);
ReactDOM.render(element, document.getElementById("personal-info"));

// <div className="x_panel">
//     <div className="x_title">
//       <h2>Recent Activities <small>Sessions</small></h2>
//       <ul className="nav navbar-right panel_toolbox">
//         <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
//         </li>
//         <li className="dropdown">
//           <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
//           <ul className="dropdown-menu" role="menu">
//             <li><a href="#">Settings 1</a>
//             </li>
//             <li><a href="#">Settings 2</a>
//             </li>
//           </ul>
//         </li>
//         <li><a className="close-link"><i className="fa fa-close"></i></a>
//         </li>
//       </ul>
//       <div className="clearfix"></div>
//     </div>
//     <div className="x_content">
//       <div className="dashboard-widget-content">

//         <ul className="list-unstyled timeline widget">
//           <li>
//             <div className="block">
//               <div className="block_content">
//                 <h2 className="title">
//                                   <a>Who Needs Sundance When You’ve Got&nbsp;Crowdfunding?</a>
//                               </h2>
//                 <div className="byline">
//                   <span>13 hours ago</span> by <a>Jane Smith</a>
//                 </div>
//                 <p className="excerpt">Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and… <a>Read&nbsp;More</a>
//                 </p>
//               </div>
//             </div>
//           </li>
//           <li>
//             <div className="block">
//               <div className="block_content">
//                 <h2 className="title">
//                                   <a>Who Needs Sundance When You’ve Got&nbsp;Crowdfunding?</a>
//                               </h2>
//                 <div className="byline">
//                   <span>13 hours ago</span> by <a>Jane Smith</a>
//                 </div>
//                 <p className="excerpt">Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and… <a>Read&nbsp;More</a>
//                 </p>
//               </div>
//             </div>
//           </li>
//           <li>
//             <div className="block">
//               <div className="block_content">
//                 <h2 className="title">
//                                   <a>Who Needs Sundance When You’ve Got&nbsp;Crowdfunding?</a>
//                               </h2>
//                 <div className="byline">
//                   <span>13 hours ago</span> by <a>Jane Smith</a>
//                 </div>
//                 <p className="excerpt">Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and… <a>Read&nbsp;More</a>
//                 </p>
//               </div>
//             </div>
//           </li>
//           <li>
//             <div className="block">
//               <div className="block_content">
//                 <h2 className="title">
//                                   <a>Who Needs Sundance When You’ve Got&nbsp;Crowdfunding?</a>
//                               </h2>
//                 <div className="byline">
//                   <span>13 hours ago</span> by <a>Jane Smith</a>
//                 </div>
//                 <p className="excerpt">Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and… <a>Read&nbsp;More</a>
//                 </p>
//                 </div>
//           </div>
//       </li>
//    </ul>
// </div>
// </div>
// </div>