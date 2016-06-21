"use strict";

var GetInfo = React.createClass({
    displayName: "GetInfo",
    getInitialState : function() {
       return {
           data: [],
           errorMessage: '',
           showMe: 0
       };
    },
    onClickHandler : function() {
       this.setState({ showMe : 1});
    },
    onClickCancel : function() {
        this.setState({
            fname : this.state.oldfname,
            lname : this.state.oldlname,
            date_of_birth : this.state.olddate_of_birth,
            yr_lvl : this.state.oldyr_lvl,
            contact_no : this.state.oldcontact_no,
            school :this.state.oldschool,
            degree : this.state.olddegree,
            pic_url : this.state.oldpic_url,
            showMe : 0
        });
    },
    loadFile: function(e){
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(e.target.files[0]);
    },
    onClickApprove : function() {
       this.setState({ showMe : 0});
    },
    handleChange(field, e){
        var state = {};
        state[field] = e.target.value;
        this.setState(state);
    },
    handleSchoolChange(e) {
        this.setState({
            schoolid : e
        })
    },
    handleDegreeChange(e) {
        this.setState({
            degreeid : e
        })
    },
    handleKeydown: function(event){
      if(event.keyCode == 27){
              this.setState({
                  fname : this.state.oldfname,
                  lname : this.state.oldlname,
                  date_of_birth : this.state.olddate_of_birth,
                  yr_lvl : this.state.oldyr_lvl,
                  contact_no : this.state.oldcontact_no,
                  school :this.state.oldschool,
                  degree : this.state.olddegree,
                  pic_url : this.state.oldpic_url,
                  showMe : 0
              });
      }
    },
    fetchDataFromServer() {
		$.ajax({
			type: "GET",
			url: this.props.url,
			data: [],
            success: function(response){
                if(response.student.user.image == null || response.student.user.image == '' ){
                    this.setState({
                        fname : response.student.fname,
                        lname : response.student.lname,
                        date_of_birth : response.student.date_of_birth,
                        school : response.student.school.name,
                        schoolid : response.student.school.id,
                        email : response.student.user.email,
                        pic_url : "dist/img/avatar-default.png",

                        oldfname : response.student.fname,
                        oldlname : response.student.lname,
                        olddate_of_birth : response.student.date_of_birth,
                        oldschool : response.student.school.name,
                        oldpic_url : "dist/img/avatar-default.png",
                        oldshowMe : 0
                    });
                }
                else{
                    this.setState({
                        fname : response.student.fname,
                        lname : response.student.lname,
                        date_of_birth : response.student.date_of_birth,
                        school : response.student.school.name,
                        schoolid : response.student.school.id,
                        email : response.student.user.email,
                        pic_url : "/img/profilepics/"+response.student.user.image,

                        oldfname : response.student.fname,
                        oldlname : response.student.lname,
                        olddate_of_birth : response.student.date_of_birth,
                        oldschool : response.student.school.name,
                        oldpic_url : "/img/profilepics/"+response.student.user.image,
                        showMe : 0
                    });
                }
                if(response.student.degree == null || response.student.degree == '' || response.student.degree == undefined){
                    this.setState({
                        degree: '+Add Course',
                        degreeid: '',
                        oldschoolid: '',
                        olddegree: '+Add Course'
                    });
                }
                else{
                    this.setState({
                        degree: response.student.degree.name,
                        degreeid: response.student.degree.id,
                        oldschoolid: response.student.school.id,
                        olddegre: response.student.degree.name
                    });
                }
                if(response.student.contact_no == null || response.student.contact_no == ''){
                    this.setState({
                        contact_no : "+Add Contact",
                        oldcontact_no : "+Add Contact",
                    });
                }
                else{
                    this.setState({
                        contact_no : response.student.contact_no,
                        oldcontact_no : response.student.contact_no,
                    });
                }
                if(response.student.yr_lvl == null || response.student.yr_lvl == '' || response.student.yr_lvl == 0){
                    this.setState({
                        yr_lvl : "+Add Year Level",
                        oldyr_lvl : "+Add Year Level",
                    });
                }
                else{
                    this.setState({
                        yr_lvl : response.student.yr_lvl,
                        oldyr_lvl : response.student.yr_lvl,
                    });
                }
            }.bind(this)
		});
	},
    componentDidMount() {
        $.get("/api/v1/schools", function(resultSchools) {
            this.setState({
                dataSchools: resultSchools,
            });
        }.bind(this));

        $.get("/api/v1/degrees", function(resultDegrees) {
            this.setState({
                dataDegrees: resultDegrees,
            });
        }.bind(this));

		this.fetchDataFromServer();
    },
    handleSubmit(e) {
		e.preventDefault();
        var file = e.target[0].files;
        var formData = new FormData();

        formData.append('file', file[0]);
        formData.append('fname', this.state.fname);
        formData.append('lname', this.state.lname);
        formData.append('school_id', this.state.schoolid);
        formData.append('degree_id', this.state.degreeid);
        formData.append('yr_lvl', this.state.yr_lvl);
        formData.append('contact_no', this.state.contact_no);
        formData.append('date_of_birth', this.state.date_of_birth);

		this.sendToServer(formData);
		return;
	},
    sendToServer(formData) {
        $.ajax({
            type: "POST",
            url: this.props.url,
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
                $(".btn-save-profile").html('<i class="fa fa-refresh fa-spin"></i> Saving...');
            },
            success: function(data) {
                if (data.success == false) {
                    alert("error", data.message);
                    return false;
                } else {
                    if(data.file == '' || data.file == null){
                        this.setState({
                            pic_url : "dist/img/avatar-default.png",
                            school: data.school,
                            degree: data.degree,
                            oldfname : this.state.fname,
                            oldlname : this.state.lname,
                            olddate_of_birth : this.state.date_of_birth,
                            oldyr_lvl : this.state.yr_lvl,
                            oldcontact_no : this.state.contact_no,
                            oldschool : data.school,
                            olddegree : data.degree,
                            oldpic_url : "dist/img/avatar-default.png",
                            showMe: 0
                        });
                    }
                    else{
                        this.setState({
                            pic_url : "/img/profilepics/"+data.file,
                            school: data.school,
                            degree: data.degree,
                            oldfname : this.state.fname,
                            oldlname : this.state.lname,
                            olddate_of_birth : this.state.date_of_birth,
                            oldyr_lvl : this.state.yr_lvl,
                            oldcontact_no : this.state.contact_no,
                            oldschool : data.school,
                            olddegree : data.degree,
                            oldpic_url : "/img/profilepics/"+data.file,
                            showMe: 0
                        });
                    }
                }
            }.bind(this)
        });
    },
    // handleSubmit(e) {
	// 	e.preventDefault();
    //
    //
	// 	if (!this.state.studentF.trim()) {
	// 		this.setState({errorMessage: "Please enter your username or email."});
	// 		return;
	// 	}
    //
	// 	if (!this.state.studentL.trim()) {
	// 		this.setState({errorMessage: "Please enter your password."});
	// 		return;
	// 	}
    //
	// 	this.sendToServer();
	// 	return;
	// },
	// sendToServer() {
	// 	$.ajax({
	// 		type: "GET",
	// 		url: this.props.url,
	// 		data: [],
    //         success: function(response) {
	// 			location.reload();
	// 		},
	// 	});
	// },
    render : function() {
        if(this.state.showMe == 0){
            return React.createElement(
                "div",
                {className: "row hover-btn name"},
                React.createElement(
                    "div",
                    {className: "col-md-4"},
                    React.createElement(
                    "div",
                    {className:"hover-btn"},
                          React.createElement(
                              "img",
                              {src:this.state.pic_url, className: "img-responsive thumbnail", id:"output", onMouseEnter: this.onMouseEnterHandler,}
                          ),
                          React.createElement(
                                 "div",
                                 null,
                                 React.createElement(
                                     "button",
                                     {type:"file",
                                     onClick: this.onClickHandler,
                                     onKeyDown: this.handleKeydown,
                                     className:"image file-upload inputfile inputfile-1",
                                     name:"file",
                                     id:"file-1"}
                                 ),
                                 React.createElement(
                                     "label",
                                     {
                                       className:"fa fa-camera icon-prof",
                                       htmlFor: "file-1"
                                     },
                                   React.createElement("div",{className:"label-prof"}, "Change photo")
                                )
                          )
                     )
                ),
                // React.createElement(
                //     "a",
                //     {href:"#", "data-toggle":"modal", "data-target":"#model-show"},
                //     React.createElement(
                //         "i",
                //         {className:"fa fa-print pull-right", title:"Print as resume"},
                //         "Print Resume"
                //     ),
                //     React.createElement(
                //       "div",
                //       { className: 'modal', id: 'model-show', role: 'dialog', 'aria-hidden': 'true', 'aria-labelledby': 'myModalLabel', 'tabIndex': '' },
                //       React.createElement(
                //         "div",
                //         { className: 'box-print modal-dialog box box-info' },
                //         React.createElement(
                //           "div",
                //           { className: 'modal-content' },
                //           React.createElement(
                //             "div",
                //             { className: 'modal-header' },
                //             React.createElement(
                //               "a",
                //               { type: 'button', className: 'close', 'data-dismiss': 'modal', 'data-target': '#model-show' },
                //               React.createElement('i', { className: 'fa fa-close' })
                //             ),
                //             React.createElement(
                //               "h3",
                //               { className: 'modal-h' },
                //               React.createElement(
                //                 'center',
                //                 null,
                //                 'Choose Resume Template'
                //               )
                //             )
                //           ),
                //           React.createElement(
                //             "div",
                //             { className: 'modal-body' },
                //             React.createElement(
                //               "div",
                //               { className: 'row' },
                //               React.createElement(
                //                 "div",
                //                 { className: 'col-md-4' },
                //                 React.createElement("a", { href: '{{ URL::route(\'users.print\', $student->user->id) }}', className: 'print-temp1', target: '_blank' })
                //               ),
                //               React.createElement(
                //                 "div",
                //                 { className: 'col-md-4' },
                //                 React.createElement("a", { href: '{{ URL::route(\'users.print2\', $student->user->id) }}', className: 'print-temp2', target: '_blank' })
                //               ),
                //               React.createElement(
                //                 "div",
                //                 { className: 'col-md-4' },
                //                 React.createElement("a", { href: '{{ URL::route(\'users.print3\', $student->user->id) }}', className: 'print-temp3', target: '_blank' })
                //               )
                //             )
                //           )
                //         )
                //       )
                //     )
                // ),
                React.createElement(
                    "div",
                    {className: "col-md-8"},
                    React.createElement(
                        "h3",
                        {className:"marg-top-h3"},
                        React.createElement(
                            "div",
                            {className:"name", onClick: this.onClickHandler},
                            React.createElement(
                                "a",
                                {className:"marg-right-Fname"},
                                this.state.fname
                            ),
                            React.createElement(
                                "a",
                                null,
                                this.state.lname
                            ),
                            React.createElement(
                                "span",
                                 {className:"fa fa-pencil icon-edit hidden-logo", onClick: this.onClickHandler}
                            )
                        )
                    ),
                     React.createElement(
                     "div",
                     {className:"row"},
                        React.createElement(
                            "div",
                            {className:"col-md-12 col-marg name"},
                            React.createElement(
                                "strong",
                                {className:"label-personal"},
                                "School"
                            ),
                            React.createElement(
                                "div",
                                {className:"name", onClick: this.onClickHandler},
                                React.createElement(
                                    "a",
                                    null,
                                    this.state.school
                                ),
                                React.createElement(
                                    "span",
                                     {className:"fa fa-pencil icon-edit hidden-logo", onClick: this.onClickHandler}
                                )
                            )
                        )
                    ),
                    React.createElement(
                    "div",
                    {className:"row"},
                       React.createElement(
                           "div",
                           {className:"col-md-7 col-marg-degree name"},
                           React.createElement(
                               "strong",
                               {className:"label-personal"},
                               "Course"
                           ),
                           React.createElement(
                               "div",
                               {className:"name", onClick: this.onClickHandler},
                               React.createElement(
                                   "a",
                                   null,
                                   this.state.degree
                               ),
                               React.createElement(
                                   "span",
                                    {className:"fa fa-pencil icon-edit hidden-logo", onClick: this.onClickHandler}
                               )
                           )
                       ),
                       React.createElement(
                           "div",
                           {className:"col-md-5 col-marg name"},
                           React.createElement(
                               "strong",
                               {className:"label-personal"},
                               "Year"
                           ),
                           React.createElement(
                               "div",
                               {className:"name", onClick: this.onClickHandler},
                               React.createElement(
                                   "a",
                                   null,
                                   this.state.yr_lvl
                               ),
                               React.createElement(
                                   "span",
                                    {className:"fa fa-pencil icon-edit hidden-logo", onClick: this.onClickHandler}
                               )
                           )
                       )
                   ),
                   React.createElement(
                   "div",
                   {className:"row"},
                       React.createElement(
                           "div",
                           {className:"col-md-7 col-marg name"},
                           React.createElement(
                               "strong",
                               {className:"label-personal"},
                               "Birthdate"
                           ),
                           React.createElement(
                               "div",
                               {className:"name", onClick: this.onClickHandler},
                               React.createElement(
                                   "a",
                                   null,
                                   moment(this.state.date_of_birth).format("LL")
                               ),
                               React.createElement(
                                   "span",
                                    {className:"fa fa-pencil icon-edit hidden-logo", onClick: this.onClickHandler}
                               )
                           )
                       ),
                      React.createElement(
                          "div",
                          {className:"col-md-5 col-marg name"},
                          React.createElement(
                              "strong",
                              {className:"label-personal"},
                              "Contact Number"
                          ),
                          React.createElement(
                              "div",
                              {className:"name", onClick: this.onClickHandler},
                              React.createElement(
                                  "a",
                                  null,
                                  this.state.contact_no
                              ),
                              React.createElement(
                                  "span",
                                   {className:"fa fa-pencil icon-edit hidden-logo", onClick: this.onClickHandler}
                              )
                          )
                      )
                  ),
                  React.createElement(
                  "div",
                  {className:"row"},
                      React.createElement(
                          "div",
                          {className:"col-md-6 col-marg"},
                          React.createElement(
                              "strong",
                              {className:"label-personal"},
                              "Email"
                          ),
                          React.createElement(
                              "div",
                              {className:"text-muted"},
                              this.state.email
                          )
                      )
                 )
                //  React.createElement(
                //      "Div",
                //      {className:"pull-right"},
                //      "No Button"
                //  )
            )
         );
        }
        else{
            return React.createElement(
                "form",
                {className: "row form-marg", onSubmit: this.handleSubmit, encType: "multipart/form-data"},
                React.createElement(
                    "div",
                    {className: "col-md-4"},
                    React.createElement(
                        "div",
                        {className:"hover-btn"},
                          React.createElement(
                              "img",
                              {src:this.state.pic_url, className:"img-responsive thumbnail", id:"output", onMouseEnter: this.onMouseEnterHandler}
                          ),
                          React.createElement(
                                 "div",
                                 null,
                                 React.createElement(
                                     "input",
                                     {type:"file",
                                     onChange: this.loadFile,
                                     onKeyDown: this.handleKeydown,
                                     className:"image file-upload inputfile inputfile-1",
                                     name: "file",
                                     id:"file-1"}
                                 ),
                                 React.createElement(
                                     "label",
                                     {
                                       className:"fa fa-download icon-prof2",
                                       htmlFor: "file-1"
                                     },
                                   React.createElement("div",{className:"label-prof"}, "Upload Photo")
                                )
                          )
                     )
                ),
                // React.createElement(
                //     "a",
                //     {href:"#", "data-toggle":"modal", "data-target":"#model-show"},
                //     React.createElement(
                //         "i",
                //         {className:"fa fa-print pull-right", title:"Print as resume"},
                //         "Print Resume"
                //     ),
                //     React.createElement(
                //       "div",
                //       { className: 'modal', id: 'model-show', role: 'dialog', 'aria-hidden': 'true', 'aria-labelledby': 'myModalLabel', 'tabIndex': '' },
                //       React.createElement(
                //         "div",
                //         { className: 'box-print modal-dialog box box-info' },
                //         React.createElement(
                //           "div",
                //           { className: 'modal-content' },
                //           React.createElement(
                //             "div",
                //             { className: 'modal-header' },
                //             React.createElement(
                //               "a",
                //               { type: 'button', className: 'close', 'data-dismiss': 'modal', 'data-target': '#model-show' },
                //               React.createElement('i', { className: 'fa fa-close' })
                //             ),
                //             React.createElement(
                //               "h3",
                //               { className: 'modal-h' },
                //               React.createElement(
                //                 'center',
                //                 null,
                //                 'Choose Resume Template'
                //               )
                //             )
                //           ),
                //           React.createElement(
                //             "div",
                //             { className: 'modal-body' },
                //             React.createElement(
                //               "div",
                //               { className: 'row' },
                //               React.createElement(
                //                 "div",
                //                 { className: 'col-md-4' },
                //                 React.createElement("a", { href: '{{ URL::route(\'users.print\', $student->user->id) }}', className: 'print-temp1', target: '_blank' })
                //               ),
                //               React.createElement(
                //                 "div",
                //                 { className: 'col-md-4' },
                //                 React.createElement("a", { href: '{{ URL::route(\'users.print2\', $student->user->id) }}', className: 'print-temp2', target: '_blank' })
                //               ),
                //               React.createElement(
                //                 "div",
                //                 { className: 'col-md-4' },
                //                 React.createElement("a", { href: '{{ URL::route(\'users.print3\', $student->user->id) }}', className: 'print-temp3', target: '_blank' })
                //               )
                //             )
                //           )
                //         )
                //       )
                //     )
                // ),
                React.createElement(
                    "div",
                    {className: "col-md-8 margin-infos"},
                    React.createElement(
                        "h3",
                        {className:"marg-top-h3"},
                        React.createElement(
                            "div",
                            {className:"row name", onClick: this.onClickHandler},
                            React.createElement(
                                "input",
                                {
                                type:"text", className:"col-md-6 form-control form-name1", name: this.state.fname,
                                value:this.state.fname, onChange: this.handleChange.bind(this, 'fname'),
                                onKeyDown: this.handleKeydown, placeholder: "First Name"
                                }
                            ),
                            React.createElement(
                                "input",
                                {
                                type:"text", className:"col-md-6 form-control form-name", name: this.state.lname,
                                value:this.state.lname, onChange: this.handleChange.bind(this, 'lname'),
                                onKeyDown: this.handleKeydown, placeholder: "Last Name"
                                }
                            )
                        )
                    ),
                     React.createElement(
                     "div",
                     {className:"row"},
                        React.createElement(
                            "div",
                            {className:"col-md-12 col-marg name"},
                            React.createElement(
                                "label",
                                {className:"label-personal"},
                                "School"
                            ),
                            React.createElement(
                                SchoolSelect,
                                {data: this.state.dataSchools, schoolid: this.state.schoolid, updateSchool: this.handleSchoolChange}
                            )
                        )
                    ),
                    React.createElement(
                    "div",
                    {className:"row"},
                       React.createElement(
                           "div",
                           {className:"col-md-10 col-marg name"},
                           React.createElement(
                               "label",
                               {className:"label-personal"},
                               "Course"
                           ),
                           React.createElement(
                               DegreeSelect,
                               {data: this.state.dataDegrees, degreeid: this.state.degreeid, updateDegree: this.handleDegreeChange}
                           )
                       ),
                       React.createElement(
                           "div",
                           {className:"col-md-2 col-marg name margin-col-yr"},
                           React.createElement(
                               "label",
                               {className:"label-personal", htmlFor:"yr_lvl"},
                               "Year"
                           ),
                           React.createElement(
                               "div",
                               {className:"name", onClick: this.onClickHandler},
                               React.createElement(
                                   "input",
                                   {
                                   className:"con-number form-control yr-width", type:"number",
                                   value:this.state.yr_lvl, onChange: this.handleChange.bind(this, 'yr_lvl'),
                                   onKeyDown: this.handleKeydown, name: this.state.yr_lvl, "min": "1", "max":"10",
                                   id:"yr_lvl", required:"required"
                                   }
                               )
                           )
                       )
                   ),
                   React.createElement(
                   "div",
                   {className:"row"},
                      React.createElement(
                          "div",
                          {className:"col-md-6 col-marg name"},
                          React.createElement(
                              "label",
                              {className:"label-personal", htmlFor:"dob"},
                              "Birthdate"
                          ),
                          React.createElement(
                              "div",
                              {className:"name", onClick: this.onClickHandler},
                              React.createElement(
                                  "input",
                                  {
                                  className:"form-control",
                                  value:this.state.date_of_birth, onChange: this.handleChange.bind(this, 'date_of_birth'),
                                  onKeyDown: this.handleKeydown, name: this.state.date_of_birth, type: "date", id:"dob"
                                  }
                              )
                          )
                      ),
                      React.createElement(
                          "div",
                          {className:"col-md-6 col-marg name"},
                          React.createElement(
                              "label",
                              {className:"label-personal", htmlFor:"contact"},
                              "Contact Number"
                          ),
                          React.createElement(
                              "div",
                              {className:"name", onClick: this.onClickHandler},
                              React.createElement(
                                  "input",
                                  {
                                  className:"form-control con-number", type:"text", "minLength":"6", "maxLength":"15",
                                  "pattern":"[0-9+]\\d*", placeholder: "Contact Number",
                                  value:this.state.contact_no, onChange: this.handleChange.bind(this, 'contact_no'),
                                  onKeyDown: this.handleKeydown, name: this.state.contact_no, id:"contact"
                                  }
                              )
                          )
                      )
                  ),
                 React.createElement(
                    "div",
                    {className:"row"},
                    React.createElement(
                        "div",
                        {className:"col-md-6 col-marg"},
                        React.createElement(
                            "strong",
                            {className:"label-personal"},
                            "Email"
                        ),
                        React.createElement(
                            "div",
                            {className:"text-muted"},
                            this.state.email
                        )
                    )
                  ),
                 React.createElement(
                     "div",
                     null,
                     React.createElement(
                         "a",
                         {href:"#", className:"btn btn-cancel btn-canc pull-right btn-size-prof", onClick: this.onClickCancel},
                         "Cancel"
                     ),
                     React.createElement(
                         "button",
                         {type:"submit",
                         className:"btn btn-primary pull-right btn-size-prof btn-save-profile"},
                         "Save Changes"
                     )
                 )
            )
         );
        }
    }
});



