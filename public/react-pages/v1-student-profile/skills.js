"use strict";

var id = window.studid;
var addSkill = true;
var x = 1;
var y = 1;

var GetSkills = React.createClass({
    displayName: "GetSkills",

    getInitialState : function() {
        return {
            data: [],
            input_fields: []
        };
    },
    addInput: function(){
        if(addSkill == true){
            addSkill = false;
            var cbs = this.state.input_fields;
            cbs.push(React.createElement(Add_skill,{ key: x }));
            this.setState({ input_fields: cbs });
            x++;
        }

        $('.wrapper').on('click', '.remove_btn_skills', function(e){ //Once remove button is clicked
            e.preventDefault();
            addSkill = true;
            $(this).parent('form').remove(); //Remove field html
        });
    },
    componentDidMount() {
        $.get("/api/v1/skills/student/"+id, function(result) {
            this.setState({
                data: result
            });
        }.bind(this));
    },
    render: function render() {
        return React.createElement(
             "div",
             {className:"show-div"},
             React.createElement(
                "div",
                { className: "box-header with-border" },
                React.createElement(
                    "h3",
                    { className: "box-title" },
                    React.createElement("i", { className: "fa fa-tag margin-r-5" }),
                    " Skills"
                ),
                React.createElement(
                    "a",
                    {type:"button", className: "btn btn-primary pull-right btn-size-add hidden-btn", onClick: this.addInput},
                    "Add Skill"
                )
            ),
            React.createElement(
                "div",
                {className:"box-body"},
                React.createElement(
                    Skill_list,
                    {data: this.state.data}
                ),
                this.state.input_fields
            )
        );
    }
});

var Skill_list = React.createClass({
    displayName: "Skill_list",
    render: function render() {
        var skillOpt = function skillOpt(result) {
            return React.createElement(Skills,
                {key: result.id,
                data: result
            });
        };
        return React.createElement(
            "div",
            null,
            this.props.data.map(skillOpt)
        );
    }
});

var Skills = React.createClass({
    displayName: "Skills",
    getInitialState: function(){
        return{
            value: this.props.data.id,
            skill: this.props.data.name,
            show: false
        };
    },
    handleDelete(e) {
		e.preventDefault();
        $(".delete_"+this.state.value).parent('form').remove();
        // console.log(this.state.value);

		this.deleteToServer();
	},
    deleteToServer() {
        $.ajax({
            type: "DELETE",
            url: "/api/v1/skills/student/delete/"+id,
            data: {
                skill: this.state.value
            },
            success: function(data) {
                if (data.success == false) {
                    alert("error", data.message);
                    return false;
                } else {
                     this.setState({
                         show: false
                     })
                }
            }.bind(this)
        });
    },
    render: function render() {
            return React.createElement(
                "form",
                {onSubmit: this.handleDelete, className:"name label-skill hover-form"},
                React.createElement(
                    "a",
                    {href:"students/skills/"+this.state.skill, className:"font-18", target: '_blank'},
                    React.createElement(
                        "span",
                        {className:"label label-primary"},
                        this.state.skill
                    )
                ),
                React.createElement(
                    "button",
                    {type:"submit", className:"btn-hide no-outline delete_"+this.state.value, title: "Delete"},
                    React.createElement(
                        "span",
                        {className:"fa fa-trash icon-edit-skills hidden-logo"}
                    )
                )
            );
    }
})

