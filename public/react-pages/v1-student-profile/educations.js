"use strict";

var id = window.studid;
var addEdu = true;
var x = 1;

var Educations = React.createClass({
    displayName: "Educations",

    getInitialState: function(){
        return{
            value: this.props.data.id,
            user_education: this.props.data.user_education,
            olduser_education: this.props.data.user_education,
            show: false
        };
    },
    handleEsc: function(event){
        if(event.keyCode == 27){
            this.setState({
                user_education : this.state.olduser_education,
                show : false
            });
        }
    },
    handleCancel: function(event){
        this.setState({
            user_education : this.state.olduser_education,
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
        formData.append('user_education', this.state.user_education);
        formData.append('id', this.state.value);

        // console.log(this.state.id);

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
            url: "/api/v1/educations/delete/"+this.state.value,
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
            url: "/api/v1/educations/student/"+id,
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
                        olduser_education : data.user_education
                    })
                    // console.log(data);
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
                    this.state.user_education
                ),
                React.createElement(
                    "button",
                    {type:"submit", className:"btn-del pull-right btn-size-save works-btn delete_"+this.state.value, title: "Delete"},
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
                    {type:"text", className:"form-works", placeholder:"Type your educational information here!", value: this.state.user_education, name:"user_education", onChange: this.handleChange.bind(this, 'user_education'), onKeyDown: this.handleEsc, autoFocus: true, required: "required"}
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
});

var Education_list = React.createClass({
    displayName: "Education_list",

    render: function render() {
        var eduOpt = function eduOpt(result) {
            return React.createElement(
                Educations,
                { key: result.id, data: result }
            );
        };

        return React.createElement(
            "div",
            null,
            this.props.data.map(eduOpt)
        );
    }
});

var Add_Education = React.createClass({
    getInitialState: function(){
        return {
            data: [],
            new_education: '',
            user_education: '',
            olduser_education: '',
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
                user_education : this.state.olduser_education,
                show : 0
            });
        }
    },
    handleCancel: function(event){
        this.setState({
            user_education : this.state.olduser_education,
            show : 0
        });
    },
    handleSave(e) {
        e.preventDefault();
        //
        var saveData = new FormData();
        saveData.append('user_education', this.state.user_education);
        saveData.append('id', this.state.id);

        // console.log(this.state.id);

        this.saveToServer(saveData);
        return;
    },
    handleSubmit(e) {
		e.preventDefault();
        var formData = new FormData();
        formData.append('new_education', this.state.new_education);
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
            url: "/api/v1/educations/delete/"+this.state.id,
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
            url: "/api/v1/educations/student/create/"+id,
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                if (data.success == false) {
                    alert("error", data.message);
                    return false;
                } else {
                     addEdu = true;
                     this.setState({
                         show: 0,
                         id: data.id,
                         user_education: data.user_education,
                         olduser_education: data.user_education
                     })
                }
            }.bind(this)
        });
    },
    saveToServer(saveData) {
        $.ajax({
            type: "POST",
            url: "/api/v1/educations/student/"+id,
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
                        user_education: data.user_education,
                        olduser_education: data.user_education
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
                    this.state.user_education
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
                    {type:"text", className:"form-works", placeholder:"Type your educational information here!", name:"new_education", value: this.state.new_education, onChange: this.handleChange.bind(this, 'new_education'), autoFocus: true , required: "required"}
                ),
                React.createElement(
                    "a",
                    {className:"btn btn-del pull-right btn-size-save remove_btn_edu", title: "Cancel"},
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
                    {type:"text", className:"form-works", placeholder:"Type your educational information here!", value: this.state.user_education, name:"user_education", onChange: this.handleChange.bind(this, 'user_education'), autoFocus: true, required: "required", onKeyDown: this.handleEsc}
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

var GetEducations = React.createClass({
    displayName: "GetEducations",

    getInitialState() {
        return {
            data: [],
            chatboxes: []
        };
    },
    componentDidMount() {
        $.get("/api/v1/educations/student/" + id, function(result) {
            this.setState({
                data: result
            });
        }.bind(this));
    },
    addInput() {
        if(addEdu == true){
            addEdu = false;
            var cbs = this.state.chatboxes;
            cbs.push(React.createElement(Add_Education, { key : x}));
            this.setState({ chatboxes: cbs });
            x++;
        }

        $('.wrapper').on('click', '.remove_btn_edu', function(e){ //Once remove button is clicked
            e.preventDefault();
            addEdu = true;
            $(this).parent('form').remove(); //Remove field html
        });
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
                        React.createElement("i", { className: "fa fa-graduation-cap margin-r-5" }),
                        "Education"
                    ),
                    React.createElement(
                        "a",
                        {type:"button", className: "hidden-btn btn btn-primary pull-right btn-size-add", onClick: this.addInput},
                        "Add Education"
                    )
            ),
            React.createElement(
                "div",
                {className:"box-body"},
                React.createElement(
                    Education_list,
                    {data: this.state.data}
                ),
                this.state.chatboxes
            )
        );
    }
});

var Content = React.createClass({
	render() {
		return React.createElement(
            "div",
			null,
			React.createElement(GetEducations)
		)
	}
});

ReactDOM.render(React.createElement(
   "div",
   null,
   React.createElement(Content, null)),
   document.getElementById('user-educations')
);
