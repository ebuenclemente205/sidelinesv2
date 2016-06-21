"use strict";
var id = window.userid;

var GetInfo = React.createClass({
    displayName: "GetInfo",
    getInitialState(){
        return {
            strength: '0%',
            fname: "",
            lname: "",
            image: "",
            school: "",
            degree: "",
            email: "",
            contact_no: ""
        };
    },
    componentDidMount(){
        $.ajax({
            type: "GET",
            url: "/api/v1/students/"+id,
            data: [],
            success: function(response){
                this.setState({
                    fname: response.fname,
                    lname: response.lname,
                    image: response.user.image,
                    school: response.school.name,
                    degree: response.degree.name,
                    email: response.user.email,
                    contact_no: response.contact_no
                });
            }.bind(this)
        });

        setTimeout(function () {
            this.setState({
                strength: '40%'
            });
        }.bind(this), 500);
    },
    handleSubmit(e) {
		e.preventDefault();
        // var file = e.target[0].files;
        var formData = new FormData();
        formData.append('fname', this.state.fname);
		this.sendToServer(formData);
		return;
	},
    sendToServer(formData) {
        $.ajax({
            type: "POST",
            url: "/api/v1/students/"+id,
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
            }.bind(this)
        });
    },
    render: function render() {
      return React.createElement(
          'div',
          null,
          React.createElement('div', { className: 'page-title' }),
          React.createElement('div', { className: 'clearfix' }),
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col-md-9 col-sm-12 col-xs-12' },
              React.createElement(
                'div',
                { className: 'x_panel' },
                React.createElement(
                  'div',
                  { className: 'x_title' },
                  React.createElement(
                    'h2',
                    null,
                    'User Profile'
                  ),
                  React.createElement(
                    'ul',
                    { className: 'nav navbar-right panel_toolbox' },
                    React.createElement(
                      'li',
                      null,
                      React.createElement(
                        'a',
                        { href: '#', role: 'button', title: 'Edit Profile' },
                        React.createElement('i', { className: 'fa fa-edit' })
                      )
                    ),
                    React.createElement(
                      'li',
                      null,
                      React.createElement(
                        'a',
                        { href: '#', role: 'button', title: 'Print Resume' },
                        React.createElement('i', { className: 'fa fa-print' })
                      )
                    )
                  ),
                  React.createElement('div', { className: 'clearfix' })
                ),
                React.createElement(
                  'div',
                  { className: 'x_content' },
                  React.createElement(
                    'div',
                    { className: 'col-md-3 col-sm-3 col-xs-12 profile_left' },
                    React.createElement(
                      'div',
                      { className: 'profile_img' },
                      React.createElement(
                        'div',
                        { id: 'crop-avatar' },
                        React.createElement('img', { className: 'img-responsive thumbnail avatar-view ', src: '/img/profilepics/'+this.state.image, alt: 'Avatar', title: 'Change the avatar' }),
                        React.createElement('div', { className: 'loading', 'aria-label': 'Loading', role: 'img', tabIndex: '-1' })
                      )
                    ),
                    React.createElement(
                      'h3',
                      null,
                      this.state.fname+" "+this.state.lname
                    ),
                    React.createElement(
                      'ul',
                      { className: 'list-unstyled user_data prog-margin' },
                      React.createElement(
                        'li',
                        null,
                        React.createElement(
                          'p',
                          null,
                          'Profile Strength'
                        ),
                        React.createElement(
                         'div',
                         { className: 'progress progress_md' },
                         React.createElement('div', { className: 'progress-bar bg-primary', role: 'progressbar', 'data-transitiongoal': '70', 'aria-valuenow': '49', style: {width:this.state.strength, transition: 'width 1s ease'}}, this.state.strength)
                        )
                      )
                    ),
                    React.createElement(
                      'ul',
                      { className: 'list-unstyled user_data' },
                      React.createElement(
                        'li',
                        null,
                        React.createElement('i', { className: 'col-md-1 col-sm-1 col-xs-1 fa fa-university user-profile-icon info-left' }),
                        React.createElement('span',{ className: 'col-md-11 col-sm-11 col-xs-11 info-right'}, this.state.school)
                      ),
                      React.createElement(
                        'li',
                        null,
                        React.createElement('i', { className: 'col-md-1 col-sm-1 col-xs-1 fa fa-certificate user-profile-icon info-left' }),
                        React.createElement('span',{ className: 'col-md-11 col-sm-11 col-xs-11 info-right'}, this.state.degree)
                      ),
                      React.createElement(
                        'li',
                        { className: 'm-top-xs' },
                        React.createElement('i', { className: 'col-md-1 col-sm-1 col-xs-1 fa fa-envelope user-profile-icon info-left' }),
                        React.createElement('span',{ className: 'col-md-11 col-sm-11 col-xs-11 info-right'}, this.state.email)
                      ),
                      React.createElement(
                        'li',
                        null,
                        React.createElement('i', { className: 'col-md-1 col-sm-1 col-xs-1 fa fa-phone user-profile-icon info-left' }),
                        React.createElement('span',{ className: 'col-md-11 col-sm-11 col-xs-11 info-right'}, this.state.contact_no)
                      )
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'col-md-9 col-sm-9 col-xs-12' },
                    React.createElement(
                      'div',
                      { className: '', role: 'tabpanel', 'data-example-id': 'togglable-tabs' },
                      React.createElement(
                        'ul',
                        { id: 'myTab', className: 'nav nav-tabs bar_made', role: 'tablist' },
                        React.createElement(
                          'h2',
                          { className: 'profile-h2' },
                          React.createElement('span', { className: 'fa fa-binoculars' }),
                          ' Overview'
                        )
                      ),
                      React.createElement(
                        'div',
                        { id: 'overview', className: 'tab-content' }
                      )
                    ),
                    React.createElement(
                      'div',
                      { className: '', role: 'tabpanel', 'data-example-id': 'togglable-tabs' },
                      React.createElement(
                        'ul',
                        { id: 'myTab', className: 'nav nav-tabs bar_made', role: 'tablist' },
                        React.createElement(
                          'h2',
                          { className: 'profile-h2' },
                          React.createElement('span', { className: 'fa fa-tags' }),
                          ' Skills'
                        )
                      ),
                      React.createElement(
                        'div',
                        { id: 'skills', className: 'tab-content' }
                      )
                    )
                  )
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'col-md-3 col-sm-12 col-xs-12' },
              React.createElement(
                'div',
                { className: 'x_panel' },
                React.createElement(
                  'div',
                  { className: 'x_title' },
                  React.createElement(
                    'h2',
                    null,
                    'Recommendations'
                  ),
                  React.createElement('div', { className: 'clearfix' })
                ),
                React.createElement(
                  'div',
                  { className: 'x_content' },
                  React.createElement(
                    'ul',
                    { className: 'list-unstyled scroll-view' },
                    React.createElement(
                      'li',
                      { className: 'media event hover-list' },
                      React.createElement(
                        'div',
                        { className: 'profile_pic recommend_pic border-green' },
                        React.createElement('img', { src: 'dist/img/img.jpg', className: 'img-circle profile_recom img-responsive' })
                      ),
                      React.createElement(
                        'div',
                        { className: 'media-body' },
                        React.createElement(
                          'a',
                          { className: 'title', href: '#' },
                          'Mr. Ilynn Payne'
                        ),
                        React.createElement(
                          'p',
                          null,
                          React.createElement(
                            'i',
                            { className: 'fa fa-university' },
                            ' '
                          ),
                          React.createElement(
                            'i',
                            null,
                            ' University of Cebu'
                          )
                        ),
                        React.createElement(
                          'a',
                          null,
                          ' ',
                          React.createElement(
                            'small',
                            null,
                            'View Details'
                          )
                        )
                      )
                    ),
                    React.createElement(
                      'li',
                      { className: 'media event hover-list' },
                      React.createElement(
                        'div',
                        { className: 'profile_pic recommend_pic border-green' },
                        React.createElement('img', { src: 'dist/img/arth.jpg', className: 'img-circle profile_recom img-responsive' })
                      ),
                      React.createElement(
                        'div',
                        { className: 'media-body' },
                        React.createElement(
                          'a',
                          { className: 'title', href: '#' },
                          'Mr. Renly Barratheon'
                        ),
                        React.createElement(
                          'p',
                          null,
                          React.createElement(
                            'i',
                            { className: 'fa fa-university' },
                            ' '
                          ),
                          React.createElement(
                            'i',
                            null,
                            ' University of Cebu'
                          )
                        ),
                        React.createElement(
                          'a',
                          null,
                          ' ',
                          React.createElement(
                            'small',
                            null,
                            'View Details'
                          )
                        )
                      )
                    ),
                    React.createElement(
                      'li',
                      { className: 'media event hover-list' },
                      React.createElement(
                        'div',
                        { className: 'profile_pic recommend_pic border-green' },
                        React.createElement('img', { src: 'dist/img/bob.jpg', className: 'img-circle profile_recom img-responsive' })
                      ),
                      React.createElement(
                        'div',
                        { className: 'media-body' },
                        React.createElement(
                          'a',
                          { className: 'title', href: '#' },
                          'Ser Davos'
                        ),
                        React.createElement(
                          'p',
                          null,
                          React.createElement(
                            'i',
                            { className: 'fa fa-university' },
                            ' '
                          ),
                          React.createElement(
                            'i',
                            null,
                            ' University of Cebu'
                          )
                        ),
                        React.createElement(
                          'a',
                          null,
                          ' ',
                          React.createElement(
                            'small',
                            null,
                            'View Details'
                          )
                        )
                      )
                    )
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'x_footer' },
                  React.createElement(
                    'button',
                    { className: 'btn btn-danger btn-block btn-sm', title: 'Ask for Recommendation'},
                    'Ask for Recommendation'
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'x_panel' },
                React.createElement(
                  'div',
                  { className: 'x_title' },
                  React.createElement(
                    'h2',
                    null,
                    'Recent Activities ',
                    React.createElement(
                      'small',
                      null,
                      'Sessions'
                    )
                  ),
                  React.createElement(
                    'ul',
                    { className: 'nav navbar-right panel_toolbox' },
                    React.createElement(
                      'li',
                      null,
                      React.createElement(
                        'a',
                        { className: 'collapse-link' },
                        React.createElement('i', { className: 'fa fa-chevron-up' })
                      )
                    ),
                    React.createElement(
                      'li',
                      { className: 'dropdown' },
                      React.createElement(
                        'a',
                        { href: '#', className: 'dropdown-toggle', 'data-toggle': 'dropdown', role: 'button', 'aria-expanded': 'false' },
                        React.createElement('i', { className: 'fa fa-wrench' })
                      ),
                      React.createElement(
                        'ul',
                        { className: 'dropdown-menu', role: 'menu' },
                        React.createElement(
                          'li',
                          null,
                          React.createElement(
                            'a',
                            { href: '#' },
                            'Settings 1'
                          )
                        ),
                        React.createElement(
                          'li',
                          null,
                          React.createElement(
                            'a',
                            { href: '#' },
                            'Settings 2'
                          )
                        )
                      )
                    ),
                    React.createElement(
                      'li',
                      null,
                      React.createElement(
                        'a',
                        { className: 'close-link' },
                        React.createElement('i', { className: 'fa fa-close' })
                      )
                    )
                  ),
                  React.createElement('div', { className: 'clearfix' })
                ),
                React.createElement(
                  'div',
                  { className: 'x_content' },
                  React.createElement(
                    'div',
                    { className: 'dashboard-widget-content' },
                    React.createElement(
                      'ul',
                      { className: 'list-unstyled timeline widget' },
                      React.createElement(
                        'li',
                        null,
                        React.createElement(
                          'div',
                          { className: 'block' },
                          React.createElement(
                            'div',
                            { className: 'block_content' },
                            React.createElement(
                              'h2',
                              { className: 'title' },
                              React.createElement(
                                'a',
                                null,
                                'Who Needs Sundance When You’ve Got Crowdfunding?'
                              )
                            ),
                            React.createElement(
                              'div',
                              { className: 'byline' },
                              React.createElement(
                                'span',
                                null,
                                '13 hours ago'
                              ),
                              ' by ',
                              React.createElement(
                                'a',
                                null,
                                'Jane Smith'
                              )
                            ),
                            React.createElement(
                              'p',
                              { className: 'excerpt' },
                              'Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and… ',
                              React.createElement(
                                'a',
                                null,
                                'Read More'
                              )
                            )
                          )
                        )
                      ),
                      React.createElement(
                        'li',
                        null,
                        React.createElement(
                          'div',
                          { className: 'block' },
                          React.createElement(
                            'div',
                            { className: 'block_content' },
                            React.createElement(
                              'h2',
                              { className: 'title' },
                              React.createElement(
                                'a',
                                null,
                                'Who Needs Sundance When You’ve Got Crowdfunding?'
                              )
                            ),
                            React.createElement(
                              'div',
                              { className: 'byline' },
                              React.createElement(
                                'span',
                                null,
                                '13 hours ago'
                              ),
                              ' by ',
                              React.createElement(
                                'a',
                                null,
                                'Jane Smith'
                              )
                            ),
                            React.createElement(
                              'p',
                              { className: 'excerpt' },
                              'Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and… ',
                              React.createElement(
                                'a',
                                null,
                                'Read More'
                              )
                            )
                          )
                        )
                      ),
                      React.createElement(
                        'li',
                        null,
                        React.createElement(
                          'div',
                          { className: 'block' },
                          React.createElement(
                            'div',
                            { className: 'block_content' },
                            React.createElement(
                              'h2',
                              { className: 'title' },
                              React.createElement(
                                'a',
                                null,
                                'Who Needs Sundance When You’ve Got Crowdfunding?'
                              )
                            ),
                            React.createElement(
                              'div',
                              { className: 'byline' },
                              React.createElement(
                                'span',
                                null,
                                '13 hours ago'
                              ),
                              ' by ',
                              React.createElement(
                                'a',
                                null,
                                'Jane Smith'
                              )
                            ),
                            React.createElement(
                              'p',
                              { className: 'excerpt' },
                              'Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and… ',
                              React.createElement(
                                'a',
                                null,
                                'Read More'
                              )
                            )
                          )
                        )
                      ),
                      React.createElement(
                        'li',
                        null,
                        React.createElement(
                          'div',
                          { className: 'block' },
                          React.createElement(
                            'div',
                            { className: 'block_content' },
                            React.createElement(
                              'h2',
                              { className: 'title' },
                              React.createElement(
                                'a',
                                null,
                                'Who Needs Sundance When You’ve Got Crowdfunding?'
                              )
                            ),
                            React.createElement(
                              'div',
                              { className: 'byline' },
                              React.createElement(
                                'span',
                                null,
                                '13 hours ago'
                              ),
                              ' by ',
                              React.createElement(
                                'a',
                                null,
                                'Jane Smith'
                              )
                            ),
                            React.createElement(
                              'p',
                              { className: 'excerpt' },
                              'Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and… ',
                              React.createElement(
                                'a',
                                null,
                                'Read More'
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
      );
    }
});


var Content = React.createClass({
	render() {
		return React.createElement(
            "div",
			null,
			React.createElement(GetInfo)
		)
	}
});

var UserHeader = React.createClass({
    getInitialState(){
        return {
            fname: "",
            image: ""
        };
    },
    componentDidMount(){
        $.ajax({
			type: "GET",
			url: "/api/v1/students/"+id,
			data: [],
            success: function(response){
                this.setState({
                    fname: response.fname,
                    image: response.user.image
                });
            }.bind(this)
		});
    },
	render() {
		return React.createElement(
            "div",
            null,
            React.createElement(
                "img",
                {src: '/img/profilepics/'+this.state.image}
            ),
            React.createElement(
                "span",
                null,
                this.state.fname
            )
		);
	}
});

ReactDOM.render(React.createElement(
   "div",
   null,
   React.createElement(Content, null)),
   document.getElementById('personal-info')
);

ReactDOM.render(React.createElement(
   "div",
   null,
   React.createElement(UserHeader, null)),
   document.getElementById('user-header')
);
