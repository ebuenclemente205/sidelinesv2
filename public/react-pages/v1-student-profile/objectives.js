"use strict";

var id = window.studid;
var addObjs = true;
var x = 1;

var Getobjectives = React.createClass({
    displayName: "Getobjectives",

    getInitialState : function() {
        return {
            data: [],
            chatboxes: []
        };
    },
    addInput: function(){
        if(addObjs == true){
            addObjs = false;
            var cbs = this.state.chatboxes;
            cbs.push(React.createElement(objectives,{ key: x }));
            this.setState({ chatboxes: cbs });
            x++;
        }

        $('.wrapper').on('click', '.remove_btn_obj', function(e){ //Once remove button is clicked
            e.preventDefault();
            addObjs = true;
            $(this).parent('form').remove(); //Remove field html
        });
    },
    componentDidMount() {
        $.get("/api/v1/objectives/student/"+id, function(result) {
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
                        React.createElement("i", { className: "fa fa-user-plus margin-r-5" }),
                        "Objectives"
                    ),
                    React.createElement(
                        "a",
                        {type:"button", className: "hidden-btn btn btn-primary pull-right btn-size-add", onClick: this.addInput},
                        "Add Objective"
                    )
            ),
            React.createElement(
                "div",
                {className:"box-body"},
                React.createElement(
                    Objective_list,
                    {data: this.state.data}
                ),
                this.state.chatboxes
            )
        );
    }
});

var Objective_list = React.createClass({
    displayName: "Objective_list",

    render: function render() {
        var ObjectOpt = function ObjectOpt(result) {
            return React.createElement(Objects,
                {key: result.id,
                data: result
            });
        };
        return React.createElement(
            "div",
            null,
            this.props.data.map(ObjectOpt)
        );
    }
});

var Objects = React.createClass({
    displayName: "Objects",

    getInitialState: function(){
        return{
            value: this.props.data.id,
            user_objective: this.props.data.user_objective,
            olduser_objective: this.props.data.user_objective,
            show: false
        };
    },
    handleEsc: function(event){
        if(event.keyCode == 27){
            this.setState({
                user_objective : this.state.olduser_objective,
                show : false
            });
        }
    },
    handleCancel: function(event){
        this.setState({
            user_objective : this.state.olduser_objective,
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
        formData.append('user_objective', this.state.user_objective);
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
            url: "/api/v1/objectives/delete/"+this.state.value,
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
            url: "/api/v1/objectives/student/"+id,
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
                        olduser_objective : data.user_objective
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
                    this.state.user_objective
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
                    {type:"text", className:"form-works", placeholder:"Type your objective here!", value: this.state.user_objective, name:"user_objective", onChange: this.handleChange.bind(this, 'user_objective'), onKeyDown: this.handleEsc, autoFocus: true, required: "required"}
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

var objectives = React.createClass({
    getInitialState: function(){
        return {
            data: [],
            new_objective: '',
            user_objective: '',
            olduser_objective: '',
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
                user_objective : this.state.olduser_objective,
                show : 0
            });
        }
    },
    handleCancel: function(event){
        this.setState({
            user_objective : this.state.olduser_objective,
            show : 0
        });
    },
    handleSave(e) {
        e.preventDefault();
        //
        var saveData = new FormData();
        saveData.append('user_objective', this.state.user_objective);
        saveData.append('id', this.state.id);

        // console.log(this.state.id);

        this.saveToServer(saveData);
        return;
    },
    handleSubmit(e) {
		e.preventDefault();
        var formData = new FormData();
        formData.append('new_objective', this.state.new_objective);
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
            url: "/api/v1/objectives/delete/"+this.state.id,
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
            url: "/api/v1/objectives/student/create/"+id,
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                if (data.success == false) {
                    alert("error", data.message);
                    return false;
                } else {
                     addObjs = true;
                     this.setState({
                         show: 0,
                         id: data.id,
                         user_objective: data.user_objective,
                         olduser_objective: data.user_objective
                     })
                }
            }.bind(this)
        });
    },
    saveToServer(saveData) {
        $.ajax({
            type: "POST",
            url: "/api/v1/objectives/student/"+id,
            data: saveData,
            processData: false,
            contentType: false,
            success: function(data) {
                if (data.success == false) {
                    alert("error", data.message);
                    return false;
                } else {
                    this.setState({
                        show: 0,
                        id: data.id,
                        user_objective: data.user_objective,
                        olduser_objective: data.user_objective
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
                    this.state.user_objective
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
                    {type:"text", className:"form-works", placeholder:"Type your objective here!", name:"new_objective", value: this.state.new_objective, onChange: this.handleChange.bind(this, 'new_objective'), autoFocus: true , required: "required"}
                ),
                React.createElement(
                    "a",
                    {className:"btn btn-del pull-right btn-size-save remove_btn_obj", title: "Cancel"},
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
                    {type:"text", className:"form-works", placeholder:"Type your objective here!", value: this.state.user_objective, name:"user_objective", onChange: this.handleChange.bind(this, 'user_objective'), autoFocus: true, required: "required", onKeyDown: this.handleEsc}
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
			React.createElement(Getobjectives)
		)
	}
});

ReactDOM.render(React.createElement(
   "div",
   null,
   React.createElement(Content, null)),
   document.getElementById('user-objectives')
);