var Add_skill = React.createClass({
    getInitialState: function(){
        return {
            data: [],
            skill: [],
            displayer: [],
            skillid: '',
            show: 0
        };
    },
    handleSkillChange(e) {
        this.setState({
            skill: e
        })
    },
    handleSubmit(e) {
        e.preventDefault();
        var formData = new FormData();

        $.get("/api/v1/skills/student/"+id, function(result) {
            var existing = false;

            for (var i = 0; i < result.length; i++) {
                if(this.state.skill === result[i].name){
                    existing = true;
                    break;
                }
            }

            if(!existing)   {
                formData.append('new_skill', this.state.skill);
                this.sendToServer(formData);
            }

        }.bind(this));
	},
    sendToServer(formData) {
        $.ajax({
            type: "POST",
            url: "/api/v1/skills/student/create/"+id,
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                if (data.success == false) {
                    alert("error", data.message);
                    return false;
                } else {
                     addSkill = true;

                     var cbs = this.state.displayer;
                     cbs.push(React.createElement(Meow,{ key: data.id, name: data.name, id: data.id }));
                     this.setState({ displayer: cbs });
                }
            }.bind(this)
        });
    },
    componentDidMount: function(){
        $.get("/api/v1/skills/", function(result) {
            this.setState({
                data: result
            });
        }.bind(this));
    },
    render: function() {
        if(this.state.show == 0){
            return React.createElement(
                "div",
                null,
                this.state.displayer,
                React.createElement(
                    "form",
                    {onSubmit: this.handleSubmit, className:"wrapper wrap"},
                    React.createElement(
                        SkillSelect,
                        {data: this.state.data, skill: this.state.skillid, updateSkill: this.handleSkillChange}
                    ),
                    React.createElement(
                        "a",
                        {className:"btn btn-del pull-right btn-size-save remove_btn_skills", title:"Cancel"},
                        React.createElement(
                            "span",
                            {className:"fa fa-minus font-15"}
                        )
                    ),
                    React.createElement(
                        "button",
                        {className:"btn btn-primary pull-right btn-size-save", type:"submit", title:"Add"},
                        React.createElement(
                            "span",
                            {className:"fa fa-plus font-15"}
                        )
                    )
                )
            );
        }
    }
});

var SkillSelect = React.createClass({
    displayName: "SkillSelect",
    componentDidMount: function(){
        $('.skills').select2({
          placeholder: 'Select or add new skill',
          tags: 'true'
      });

        $('.skills').on("change", this.handleChange);
    },
    handleChange(e) {
         e.preventDefault();

         this.props.updateSkill(e.target.value);
    },
    render: function render() {
        var skillOptions = function skillOptions(result) {
            return React.createElement(SkillsOptions,
                {key: result.id,
                data: result
            });
        };
        return React.createElement(
            "select",
            {
            className:"skills form-control select-width",
            autoFocus: true,
            required: "required"
            },
            this.props.data.map(skillOptions)
        );
    }
});

var SkillsOptions = React.createClass({
    displayName: "SkillsOptions",

    render: function render() {
        return React.createElement(
            "option",
            { value: this.props.data.name },
            this.props.data.name
        );
    }
});

var Meow = React.createClass({
    getInitialState(){
        return{
            skill: this.props.name,
            value: this.props.id
        };
    },
    handleDelete(e) {
		e.preventDefault();
        $(".delete_"+this.state.value).parent('form').remove();

		this.deleteToServer();
	},
    deleteToServer() {
        $.ajax({
            type: "DELETE",
            url: "/api/v1/skills/student/delete/"+id,
            data: {
                skill: this.state.value
            },
            success: function(data) {
                if (data.success == false) {
                    alert("error", data.message);
                    return false;
                }
            }.bind(this)
        });
    },
    render: function render(){
        return React.createElement(
            "div",
            {className:"margin-btm-14"},
            React.createElement(
                "form",
                {onSubmit: this.handleDelete, className:"name label-skill hover-form"},
                React.createElement(
                    "a",
                    {href:"students/skills/"+this.state.skill, className:"font-18", target: '_blank'},
                    React.createElement(
                        "span",
                        {className:"label label-primary"},
                        this.state.skill
                    )
                ),
                React.createElement(
                    "button",
                    {type:"submit", className:"btn-hide no-outline delete_"+this.state.value, title: "Delete"},
                    React.createElement(
                        "span",
                        {className:"fa fa-trash icon-edit-skills hidden-logo"}
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
			React.createElement(GetSkills)
		)
	}
});

ReactDOM.render(React.createElement(
   "div",
   null,
   React.createElement(Content, null)),
   document.getElementById('user-skills')
);
