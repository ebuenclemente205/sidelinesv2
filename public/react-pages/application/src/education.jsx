var React = require('react');
var Select2 = require('react-select2-wrapper');
var id = window.userid;

module.exports = React.createClass({
    getInitialState: function(){
        return {
            education: [],
            school: "",
            degree: "",
            attainment: "College",
            schoolStart: "",
            schoolEnd: ""
        };
    },
    componentWillMount: function() {
        this.fetchEducation();
    },
    fetchEducation: function() {
        $.ajax({
			type: "GET",
			url: "/api/v1/educations/student/"+id,
			error: function(){
				this.fetchEducation();
				return;
			}.bind(this),
			success: function(response){
				this.setState({
					education: response
				});
			}.bind(this)
		});

        this.setState({
            error_schoolid_edu: "",
            error_degreeid_edu: "",
            error_schoolstart: "",
            error_schoolend: "",
            error_attainment: "",
        });
    },
    defaultAttainment: function(){
        $("#College").addClass('active');
        $("#Highschool").removeClass('active');
        $("#Elementary").removeClass('active');
        $('#showDegree').slideDown('fast');
    },
    handleChange(field, e){
        var state = {};
        state[field] = e.target.value;
        this.setState(state);
    },
    handleSchool: function(e){
        this.setState({
          school: e
        });
    },
    handleDegree: function(e){
        this.setState({
          degree: e
        });
    },
    showEducationModal: function() {
        $("#educationModal").modal('show');
        $("#select2-schoolz-container").html('<font color="#a599a5">Select School</font>').trigger('click');
        $("#select2-degreez-container").html('<font color="#a599a5">Select Course</font>');
        $('#schoolStartz').removeClass('parsley-error');
        $('#schoolEndz').removeClass('parsley-error');
        $('#schoolStartz').val('');
        $('#schoolEndz').val('');
        $('#schoolz').val('');
        $('#degreez').val('');
        this.setState({
            error_schoolid_edu: "",
            error_degreeid_edu: "",
            error_schoolstart: "",
            error_schoolend: "",
            error_attainment: "",
            'school': "",
            'degree': "",
            'edu_start': "",
            'edu_end': "",
            'attainment': "College"
        });
        this.defaultAttainment();
    },
    handleCollege: function() {
        $('#showDegree').slideDown('fast');
        this.setState({
            attainment: "College"
        });
    },
    handleHighschool: function() {
        $('#showDegree').slideUp('fast');
        this.setState({
            attainment: "Highschool"
        });
    },
    handleElementary: function() {
        $('#showDegree').slideUp('fast');
        this.setState({
            attainment: "Elementary"
        });
    },
    handleSubmit: function(e){
        e.preventDefault();
        var educationData = new FormData();

        educationData.append('school_id', this.state.school);
        educationData.append('degree_id', this.state.degree);
        educationData.append('edu_start', this.state.schoolStart);
        educationData.append('edu_end', this.state.schoolEnd);
        educationData.append('educational_attainment', this.state.attainment);

        this.sendEducationServer(educationData);
        return;
    },
    sendEducationServer(educationData){
        $.ajax({
            type: "POST",
            url: "/api/v1/educations/student/"+id,
            data: educationData,
            processData: false,
            contentType: false,
            error: function(jqXhr, json, errorThrown) {
                if(jqXhr.status === 422) {
                   //status means that this is a validation error, now we need to get messages from JSON
                   var errors = jqXhr.responseJSON;
                   var schoolIdMessage = errors['school_id'];
                   var degreeIdMessage = errors['degree_id'];
                   var eduStartMessage = errors['edu_start'];
                   var attainmentMessage = errors['educational_attainment'];

                   if("edu_end" in errors ){
                       var eduEndMessage = errors['edu_end'][0];
                   }
                   else{
                       var eduEndMessage = errors['edu_end'];
                   }

                   this.setState({
                       error_schoolid_edu: schoolIdMessage,
                       error_degreeid_edu: degreeIdMessage,
                       error_schoolstart: eduStartMessage,
                       error_schoolend: eduEndMessage,
                       error_attainment: attainmentMessage,
                       submitted: false,
                   });

                   if("edu_start" in errors || "edu_end" in errors) {
                       $('#schoolStartz').addClass('parsley-error').focus();
                       $('#schoolEndz').addClass('parsley-error');
                   } else {
                       $('#schoolStartz').removeClass('parsley-error');
                       $('#schoolEndz').removeClass('parsley-error');
                   }
                }
                $(".btn-add-education").html('<b>Add</b>');
            }.bind(this),
            beforeSend: function() {
                $(".btn-add-education").html('<b>Saving </b><i class="fa fa-circle-o-notch fa-spin"></i>');
            },
            success: function(data) {
                $(".btn-add-education").html('<b>Add</b>');
                $("#educationModal").modal('hide');
                $("#educationModal").on('hidden.bs.modal', function(){
                    $(this).find('form')[0].reset();
                });

                this.setState({
                    error_schoolid_edu: "",
                    error_degreeid_edu: "",
                    error_schoolstart: "",
                    error_schoolend: "",
                    error_attainment: "",
                    school: "",
                    degree: "",
                    edu_start: "",
                    edu_end: "",
                    attainment: "College"
                });
                this.fetchEducation();
                console.log(data);
            }.bind(this)
        });
    },
    render: function () {
        var fetchEducation = this.fetchEducation;
        var education = this.state.education;
        var studentEducation = function(education) {
            if(education.degree == null) {
                degreeName = "";
            } else {
                degreeName = education.degree.name;
            }

            return (
                <StudentEducation key={education.id} education={education} id={education.id} schoolName={education.school.name} degreeName={degreeName} fetchEducation={fetchEducation}/>
            );
         };
        return (
        <div>
            <div className="x_panel" id="education-tip">
                <div className="x_content">
                    <div className="" role="tabpanel" data-example-id="togglable-tabs">
                      <ul id="myTab" className="nav nav-tabs bar_made" role="tablist">
                          <h2 className="profile-h2"><span className="fa fa-book"></span> Education </h2>
                      </ul>
                      <div className="row">

                          { this.state.education.map(studentEducation)}

                          <div className="col-md-4 col-sm-4 col-xs-12">
                              <div className="well-education-profile profile_view add_box_profile" onClick={this.showEducationModal}>
                                  <img src="/dist/img/plus.png" className="center-margin img-responsive add_profile_image" />
                                  <div className="title_center col-xs-12 margin_top">
                                      <h4 className="font-18 gray2"> Add Education </h4>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>
                </div>
            </div>
            <div id="educationModal" className="modal fade" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <form className="modal-content form" onSubmit={this.handleSubmit}>
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4>Add Education</h4>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="form col-md-12 form-horizontal form-label-left">
                                    <div className="row">
                                        <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14" >Name of School *</label>
                                        <div className="form_education col-md-8 col-sm-8 col-xs-12">
                                            <SchoolSelect updateSchool={this.handleSchool} />
                                            <ul className="parsley-errors-list">
                                                <li className="parsley-required">{this.state.error_schoolid_edu}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14">Educational Attainment *</label>
                                        <div className="form_education btn-group col-md-8 col-sm-8 col-xs-12" id="gender" data-toggle="buttons">
                                            <label className="btn btn-edu btn-default active" data-toggle-class="btn-primary" data-toggle-passive-class="btn-default" onClick={this.handleCollege} id="College">
                                                <input type="radio" data-parsley-multiple="attainment" /> College
                                            </label>
                                            <label className="btn btn-edu btn-default" data-toggle-class="btn-primary" data-toggle-passive-class="btn-default" onClick={this.handleHighschool} id="Highschool">
                                                <input type="radio" data-parsley-multiple="attainment" /> Highschool
                                            </label>
                                            <label className="btn btn-edu btn-default" data-toggle-class="btn-primary" data-toggle-passive-class="btn-default" onClick={this.handleElementary} id="Elementary">
                                                <input type="radio" data-parsley-multiple="attainment" /> Elementary
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row" id="showDegree">
                                        <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14">Course *</label>
                                        <div className="form_education col-md-8 col-sm-8 col-xs-12">
                                            <DegreeSelect updateDegree={this.handleDegree} />
                                            <ul className="parsley-errors-list">
                                                <li className="parsley-required">{this.state.error_degreeid_edu}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14"> Year Attended *</label>
                                        <div className="form_education col-md-3 col-sm-3 col-xs-12 form-group has-feedback">
                                            <input type="year" className="date-picker form-control" onChange={this.handleChange.bind(this, 'schoolStart')} defaultValue="" placeholder="Year Start" id="schoolStartz" pattern="[1-9][0-9]*|0" minLength="4" maxLength="4" required="required" />
                                            <span className="fa fa-calendar form-control-feedback"></span>
                                        </div>
                                        <label className="to col-md-1 col-sm-1 col-xs-12 control-label font-14">
                                            to
                                        </label>
                                        <div className="form_education col-md-3 col-sm-3 col-xs-12 form-group has-feedback">
                                            <input type="year" className="date-picker form-control" onChange={this.handleChange.bind(this, 'schoolEnd')} defaultValue="" placeholder="Year End" id="schoolEndz" pattern="[1-9][0-9]*|0" minLength="4" maxLength="4" required="required" />
                                            <span className="fa fa-calendar form-control-feedback"></span>
                                        </div>
                                        <div className="error-year-attended">
                                            <ul className="parsley-errors-list error-year-attended col-md-offset-4 col-sm-8 col-xs-12">
                                                <li className="parsley-required">
                                                    {this.state.error_schoolend}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="x_footer x_modal_foot">
                                <div className="form-group has-feedback">
                                    <a className="btn btn-warning btn-sm pull-left" data-dismiss="modal" aria-hidden="true">Cancel</a>
                                    <button type="submit" className="btn btn-primary btn-sm save-personal pull-right">Add</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        );
    }
});

