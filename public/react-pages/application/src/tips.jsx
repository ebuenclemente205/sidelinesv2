var React = require('react');

module.exports = React.createClass({
    getInitialState: function(){
        return{
            showEdit: false,
            view: "View More"
        }
    },
    componentDidMount: function(){
    	    $( "#experience" ).hide();
	    	$( "#education" ).hide();
	    	$( "#achievements" ).hide();
	    	$( "#seminars" ).hide();
	    	$( "#organizations" ).hide();
	    	$( "#arrow").addClass('fa fa-chevron-down arrow-tip-right');
    },
    showEdit: function(){
        this.setState({
            showEdit: true
        });
    },
    hideTips: function(){
    	if(this.state.view == "View Less"){
    		$( "#experience" ).slideUp();
	    	$( "#education" ).slideUp();
	    	$( "#achievements" ).slideUp();
	    	$( "#seminars" ).slideUp();
	    	$( "#organizations" ).slideUp();
	    	$( "#arrow").removeClass('fa fa-chevron-up arrow-tip-right');
	    	$( "#arrow").addClass('fa fa-chevron-down arrow-tip-right');	    	
	    	this.setState({
	    		view: "View More"
	    	});
    	}
    	else{
    		$( "#experience" ).slideDown();
	    	$( "#education" ).slideDown();
	    	$( "#achievements" ).slideDown();
	    	$( "#seminars" ).slideDown();
	    	$( "#organizations" ).slideDown();
	    	$( "#arrow").removeClass('fa fa-chevron-down arrow-tip-right');
	    	$( "#arrow").addClass('fa fa-chevron-up arrow-tip-right');
	    	this.setState({
	    		view: "View Less"
	    	});
    	}
    },
    scrollToSection: function(scrollid){
    	$('html, body').animate({ scrollTop: $('#'+scrollid).offset().top -85}, 'medium');
	    $("#"+scrollid).addClass('border-highlight');	
    	setTimeout(function(){
			$("#"+scrollid).removeClass('border-highlight');
    	},2500);
    },
    render: function() {
        return (
        	<div id="step2-scroll" className="row">
				<div className="tips-wrapper col-lg-4 col-md-4 col-sm-6 col-xs-12">
		            <div className="x_panel_tips">
		                <a onClick={this.scrollToSection.bind(this, 'overview-tip')} className="div-tips">
		                   <div className="tips_padding">
		                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
		                            <img src="/dist/img/tip-search.png" className="tip-search" />
		                        </div>
		                        <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8 body-tips-href">
		                           <h2 className="profile-h2"> Overview</h2>
		                           <p>
		                               Lorem ipsum dolor sit amet,
		                               consectetur adipiscing el.
		                               Nam nec magna arcu Nullam
		                               sakaman.
		                           </p>
		                        </div>
		                   </div>
		                    <div className="col-xs-12 tips-bottom text-center footer-tips-href">
		                        Add Overview
		                    </div>
		                </a>
		            </div>
				</div>
				<div className="tips-wrapper col-lg-4 col-md-4 col-sm-6 col-xs-12">
		            <div className="x_panel_tips">
		                <a onClick={this.scrollToSection.bind(this, 'skills-tip')} className="div-tips">
		                   <div className="tips_padding">
		                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
		                            <img src="/dist/img/tip-science.png" className="tip-search" />
		                        </div>
		                        <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8 body-tips-href">
		                           <h2 className="profile-h2"> Skills</h2>
		                           <p>
		                               Lorem ipsum dolor sit amet,
		                               consectetur adipiscing el.
		                               Nam nec magna arcu Nullam
		                               sakaman.
		                           </p>
		                        </div>
		                   </div>
		                    <div className="col-xs-12 tips-bottom text-center footer-tips-href">
		                        Add Skills
		                    </div>
		                </a>
		            </div>
				</div>
				<div className="tips-wrapper col-lg-4 col-md-4 col-sm-6 col-xs-12">
		            <div className="x_panel_tips">
		                <a onClick={this.scrollToSection.bind(this, 'works-tip')} className="div-tips">
		                   <div className="tips_padding">
		                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
		                            <img src="/dist/img/tip-document.png" className="tip-search" />
		                        </div>
		                        <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8 body-tips-href">
		                           <h2 className="profile-h2"> Sample Works </h2>
		                           <p>
		                               Lorem ipsum dolor sit amet,
		                               consectetur adipiscing el.
		                               Nam nec magna arcu Nullam
		                               sakaman.
		                           </p>
		                        </div>
		                   </div>
		                    <div className="col-xs-12 tips-bottom text-center footer-tips-href">
		                        Add Works
		                    </div>
		                </a>
		            </div>
				</div>
				<div className="tips-wrapper col-lg-4 col-md-4 col-sm-6 col-xs-12" id="experience">
		            <div className="x_panel_tips">
		                <a onClick={this.scrollToSection.bind(this, 'experience-tip')} className="div-tips">
		                   <div className="tips_padding">
		                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
		                            <img src="/dist/img/tip-earth.png" className="tip-search" />
		                        </div>
		                        <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8 body-tips-href">
		                           <h2 className="profile-h2"> Experience</h2>
		                           <p>
		                               Lorem ipsum dolor sit amet,
		                               consectetur adipiscing el.
		                               Nam nec magna arcu Nullam
		                               sakaman.
		                           </p>
		                        </div>
		                   </div>
		                    <div className="col-xs-12 tips-bottom text-center footer-tips-href">
		                        Add Experience
		                    </div>
		                </a>
		            </div>
				</div>
				<div className="tips-wrapper col-lg-4 col-md-4 col-sm-6 col-xs-12" id="education">
		            <div className="x_panel_tips">
		                <a onClick={this.scrollToSection.bind(this, 'education-tip')} className="div-tips">
		                   <div className="tips_padding">
		                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
		                            <img src="/dist/img/tip-book.png" className="tip-search-book" />
		                        </div>
		                        <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8 body-tips-href">
		                           <h2 className="profile-h2"> Education</h2>
		                           <p>
		                               Lorem ipsum dolor sit amet,
		                               consectetur adipiscing el.
		                               Nam nec magna arcu Nullam
		                               sakaman.
		                           </p>
		                        </div>
		                   </div>
		                    <div className="col-xs-12 tips-bottom text-center footer-tips-href">
		                        Add Education
		                    </div>
		                </a>
		            </div>
				</div>
				<div className="tips-wrapper col-lg-4 col-md-4 col-sm-6 col-xs-12" id="achievements">
		            <div className="x_panel_tips">
		                <a onClick={this.scrollToSection.bind(this, 'achievement-tip')} className="div-tips">
		                   <div className="tips_padding">
		                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
		                            <img src="/dist/img/tip-medal.png" className="tip-search" />
		                        </div>
		                        <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8 body-tips-href">
		                           <h2 className="profile-h2"> Achievements</h2>
		                           <p>
		                               Lorem ipsum dolor sit amet,
		                               consectetur adipiscing el.
		                               Nam nec magna arcu Nullam
		                               sakaman.
		                           </p>
		                        </div>
		                   </div>
		                    <div className="col-xs-12 tips-bottom text-center footer-tips-href">
		                        Add Achievements
		                    </div>
		                </a>
		            </div>
				</div>
				<div className="tips-wrapper col-lg-4 col-md-4 col-sm-6 col-xs-12" id="seminars">
		            <div className="x_panel_tips">
		                <a onClick={this.scrollToSection.bind(this, 'seminar-tip')} className="div-tips">
		                   <div className="tips_padding">
		                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
		                            <img src="/dist/img/tip-edit.png" className="tip-search" />
		                        </div>
		                        <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8 body-tips-href">
		                           <h2 className="profile-h2"> Seminars</h2>
		                           <p>
		                               Lorem ipsum dolor sit amet,
		                               consectetur adipiscing el.
		                               Nam nec magna arcu Nullam
		                               sakaman.
		                           </p>
		                        </div>
		                   </div>
		                    <div className="col-xs-12 tips-bottom text-center footer-tips-href">
		                        Add Seminars
		                    </div>
		                </a>
		            </div>
				</div>
				<div className="tips-wrapper col-lg-4 col-md-4 col-sm-6 col-xs-12" id="organizations">
		            <div className="x_panel_tips">
		                <a onClick={this.scrollToSection.bind(this, 'organization-tip')} className="div-tips">
		                   <div className="tips_padding">
		                        <div className="col-md-4 col-lg-4 col-sm-4 col-xs-4">
		                            <img src="/dist/img/tip-heart.png" className="tip-search" />
		                        </div>
		                        <div className="col-md-8 col-lg-8 col-sm-8 col-xs-8 body-tips-href">
		                           <h2 className="profile-h2"> Organizations</h2>
		                           <p>
		                               Lorem ipsum dolor sit amet,
		                               consectetur adipiscing el.
		                               Nam nec magna arcu Nullam
		                               sakaman.
		                           </p>
		                        </div>
		                   </div>
		                    <div className="col-xs-12 tips-bottom text-center footer-tips-href">
		                        Add Organizations
		                    </div>
		                </a>
		            </div>
				</div>
				<a className="col-md-12 col-sm-12 col-xs-12" onClick={this.hideTips}>
		            <div className="btn x_panel_view_less text-center" id="step2">
		               {this.state.view} <i id="arrow"></i>
		            </div>
		        </a>
			</div>
        );
    }
});

var SchoolOptions = React.createClass({
    displayName: "SchoolOptions",

    render: function render() {
        return <option value= {this.props.data.name}> {this.props.data.name} </option>
    }
});
