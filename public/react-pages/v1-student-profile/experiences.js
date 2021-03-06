"use strict";

var id = window.studid;
var addExp = true;
var x = 1;

var GetExperiences = React.createClass({
    displayName: "GetExperiences",

    getInitialState : function() {
        return {
            data: [],
            chatboxes: []
        };
    },
    addInput: function(){
        if(addExp == true){
            addExp = false;
            var cbs = this.state.chatboxes;
            cbs.push(React.createElement(Experiences,{ key: x }));
            this.setState({ chatboxes: cbs });
            x++;
        }

        $('.wrapper').on('click', '.remove_btn_exp', function(e){ //Once remove button is clicked
            e.preventDefault();
            addExp = true;
            $(this).parent('form').remove(); //Remove field html
        });
    },
    componentDidMount() {
        $.get("/api/v1/experiences/student/"+id, function(result) {
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
                        React.createElement("i", { className: "fa fa-pencil margin-r-5" }),
                        "Experiences"
                    ),
                    React.createElement(
                        "a",
                        {type:"button", className: "btn btn-primary pull-right btn-size-add hidden-btn", onClick: this.addInput},
                        "Add Experience"
                    )
            ),
            React.createElement(
                "div",
                {className:"box-body"},
                React.createElement(
                    Experiences_list,
                    {data: this.state.data}
                ),
                this.state.chatboxes
            )
        );
    }
});

var Experiences_list = React.createClass({
    displayName: "Experiences_list",

    render: function render() {
        var ExpOpt = function ExpOpt(result) {
            return React.createElement(Exps,
                {key: result.id,
                data: result
            });
        };
        return React.createElement(
            "div",
            null,
            this.props.data.map(ExpOpt)
        );
    }
});

var Exps = React.createClass({
    displayName: "Exps",

    getInitialState: function(){
        return{
            value: this.props.data.id,
            user_experience: this.props.data.user_experience,
            olduser_experience: this.props.data.user_experience,
            show: false
        };
    },
    handleEsc: function(event){
        if(event.keyCode == 27){
            this.setState({
                user_experience : this.state.olduser_experience,
                show : false
            });
        }
    },
    handleCancel: function(event){
        this.setState({
            user_experience : this.state.olduser_experience,
            show : false
        });
    },
    handleChange: function(field, e){
        var state = {};
        state[field] = e.target.value;
        this.setState(state);
        // console.log(this.state.value);
    },
    handleSubmit(e) {
		e.preventDefault();
        //
        var formData = new FormData();
        formData.append('user_experience', this.state.user_experience);
        formData.append('id', this.state.value);

		this.sendToServer(formData);
		return;
	},
    handleDelete(e) {
		e.preventDefault();
        $(".delete_"+this.state.value).parent('form').remove();
        var deleteData = new FormData();
        deleteData.append('id', this.state.value);
        // console.log(this.state.id);

		this.deleteToServer(deleteData);
		return;
	},
    deleteToServer(deleteData) {
        $.ajax({
            type: "DELETE",
            url: "/api/v1/experiences/delete/"+this.state.value,
            data: deleteData,
            processData: false,
            contentType: false,
            success: function(data) {
                if (data.success == false) {
                    alert("error", data.message);
                    return false;
                } else {
                     this.setState({
                         show: 0
                     })
                }
            }.bind(this)
        });
    },
    sendToServer(formData) {
        $.ajax({
            type: "POST",
            url: "api/v1/experiences/student/" + id,
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                if (data.success == false) {
                    alert("error", data.message);
                    return false;
                } else {
                    this.setState({
                        show :  false,
                        olduser_experience : data.user_experience
                    })

                }
            }.bind(this)
        });
    },
    showEdit: function(){
        this.setState({
            show: true
        })
    },
    render: function render() {
        if(this.state.show == false){
            return React.createElement(
                "form",
                {onSubmit: this.handleDelete, className:"hover-form"},
                React.createElement(
                    "div",
                    {className:"font-15 div-inline", target: '_blank'},
                    this.state.user_experience
                ),
                React.createElement(
                    "button",
                    {type:"submit", className:"btn btn-del pull-right btn-size-save works-btn delete_"+this.state.value, title: "Delete"},
                    React.createElement(
                        "span",
                        {className:"fa fa-trash font-15"}
                    )
                ),
                React.createElement(
                    "a",
                    {className:"btn btn-primary pull-right btn-size-save works-btn", onClick:this.showEdit, title: "Edit"},
                    React.createElement(
                        "span",
                        {className:"fa fa-pencil font-15"}
                    )
                )
            );
        }
        else{
            return React.createElement(
                "form",
                {onSubmit: this.handleSubmit},
                React.createElement(
                    "input",
                    {type:"text", className:"form-works", placeholder:"Type your experience here!", value: this.state.user_experience, name:"user_experience", onChange: this.handleChange.bind(this, 'user_experience'), onKeyDown: this.handleEsc, autoFocus: true, required: "required"}
                ),
                React.createElement(
                    "a",
                    {className:"btn btn-del pull-right btn-size-save", onClick:this.handleCancel, title: "Cancel"},
                    React.createElement(
                        "span",
                        {className:"fa fa-remove font-15"}
                    )
                ),
                React.createElement(
                    "button",
                    {type:"submit", className:"btn btn-primary pull-right btn-size-save", onKeyDown:this.handleEsc, title: "Save Changes"},
                    React.createElement(
                        "span",
                        {className:"fa fa-save font-15"}
                    )
                )
            );
        }
    }
})