var StudentEducation = React.createClass({
    getInitialState: function(){
        return {
          schoolName: this.props.schoolName,
          degreeName: this.props.degreeName,
          edu_start: this.props.education.edu_start,
          edu_end: this.props.education.edu_end,
          attainment: this.props.education.educational_attainment
        };
    },
    showEdit: function() {
        $("#editEducationModal"+this.props.id).modal('show');
        this.checkAttainment(this.props.education.educational_attainment);
        this.setState({
          edu_start: this.props.education.edu_start,
          edu_end: this.props.education.edu_end,
          schoolName: this.props.schoolName,
          degreeName: this.props.degreeName
        });
    },
    componentDidMount: function(){
        this.checkAttainment(this.props.education.educational_attainment);
        $("#editEducationModal"+this.props.education.id).on('hidden.bs.modal', function(){
           $('#schoolStart'+this.props.id).removeClass('parsley-error');
           $('#schoolEnd'+this.props.id).removeClass('parsley-error');
           this.setState({
            error_schoolid_edu: "",
            error_degreeid_edu: "",
            error_schoolStart: "",
            error_schoolEnd: "",
            error_attainment: ""
           });
        }.bind(this));
    },
    checkAttainment(attainment){
        if(attainment == "College"){
            $("#"+attainment+this.props.id).addClass('active');
            $("#Highschool"+this.props.id).removeClass('active');
            $("#Elementary"+this.props.id).removeClass('active');
        }
        if(attainment == "Highschool"){
            $("#"+attainment+this.props.id).addClass('active');
            $("#College"+this.props.id).removeClass('active');
            $("#Elementary"+this.props.id).removeClass('active');
            $('#showDegree'+this.props.id).slideUp('fast');
        }
        if(attainment == "Elementary"){
            $("#"+attainment+this.props.id).addClass('active');
            $("#Highschool"+this.props.id).removeClass('active');
            $("#College"+this.props.id).removeClass('active');
            $('#showDegree'+this.props.id).slideUp('fast');
        }
    },
    handleCollege: function() {
        $('#showDegree'+this.props.id).slideDown('fast');
        this.setState({
            attainment: "College"
        });
    },
    handleHighschool: function() {
        $('#showDegree'+this.props.id).slideUp('fast');
        this.setState({
            attainment: "Highschool"
        });
    },
    handleElementary: function() {
        $('#showDegree'+this.props.id).slideUp('fast');
        this.setState({
            attainment: "Elementary"
        });
    },
    handleChange(field, e){
        var state = {};
        state[field] = e.target.value;
        this.setState(state);
    },
    handleSchool: function(e){
        this.setState({
          schoolName: e
        });
    },
    handleDegree: function(e){
        this.setState({
          degreeName: e
        });
    },
    handleSave(e) {
        e.preventDefault();
        var id = this.props.id;
        var saveData = new FormData();

        if(this.state.attainment == "Highschool" || this.state.attainment == "Elementary"){
            saveData.append('degree_id', "");
        }else{
            saveData.append('degree_id', this.state.degreeName);
        }

        saveData.append('edu_start', this.state.edu_start);
        saveData.append('edu_end', this.state.edu_end);
        saveData.append('educational_attainment', this.state.attainment);
        saveData.append('school_id', this.state.schoolName);

        this.saveToServer(id, saveData);
        return;
    },
    saveToServer(id, saveData) {
        $.ajax({
            type: "POST",
            url: "/api/v1/educations/student/"+id+"/edit",
            data: saveData,
            processData: false,
            contentType: false,
            error: function(jqXhr, json, errorThrown) {
                if(jqXhr.status === 422) {
                   //status means that this is a validation error, now we need to get messages from JSON
                   var errors = jqXhr.responseJSON;
                   var schoolIdMessage = errors['school_id'];
                   var degreeIdMessage = errors['degree_id'];
                   var eduStartMessage = errors['edu_start'];
                   var attainmentMessage = errors['educational_attainment'];

                   if("edu_end" in errors ){
                       var eduEndMessage = errors['edu_end'][0];
                   }
                   else{
                       var eduEndMessage = errors['edu_end'];
                   }

                   console.log(errors);

                   this.setState({
                       error_schoolid_edu: schoolIdMessage,
                       error_degreeid_edu: degreeIdMessage,
                       error_schoolstart: eduStartMessage,
                       error_schoolEnd: eduEndMessage,
                       error_attainment: attainmentMessage,
                       submitted: false,
                   });

                   if("edu_start" in errors || "edu_end" in errors) {
                       $('#schoolStart'+this.props.id).addClass('parsley-error').focus();
                       $('#schoolEnd'+this.props.id).addClass('parsley-error');
                   } else {
                       $('#schoolStart'+this.props.id).removeClass('parsley-error');
                       $('#schoolEnd'+this.props.id).removeClass('parsley-error');
                   }
                }
                $(".btn-edit-education").html('<b>Save Changes</b>');

            }.bind(this),
            beforeSend: function(){
                $(".btn-edit-education").html('<b>Saving </b><i class="fa fa-circle-o-notch fa-spin"></i>');
            },
            success: function(data) {
                $(".btn-edit-education").html('<b>Save Changes</b>');
                this.props.fetchEducation();
                $("#editEducationModal"+this.props.id).modal('hide');
                $('#schoolStart'+this.props.id).removeClass('parsley-error');
                $('#schoolEnd'+this.props.id).removeClass('parsley-error');
            }.bind(this)
        });
    },
    confirmDelete(e) {
        e.preventDefault();
        $("#deleteModal"+this.props.id).modal('show');
    },
    deleteEducation(){
        var id = this.props.id;
        this.deleteToServer(id);
    },
    deleteToServer(id) {
        $.ajax({
            type: "DELETE",
            url: "/api/v1/educations/delete/"+id,
            data: {
                id: this.state.education_id
            },
            beforeSend: function(){
                $(".btn-delete-education").html('<b>Deleting </b><i class="fa fa-circle-o-notch fa-spin"></i>');
            },
            success: function(data) {
                $(".btn-delete-education").html('<b>Delete</b>');
                $("#deleteModal"+this.props.id).modal('hide');
                $(".delete_"+this.props.id).parent('div').fadeOut();
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="col-md-4 col-sm-4 col-xs-12">
                <div className={"well profile_view school_info_profile delete_"+this.props.id}>
                    <ul className="nav navbar-right panel_toolbox edit_delete">
                        <li>
                            <a role="button" data-tooltip="Edit Education" onClick={this.showEdit}>
                                <i className="fa fa-pencil font-large"></i>
                            </a>
                        </li>
                        <li>
                            <a role="button" data-tooltip="Delete Education" onClick={this.confirmDelete}>
                                <i className="fa fa-trash font-large"></i>
                            </a>
                        </li>
                    </ul>

                    <img src="/dist/img/avatar-default-school.png" alt="School Image" className="brief center-margin img-responsive school_image" />

                    <div className="title_center col-xs-12 margin_top">
                        <h2 className="font-18"> {this.props.schoolName} </h2>
                        <p className="no_margin_bottom margin_top">
                            <strong> {this.props.degreeName}</strong>
                        </p>
                        <ul className="list-unstyled">
                            <li> {this.props.education.edu_start} - {this.props.education.edu_end}</li>
                            <li> {this.props.education.educational_attainment} </li>
                        </ul>
                    </div>
                </div>
                <div id={"editEducationModal"+this.props.id} className="modal fade" role="dialog" aria-hidden="true">
                    <div className="modal-dialog">
                        <form className="modal-content form" onSubmit={this.handleSave}>
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h4>Add Education</h4>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="form col-md-12 form-horizontal form-label-left">
                                        <div className="row">
                                            <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14" >Name of School *</label>
                                            <div className="form_education col-md-8 col-sm-8 col-xs-12">
                                                <SchoolSelectEdit updateSchool={this.handleSchool} schoolName={this.state.schoolName}/>
                                                <ul className="parsley-errors-list">
                                                    <li className="parsley-required">{this.state.error_schoolid_edu}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14">Educational Attainment *</label>
                                            <div className="form_education btn-group col-md-8 col-sm-8 col-xs-12" id="gender" data-toggle="buttons">
                                                <label className="btn btn-edu btn-default" data-toggle-class="btn-primary" data-toggle-passive-class="btn-default" onClick={this.handleCollege} id={"College"+this.props.id}>
                                                    <input type="radio" data-parsley-multiple="attainment" /> College
                                                </label>
                                                <label className="btn btn-edu btn-default" data-toggle-class="btn-primary" data-toggle-passive-class="btn-default" onClick={this.handleHighschool} id={"Highschool"+this.props.id}>
                                                    <input type="radio" data-parsley-multiple="attainment" /> Highschool
                                                </label>
                                                <label className="btn btn-edu btn-default" data-toggle-class="btn-primary" data-toggle-passive-class="btn-default" onClick={this.handleElementary} id={"Elementary"+this.props.id}>
                                                    <input type="radio" data-parsley-multiple="attainment" /> Elementary
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row" id={"showDegree"+this.props.id}>
                                            <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14">Course *</label>
                                            <div className="form_education col-md-8 col-sm-8 col-xs-12">
                                                <DegreeSelectEdit updateDegree={this.handleDegree} degreeName={this.state.degreeName}/>
                                                <ul className="parsley-errors-list">
                                                    <li className="parsley-required">{this.state.error_degreeid_edu}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14"> Year Attended *</label>
                                            <div className="form_education col-md-3 col-sm-3 col-xs-12 form-group has-feedback">
                                                <input type="year" className="date-picker form-control" onChange={this.handleChange.bind(this, 'edu_start')} value={this.state.edu_start} placeholder="Year Start" id={"schoolStart"+this.props.id} pattern="[1-9][0-9]*|0" minLength="4" maxLength="4" required="required" />
                                                <span className="fa fa-calendar form-control-feedback"></span>
                                            </div>
                                            <label className="to col-md-1 col-sm-1 col-xs-12 control-label font-14">
                                                to
                                            </label>
                                            <div className="form_education col-md-3 col-sm-3 col-xs-12 form-group has-feedback">
                                                <input type="year" className="date-picker form-control" onChange={this.handleChange.bind(this, 'edu_end')} value={this.state.edu_end} placeholder="Year End" id={"schoolEnd"+this.props.id} pattern="[1-9][0-9]*|0" minLength="4" maxLength="4" required="required" />
                                                <span className="fa fa-calendar form-control-feedback"></span>
                                            </div>
                                            <div className="error-year-attended">
                                                <ul className="parsley-errors-list error-year-attended col-md-offset-4 col-sm-8 col-xs-12">
                                                    <li className="parsley-required">
                                                        {this.state.error_schoolEnd}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="x_footer x_modal_foot">
                                    <div className="form-group has-feedback">
                                        <a className="btn btn-warning btn-sm pull-left" data-dismiss="modal" aria-hidden="true">Cancel</a>
                                        <button type="submit" className="btn btn-primary btn-sm btn-edit-education pull-right">Save Changes</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div id={"deleteModal"+this.props.education.id} className="modal fade" role="dialog" aria-hidden="true">
                    <div className="modal-dialog">
                        <form className="modal-content form">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h3>Delete Education</h3>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <h4>Are you sure you want to delete this Education?</h4>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="x_footer x_modal_foot">
                                    <div className="form-group has-feedback">
                                        <a id="deleteexp-btn" className="btn btn-primary btn-sm pull-left btn-delete-education" aria-hidden="true" onClick={this.deleteEducation}>Confirm</a>
                                        <a className="btn btn-warning btn-sm pull-right" data-dismiss="modal">Cancel</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

var SchoolSelect = React.createClass({
    getInitialState: function(){
      return{
        schools: []
      }
    },
    componentWillMount: function(){
        this.fetchSchools();
    },
    fetchSchools: function(){
        $.ajax({
            type: "GET",
            url: "/api/v1/schools",
            error: function(){
                this.fetchSchools();
                return;
            }.bind(this),
            success: function(response){
                this.setState({
                    schools: response
                });
            }.bind(this)
        });
    },
    handleChange: function(e){
      this.props.updateSchool(e.target.value);
    },
    render: function render() {
      var schoolStyle = {
        width: '80%'
      };
      var SchoolList = this.state.schools,
        schoolOpt = function(SchoolList) {
          return SchoolList.name;
      };

      return(
        <Select2 id="schoolz" value={null} style={schoolStyle} onChange={this.handleChange} options={{ placeholder: 'Select School', tags: true }} data={SchoolList.map(schoolOpt)} />
      );
    }
});

var DegreeSelect = React.createClass({
    getInitialState: function(){
      return{
        degrees: []
      }
    },
    componentDidMount: function(){
      this.fetchDegrees();
    },
    fetchDegrees: function(){
        $.ajax({
            type: "GET",
            url: "/api/v1/degrees",
            error: function(){
                this.fetchDegrees();
                return;
            }.bind(this),
            success: function(response){
                this.setState({
                    degrees: response
                });
            }.bind(this)
        });
    },
    handleChange: function(e){
      this.props.updateDegree(e.target.value);
    },
    render: function render() {
      var degreeStyle = {
        width: '80%'
      };
      var DegreeList = this.state.degrees,
        degreeOpt = function(DegreeList) {
          return DegreeList.name;
      };

      return(
          <Select2 id="degreez" style={degreeStyle} onChange={this.handleChange} value={null} options={{ placeholder: 'Select Course', tags: true }} data={DegreeList.map(degreeOpt)}/>
      );
    }
});

var SchoolSelectEdit = React.createClass({
    getInitialState: function(){
      return{
        schools: []
      }
    },
    componentWillMount: function(){
        this.fetchSchools();
    },
    fetchSchools: function(){
        $.ajax({
            type: "GET",
            url: "/api/v1/schools",
            error: function(){
                this.fetchSchools();
                return;
            }.bind(this),
            success: function(response){
                this.setState({
                    schools: response
                });
            }.bind(this)
        });
    },
    handleChange: function(e){
      this.props.updateSchool(e.target.value);
    },
    render: function render() {
      var schoolStyle = {
        width: '80%'
      };
      var SchoolList = this.state.schools,
        schoolOpt = function(SchoolList) {
          return SchoolList.name;
      };

      return(
        <Select2 id="school" value={this.props.schoolName} style={schoolStyle} onChange={this.handleChange} options={{ placeholder: 'Select School', tags: true }} data={SchoolList.map(schoolOpt)} />
      );
    }
});

var DegreeSelectEdit = React.createClass({
    getInitialState: function(){
      return{
        degrees: []
      }
    },
    componentDidMount: function(){
      this.fetchDegrees();
    },
    fetchDegrees: function(){
        $.ajax({
            type: "GET",
            url: "/api/v1/degrees",
            error: function(){
                this.fetchDegrees();
                return;
            }.bind(this),
            success: function(response){
                this.setState({
                    degrees: response
                });
            }.bind(this)
        });
    },
    handleChange: function(e){
      this.props.updateDegree(e.target.value);
    },
    render: function render() {
      var degreeStyle = {
        width: '80%'
      };
      var DegreeList = this.state.degrees,
        degreeOpt = function(DegreeList) {
          return DegreeList.name;
      };
      if(this.props.degreeName == ""){
        $('#select2-degree'+this.props.id+'-container').html('<font color="#a599a5">Select Course</font>');
        var defaultDegree = null;
      }
      else{
        var defaultDegree = this.props.degreeName;
      }


      return(
          <Select2 id={"degree"+this.props.id} style={degreeStyle} onChange={this.handleChange} value={defaultDegree} options={{ placeholder: 'Select Course', tags: true }} data={DegreeList.map(degreeOpt)}/>
      );
    }
});