var SchoolSelect = React.createClass({
    displayName: "SchoolSelect",
    getInitialState: function(){
        return {
            schoolid: this.props.schoolid
        };
    },
    componentDidMount: function(){
        $('.school').select2({
          placeholder: 'Select your school',
        });

        $('.school').on("change", this.handleChange);
    },
    handleChange(e) {
        this.setState({
            schoolid : e.target.value
        })
        this.props.updateSchool(e.target.value);
    },
    render: function render() {
        var schoolOpt = function schoolOpt(result) {
            return React.createElement(SchoolOptions,
                {key: result.id,
                data: result
            });
        };
        return React.createElement(
            "select",
            {
            className:"form-control school",
            defaultValue: this.props.schoolid
            },
            this.props.data.map(schoolOpt)
        );
    }
});

var SchoolOptions = React.createClass({
    displayName: "SchoolOptions",

    render: function render() {
        return React.createElement(
            "option",
            {
               value: this.props.data.id
            },
            this.props.data.name
        )
    }
});

var DegreeSelect = React.createClass({
    displayName: "DegreeSelect",
    getInitialState: function(){
        return {
            degreeid: this.props.degreeid
        };
    },
    componentDidMount: function(){
        $('.degree').select2({
          placeholder: 'Select your course'
        });

        $('.degree').on("change", this.handleChange);
    },
    handleChange(e) {
        this.setState({
            degreeid : e.target.value
        })

        this.props.updateDegree(e.target.value);
    },
    render: function render() {
        var degreeOpt = function degreeOpt(result) {
            return React.createElement(DegreeOptions,
                {key: result.id,
                data: result
            });
        };
        return React.createElement(
            "select",
            {
            className:"form-control degree-width degree",
            defaultValue: this.props.degreeid
            },
            this.props.data.map(degreeOpt)
        );
    }
});

var DegreeOptions = React.createClass({
    displayName: "DegreeOptions",

    render: function render() {
        return React.createElement(
            "option",
            {
               value: this.props.data.id
            },
            this.props.data.name
        )
    }
});

var Content = React.createClass({
	render() {
		return React.createElement(
            "div",
			null,
			React.createElement(GetInfo, {url: "/api/v1/students/"+window.studid})
		)
	}
});

ReactDOM.render(React.createElement(
   "div",
   null,
   React.createElement(Content, null)),
   document.getElementById('personal-info')
);
