"use strict";
var Getobjectives = React.createClass({
    displayName: "Getobjectives",
    getInitialState(){
        return{
            overview: []
        };
    },
    componentWillMount(){
        $.ajax({
			type: "GET",
			url: "/api/v1/qualifications/student/"+id,
			success: function(overviews) {
                this.setState({
                    overview : overviews
                });
			}.bind(this),
			error: function() {
				window.location.reload();
			}
		});
    },
    render: function render() {
        return React.createElement(
             "div",
             {className:"show-div"},
             React.createElement(
               'div',
               { role: 'tabpanel', className: 'tab-pane fade active in', id: 'tab_content1', 'aria-labelledby': 'home-tab' },
               React.createElement(
                 Get_overview,
                 { data: this.state.overview }
               )
             )
        );
    }
});

var Get_overview = React.createClass({
    displayName: "Get_overview",
    render: function render() {
        var overOpt = function overOpt(result) {
            return React.createElement(Overview,
                {key: result.id,
                data: result
            });
        };
        if(this.props.data == ""){
            return React.createElement(
                'div',
                {className:"message_wrapper add-overview"},
                React.createElement(
                  'a',
                  { className: 'message msg-content add-overview-dash' },
                  React.createElement('span', {className: "fa fa-plus"}),
                   "Add Qualification"
                )
            );
        }
        else{
            return React.createElement(
                'div',
                {className:"message_wrapper"},
                React.createElement(
                  'a',
                  { className: 'message msg-content' },
                  this.props.data.map(overOpt)
                )
            );
        }
    }
});

var Overview = React.createClass({
    displayName: "Overview",
	getInitialState: function(){
		return {
			overview: this.props.data.qual_description
		};
	},
    render: function render() {
        return React.createElement(
          'div',
          null,
          this.state.overview
        );
    }
});

ReactDOM.render(React.createElement(
   "div",
   null,
   React.createElement(Getobjectives, null)),
   document.getElementById('overview')
);
