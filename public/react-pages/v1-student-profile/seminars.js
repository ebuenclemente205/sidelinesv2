"use strict";

var id = window.studid;
var addQual = true;
var x = 1;

var GetSeminars = React.createClass({
    displayName: "GetSeminars",

    getInitialState : function() {
        return {
            data: [],
            chatboxes: []
        };
    },
    addInput: function(){
        if(addQual == true){
            addQual = false;
            var cbs = this.state.chatboxes;
            cbs.push(React.createElement(Add_Seminars,{ key: x }));
            this.setState({ chatboxes: cbs });
            x++;
        }

        $('.wrapper').on('click', '.remove_btn_semi', function(e){ //Once remove button is clicked
            e.preventDefault();
            addQual = true;
            $(this).parent('form').remove(); //Remove field html
        });
    },
    componentDidMount() {
        $.get("/api/v1/seminars/student/"+id, function(result) {
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
                        "Seminars"
                    ),
                    React.createElement(
                        "a",
                        {type:"button", className: "btn btn-primary pull-right btn-size-add hidden-btn", onClick: this.addInput},
                        "Add Seminar"
                    )
            ),
            React.createElement(
                "div",
                {className:"box-body"},
                React.createElement(
                    Seminar_list,
                    {data: this.state.data}
                ),
                this.state.chatboxes
            )
        );
    }
});

var Seminar_list = React.createClass({
    displayName: "Seminar_list",

    render: function render() {
        var QualOpt = function QualOpt(result) {
            return React.createElement(Qualifs,
                {key: result.id,
                data: result
            });
        };
        return React.createElement(
            "div",
            null,
            this.props.data.map(QualOpt)
        );
    }
});

var Qualifs = React.createClass({
    displayName: "Qualifs",

    getInitialState: function(){
        return{
            value: this.props.data.id,
            user_seminar: this.props.data.user_seminar,
            olduser_seminar: this.props.data.user_seminar,
            show: false
        };
    },
    handleEsc: function(event){
        if(event.keyCode == 27){
            this.setState({
                user_seminar : this.state.olduser_seminar,
                show : false
            });
        }
    },
    handleCancel: function(event){
        this.setState({
            user_seminar : this.state.olduser_seminar,
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
        formData.append('user_seminar', this.state.user_seminar);
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
            url: "/api/v1/seminars/delete/"+this.state.value,
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
            url: "/api/v1/seminars/student/"+id,
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
                        olduser_seminar : data.user_seminar
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
                    this.state.user_seminar
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
                    {type:"text", className:"form-works", placeholder:"Seminars", value: this.state.user_seminar, name:"user_seminar", onChange: this.handleChange.bind(this, 'user_seminar'), onKeyDown: this.handleEsc, autoFocus: true, required: "required"}
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

var Add_Seminars = React.createClass({
    getInitialState: function(){
        return {
            data: [],
            new_seminar: '',
            user_seminar: '',
            olduser_seminar: '',
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
                user_seminar : this.state.olduser_seminar,
                show : 0
            });
        }
    },
    handleCancel: function(event){
        this.setState({
            user_seminar : this.state.olduser_seminar,
            show : 0
        });
    },
    handleSave(e) {
        e.preventDefault();
        //
        var saveData = new FormData();
        saveData.append('user_seminar', this.state.user_seminar);
        saveData.append('id', this.state.id);

        // console.log(this.state.id);

        this.saveToServer(saveData);
        return;
    },
    handleSubmit(e) {
		e.preventDefault();
        var formData = new FormData();
        formData.append('new_seminar', this.state.new_seminar);
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
            url: "/api/v1/seminars/delete/"+this.state.id,
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
            url: "/api/v1/seminars/student/create/"+id,
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
                         user_seminar: data.user_seminar,
                         olduser_seminar: data.user_seminar
                     })
                }
            }.bind(this)
        });
    },
    saveToServer(saveData) {
        $.ajax({
            type: "POST",
            url: "/api/v1/seminars/student/"+id,
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
                        user_seminar: data.user_seminar,
                        olduser_seminar: data.user_seminar
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
                    this.state.user_seminar
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
                    {type:"text", className:"form-works", placeholder:"Seminars", name:"new_seminar", value: this.state.new_seminar, onChange: this.handleChange.bind(this, 'new_seminar'), autoFocus: true , required: "required"}
                ),
                React.createElement(
                    "a",
                    {className:"btn btn-del pull-right btn-size-save remove_btn_semi", title: "Cancel"},
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
                    {type:"text", className:"form-works", placeholder:"Seminars", value: this.state.user_seminar, name:"user_seminar", onChange: this.handleChange.bind(this, 'user_seminar'), autoFocus: true, required: "required", onKeyDown: this.handleEsc}
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
			React.createElement(GetSeminars)
		)
	}
});

ReactDOM.render(React.createElement(
   "div",
   null,
   React.createElement(Content, null)),
   document.getElementById('user-seminars')
);
