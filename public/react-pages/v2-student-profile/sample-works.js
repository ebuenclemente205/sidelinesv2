"use strict";

var id = window.studid;
var add = true;
var x = 1;

var GetSamples = React.createClass({
    displayName: "GetSamples",

    getInitialState : function() {
        return {
            data: [],
            chatboxes: []
        };
    },
    addInput: function(){
        if(add == true){
            add = false;
            var cbs = this.state.chatboxes;
            cbs.push(React.createElement(Add_works,{ key: x }));
            this.setState({ chatboxes: cbs });
            x++;
        }

        $('.wrapper').on('click', '.remove_btn_work', function(e){ //Once remove button is clicked
            e.preventDefault();
            add = true;
            $(this).parent('form').remove(); //Remove field html
        });
    },
    componentDidMount() {
        $.get("/api/v1/works/student/"+id, function(result) {
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
                    React.createElement("i", { className: "glyphicon glyphicon-folder-open margin-r-5" }),
                    " Sample Works"
                ),
                React.createElement(
                    "a",
                    {type:"button", className: "hidden-btn btn btn-primary pull-right btn-size-add", onClick: this.addInput},
                    "Add Link"
                )
            ),
            React.createElement(
                "div",
                {className:"box-body"},
                React.createElement(
                    Sample_works,
                    {data: this.state.data}
                ),
                this.state.chatboxes
            )
        );
    }
});

var Sample_works = React.createClass({
    displayName: "Sample_works",
    render: function render() {
        var workOpt = function workOpt(result) {
            return React.createElement(Works,
                {key: result.id,
                data: result
            });
        };
        return React.createElement(
            "div",
            null,
            this.props.data.map(workOpt)
        );
    }
});

var Works = React.createClass({
    displayName: "Works",
    getInitialState: function(){
        return{
            value: this.props.data.id,
            sample_work: this.props.data.sample_work,
            oldsample_work: this.props.data.sample_work,
            show: false
        };
    },
    handleEsc: function(event){
        if(event.keyCode == 27){
            this.setState({
                sample_work : this.state.oldsample_work,
                show : false
            });
        }
    },
    handleCancel: function(event){
        this.setState({
            sample_work : this.state.oldsample_work,
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
        formData.append('sample_work', this.state.sample_work);
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
            url: "/api/v1/works/delete/"+this.state.value,
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
            url: "/api/v1/works/student/"+id,
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
                        oldsample_work : data.sample_work
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
                    "a",
                    {href:this.state.sample_work, className:"font-15", target: '_blank'},
                    this.state.sample_work
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
                    {type:"text", className:"form-works", placeholder:"http://www.yourlink.samplework.com", value: this.state.sample_work, name:"sample_work", onChange: this.handleChange.bind(this, 'sample_work'), onKeyDown: this.handleEsc, autoFocus: true, required: "required"}
                ),
                React.createElement(
                    "a",
                    {className:"btn btn-del pull-right btn-size-save", title: "Cancel", onClick: this.handleCancel},
                    React.createElement(
                        "span",
                        {className:"fa fa-remove font-15"}
                    )
                ),
                React.createElement(
                    "button",
                    {type:"submit", className:"btn btn-primary pull-right btn-size-save", title: "Save"},
                    React.createElement(
                        "span",
                        {className:"fa fa-save font-15"}
                    )
                )
            );
        }
    }
})

var Add_works = React.createClass({
    getInitialState: function(){
        return {
            data: [],
            new_work: '',
            sample_work: '',
            oldsample_work: '',
            show: 1
        };
    },
    showEdit: function(){
        this.setState({
            show: 2
        })
    },
    handleEsc: function(event){
        if(event.keyCode == 27){
            this.setState({
                sample_work : this.state.oldsample_work,
                show : 0
            });
        }
    },
    handleCancel: function(event){
        this.setState({
            sample_work : this.state.oldsample_work,
            show : 0
        });
    },
    handleChange: function(field, e){
        var state = {};
        state[field] = e.target.value;
        this.setState(state);
        // console.log(this.state.value);
    },
    handleSave(e) {
        e.preventDefault();
        //
        var saveData = new FormData();
        saveData.append('sample_work', this.state.sample_work);
        saveData.append('id', this.state.id);

        // console.log(this.state.id);

        this.saveToServer(saveData);
        return;
    },
    handleSubmit(e) {
		e.preventDefault();
        var formData = new FormData();
        formData.append('new_work', this.state.new_work);
        // console.log(this.state.id);

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
            url: "/api/v1/works/delete/"+this.state.id,
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
            url: "/api/v1/works/student/create/"+id,
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                if (data.success == false) {
                    alert("error", data.message);
                    return false;
                } else {
                     add = true;
                     this.setState({
                         show: 0,
                         id: data.id,
                         sample_work: data.sample_work,
                         oldsample_work: data.sample_work
                     })
                }
            }.bind(this)
        });
    },
    saveToServer(saveData) {
        $.ajax({
            type: "POST",
            url: "/api/v1/works/student/"+id,
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
                        sample_work: data.sample_work,
                        oldsample_work: data.sample_work
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
                    "a",
                    {href:this.state.sample_work, className:"font-15", target: '_blank'},
                    this.state.sample_work
                ),
                React.createElement(
                    "button",
                    {type:"submit", className:"btn btn-del pull-right btn-size-save works-btn delete_"+this.state.id, title:"Delete"},
                    React.createElement(
                        "span",
                        {className:"fa fa-trash font-15"}
                    )
                ),
                React.createElement(
                    "a",
                    {className:"btn btn-primary pull-right btn-size-save works-btn", onClick:this.showEdit, title:"Edit"},
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
                    {type:"text", className:"form-works", placeholder:"http://www.yourlink.samplework.com", name:"new_work", value: this.state.new_work, onChange: this.handleChange.bind(this, 'new_work'), autoFocus: true , required: "required"}
                ),
                React.createElement(
                    "a",
                    {className:"btn btn-del pull-right btn-size-save remove_btn_work", title:"Cancel"},
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
            );
        }
        else if(this.state.show == 2){
            return React.createElement(
                "form",
                {onSubmit: this.handleSave},
                React.createElement(
                    "input",
                    {type:"text", className:"form-works", placeholder:"http://www.yourlink.samplework.com", value: this.state.sample_work, name:"sample_work", onChange: this.handleChange.bind(this, 'sample_work'), autoFocus: true, required: "required", onKeyDown: this.handleEsc}
                ),
                React.createElement(
                    "a",
                    {className:"btn btn-del pull-right btn-size-save", onClick: this.handleCancel, title:"Cancel"},
                    React.createElement(
                        "span",
                        {className:"fa fa-remove font-15"}
                    )
                ),
                React.createElement(
                    "button",
                    {type:"submit", className: "btn btn-primary pull-right btn-size-save", title:"Save Changes"},
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
			React.createElement(GetSamples)
		)
	}
});

ReactDOM.render(React.createElement(
   "div",
   null,
   React.createElement(Content, null)),
   document.getElementById('sample-works')
);