var Experiences = React.createClass({
    displayName: "Experiences",

    getInitialState: function(){
        return {
            data: [],
            new_experience: '',
            user_experience: '',
            olduser_experience: '',
            show: 1
        };
    },
    showEdit: function(){
        this.setState({
            show: 2
        })
    },
    handleChange: function(field, e){
        var state = {};
        state[field] = e.target.value;
        this.setState(state);
        // console.log(this.state.value);
    },
    handleEsc: function(event){
        if(event.keyCode == 27){
            this.setState({
                user_experience : this.state.olduser_experience,
                show : 0
            });
        }
    },
    handleCancel: function(event){
        this.setState({
            user_experience : this.state.olduser_experience,
            show : 0
        });
    },
    handleSave(e) {
        e.preventDefault();
        //
        var saveData = new FormData();
        saveData.append('user_experience', this.state.user_experience);
        saveData.append('id', this.state.id);

        // console.log(this.state.id);

        this.saveToServer(saveData);
        return;
    },
    handleSubmit(e) {
		e.preventDefault();
        var formData = new FormData();
        formData.append('new_experience', this.state.new_experience);
        formData.append('id', this.state.value);

		this.sendToServer(formData);
		return;
	},
    handleDelete(e) {
		e.preventDefault();
        $(".delete_"+this.state.id).parent('form').remove();
        var deleteData = new FormData();
        deleteData.append('id', this.state.id);
        // console.log(this.state.id);

		this.deleteToServer(deleteData);
		return;
	},
    deleteToServer(deleteData) {
        $.ajax({
            type: "DELETE",
            url: "/api/v1/experiences/delete/"+this.state.id,
            data: deleteData,
            processData: false,
            contentType: false,
            success: function(data) {
                if (data.success == false) {
                    alert("error", data.message);
                    return false;
                } else {
                     this.setState({
                         show: 0
                     })
                }
            }.bind(this)
        });
    },
    sendToServer(formData) {
        $.ajax({
            type: "POST",
            url: "/api/v1/experiences/student/create/"+id,
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                if (data.success == false) {
                    alert("error", data.message);
                    return false;
                } else {
                     addQual = true;
                     this.setState({
                         show: 0,
                         id: data.id,
                         user_experience: data.user_experience,
                         olduser_experience: data.user_experience
                     })
                }
            }.bind(this)
        });
    },
    saveToServer(saveData) {
        $.ajax({
            type: "POST",
            url: "/api/v1/experiences/student/"+id,
            data: saveData,
            processData: false,
            contentType: false,
            success: function(data) {
                if (data.success == false) {
                    alert("error", data.message);
                    return false;
                } else {
                    this.setState({
                        show :  0,
                        user_experience: data.user_experience,
                        olduser_experience: data.user_experience
                    })
                    // console.log(data);
                }
            }.bind(this)
        });
    },
    render() {
        if(this.state.show == 0){
            return React.createElement(
                "form",
                {onSubmit: this.handleDelete, className:"hover-form"},
                React.createElement(
                    "div",
                    {className:"font-15 div-inline", target: '_blank'},
                    this.state.user_experience
                ),
                React.createElement(
                    "button",
                    {type:"submit", className:"btn btn-del pull-right btn-size-save works-btn delete_"+this.state.id, title: "Delete"},
                    React.createElement(
                        "span",
                        {className:"fa fa-trash font-15"}
                    )
                ),
                React.createElement(
                    "a",
                    {className:"btn btn-primary pull-right btn-size-save works-btn", onClick:this.showEdit, title: "Edit"},
                    React.createElement(
                        "span",
                        {className:"fa fa-pencil font-15"}
                    )
                )
            );
        }
        else if(this.state.show == 1){
            return React.createElement(
                "form",
                {onSubmit: this.handleSubmit, className:"wrapper wrap"},
                React.createElement(
                    "input",
                    {type:"text", className:"form-works", placeholder:"Experience", name:"new_experience", value: this.state.new_experience, onChange: this.handleChange.bind(this, 'new_experience'), autoFocus: true , required: "required"}
                ),
                React.createElement(
                    "a",
                    {className:"btn btn-del pull-right btn-size-save remove_btn_exp", title: "Cancel"},
                    React.createElement(
                        "span",
                        {className:"fa fa-minus font-15"}
                    )
                ),
                React.createElement(
                    "button",
                    {className:"btn btn-primary pull-right btn-size-save", type:"submit", title: "Add Link"},
                    React.createElement(
                        "span",
                        {className:"fa fa-plus font-15"}
                    )
                )
            );
        }
        else if(this.state.show == 2){
            return React.createElement(
                "form",
                {onSubmit: this.handleSave},
                React.createElement(
                    "input",
                    {type:"text", className:"form-works", placeholder:"Achievements", value: this.state.user_experience, name:"user_experience", onChange: this.handleChange.bind(this, 'user_experience'), autoFocus: true, required: "required", onKeyDown: this.handleEsc}
                ),
                React.createElement(
                    "a",
                    {className:"btn btn-del pull-right btn-size-save", onClick: this.handleCancel, title: "Cancel"},
                    React.createElement(
                        "span",
                        {className:"fa fa-remove font-15"}
                    )
                ),
                React.createElement(
                    "button",
                    {type:"submit", className: "btn btn-primary pull-right btn-size-save", title: "Save Changes"},
                    React.createElement(
                        "span",
                        {className:"fa fa-save font-15"}
                    )
                )
            );
        }
    }
});

var Content = React.createClass({
	render() {
		return React.createElement(
            "div",
			null,
			React.createElement(GetExperiences)
		)
	}
});

ReactDOM.render(React.createElement(
   "div",
   null,
   React.createElement(Content, null)),
   document.getElementById('user-experiences')
);
