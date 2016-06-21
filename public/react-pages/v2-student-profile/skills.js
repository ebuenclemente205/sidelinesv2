"use strict";
var Getskills = React.createClass({
    displayName: "Getskills",
    getInitialState(){
        return{
            skill: []
        };
    },
    componentDidMount(){
        $.ajax({
			type: "GET",
			url: "/api/v1/skills/student/"+id,
			success: function(result){
                this.setState({
                    skill: result
                });
			}.bind(this),
            error: function(){
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
                 'div',
                 { className: 'message_wrapper' },
                 React.createElement(
                   'div',
                   { className: 'message msg-content' },
                   React.createElement(
                     'ul',
                     { className: 'list-unstyled scroll-view' },
                     React.createElement(
                         Get_skills,
                         {data: this.state.skill}
                     )
                   )
                 )
               )
             )
        );
    }
});

var Get_skills = React.createClass({
    displayName: "Get_skills",
    render: function render() {
        var skillOpt = function skillOpt(result) {
            return React.createElement(Skills,
                {key: result.id,
                data: result
            });
        };
        return React.createElement(
            "div",
            {className:"inline-div"},
            this.props.data.map(skillOpt)
        );
    }
});

var Skills = React.createClass({
    displayName: "Skills",
	getInitialState: function(){
		return {
			skill: this.props.data.name
		};
	},
    render: function render() {
		return React.createElement(
          'li',
          { className: 'div-skills' },
          React.createElement(
            'p',
            { className: 'line' },
            React.createElement(
              'a',
              { className: 'btn profile-skill-btn btn-sm pull-left tag-skills' },
              this.state.skill
            )
          )
        );
    }
});

ReactDOM.render(React.createElement(
   "div",
   null,
   React.createElement(Getskills, null)),
   document.getElementById('skills')
);
