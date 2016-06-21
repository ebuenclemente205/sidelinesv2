var React = require('react');
var Select2 = require('react-select2-wrapper');
var id = window.userid;

module.exports = React.createClass({
    getInitialState: function(){
        return{
            showEdit: false,
            have_pic: false,
            fname: "",
            lname: "",
            contact_no: "",
            school: "",
            degree: "",
            image: "avatar-default.png",
            error_fname: "",
            error_lname: "",
            error_pic: "",
            error_contact_no: "",
            error_degreeid: "",
            error_schoolid: "",
            progress: "0%"
        }
    },
    componentDidMount: function(){
      setTimeout(function () {
            this.setState({
                progress: "40%"
           });          
      }.bind(this), 500);
    },
    componentWillMount: function(){
      this.fetchInfo();
    },
    fetchInfo: function(){
        $.ajax({
        type: "GET",
        url: "/api/v1/students/"+id,
        error: function(){
          this.fetchInfo();
          return;
        }.bind(this),
        success: function(response){
          if(response.user.image == null){
            this.setState({
                fname: response.fname,
                lname: response.lname,
                image: "avatar-default.png",
                school: response.school.name,
                degree: response.degree.name,
                email: response.user.email,
                contact_no: response.contact_no
            });
          }
          else{
            this.setState({
                fname: response.fname,
                lname: response.lname,
                image: response.user.image,
                school: response.school.name,
                degree: response.degree.name,
                email: response.user.email,
                contact_no: response.contact_no
            });
          }
        }.bind(this)
      });
    },
    loadFile: function(e){
      if(e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg' ||  e.target.files[0].type == 'image/jpg') {
          var reader = new FileReader();
          reader.onload = imageIsLoaded;
          reader.readAsDataURL(e.target.files[0]);
        function imageIsLoaded(e) {
          $('#output').attr('src', e.target.result);
        };
        this.setState({
          have_pic: true
        });
      }
    },
    showEdit: function(target, e){
        this.setState({
            showEdit: true
        });
        setTimeout(function () {
          $('#'+target).focus();
        }, 200);
    },
    handleCancel: function(e){
       e.preventDefault();
       this.setState({
            showEdit: false,
            fname: this.state.fname,
            lname: this.state.lname,
            contact_no: this.state.contact_no,
            school: this.state.school,
            degree: this.state.degree
        });
    },
    handleChange: function(field, e){
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
    handleSubmit: function(e) {
      e.preventDefault();
      var formData = new FormData();
      var file = e.target[0].files;

      if(this.state.have_pic == true){
        formData.append('file', file[0]);
      }

      formData.append('fname', this.state.fname);
      formData.append('lname', this.state.lname);
      formData.append('contact_no', this.state.contact_no);
      formData.append('school_id', this.state.school);
      formData.append('degree_id', this.state.degree);

    this.sendToServer(formData);
    return;
    },
    sendToServer: function(formData){
        $.ajax({
            type: "POST",
            url: "/api/v1/students/"+id,
            data: formData,
            processData: false,
            contentType: false,
        beforeSend: function() {
          $(".save-personal").html('<b>Saving</b> <i class="fa fa-circle-o-notch fa-spin"></i>');
        },
        error: function(jqXhr, json, errorThrown) {
          $(".save-personal").html('<b>Save Changes</b>');
            if(jqXhr.status === 422) {
                var errors = jqXhr.responseJSON;
                var fnameMessage = errors['fname'];
                var lnameMessage = errors['lname'];
                var fileMessage = errors['file'];
                var contactNoMessage = errors['contact_no'];
                var schoolIdMessage = errors['school_id'];
                var degreeIdMessage = errors['degree_id'];

                console.log(errors);

                this.setState({
                    error_fname: fnameMessage,
                    error_lname: lnameMessage,
                    error_pic: fileMessage,
                    error_contact_no: contactNoMessage,
                    error_degreeid: schoolIdMessage,
                    error_schoolid: degreeIdMessage,
                    submitted: false
                });

                if("lname" in errors) {
                    $('#lname').addClass('parsley-error').focus();
                } else {
                    $('#lname').removeClass('parsley-error');
                }

                if("fname" in errors) {
                    $('#fname').addClass('parsley-error').focus();
                } else {
                    $('#fname').removeClass('parsley-error');
                }

                if("contact_no" in errors) {
                    $('#contact_no').addClass('parsley-error');
                } else {
                    $('#contact_no').removeClass('parsley-error');
                }
            }            
        }.bind(this),
        success: function(data) {
          $(".save-personal").html('<b>Save Changes</b>');

          this.setState({
            error_fname: "",
            error_lname: "",
            error_pic: "",
            error_contact_no: "",
            error_degreeid: "",
            error_schoolid: "",
            showEdit: false,
            have_pic: false
          });

          this.fetchInfo();
          this.props.setChanges();
        }.bind(this)
      });
    },
    render: function() {
        var progress = { width: this.state.progress };
        var image_src = "/img/profilepics/"+this.state.image;

        if(this.state.showEdit == false){
            return (
                <div className="col-md-3 col-sm-3 col-xs-12 profile_left">
                  <div className="crop-avatar profile_img hover-btn" onClick={this.showEdit.bind(this, 'file')}>
                      <img id="output" className="img-responsive avatar-view hover-btn personal_pic" alt="Avatar" src={image_src}/>
                      <input className="image file-upload inputfile inputfile-1" />
                      <label className="icon-prof profile_pic_user margin-btn_profile">
                        <div className="fa fa-camera label-camera"></div>
                        <div className="label-prof"> Change photo</div>
                      </label>
                      <div className="loading" aria-label="Loading" role="img" tabindex="-1"></div>
                  </div>
                  <ul className="list-unstyled margin-top_profile">
                    <div className="pull-right panel_add" onClick={this.showEdit.bind(this, 'file')}>
                        <a data-tooltip="Edit Personal Info">
                            <i className="fa fa-pencil-square-o"> </i>
                        </a>
                    </div>
                    <h3 onClick={this.showEdit.bind(this, 'fname')} className="inline-div"> {this.state.fname} </h3>
                    <h3 onClick={this.showEdit.bind(this, 'lname')} className="inline-div"> {this.state.lname} </h3>                    
                  </ul>
                  <ul className="list-unstyled user_data prog-margin">
                    <li>
                      <p>Profile Strength</p>
                      <div className="progress progress_md">
                    <div className="progress-bar bg-primary" role="progressbar" style={progress}>{this.state.progress}</div>
                    </div>
                    </li>
                  </ul>
                  <ul className="list-unstyled user_data">
                    <li onClick={this.showEdit.bind(this, 'school')}><i className='col-md-1 col-sm-1 col-xs-1 fa fa-university user-profile-icon info-left'></i>
                    <span className='col-md-11 col-sm-11 col-xs-11 info-right'>{this.state.school}</span>
                    </li>

                    <li onClick={this.showEdit.bind(this, 'degree')}>
                      <i className="col-md-1 col-sm-1 col-xs-1 user-profile-icon info-left fa fa-certificate"></i>
                      <span className='col-md-11 col-sm-11 col-xs-11 info-right'>{this.state.degree}</span>
                    </li>

                    <li onClick={this.showEdit.bind(this, 'contact_no')}>
                      <i className="col-md-1 col-sm-1 col-xs-1 user-profile-icon info-left fa fa-phone"></i>
                      <span className='col-md-11 col-sm-11 col-xs-11 info-right'>{this.state.contact_no}</span>
                    </li>

                    <li>
                      <i className="col-md-1 col-sm-1 col-xs-1 user-profile-icon info-left fa fa-envelope"></i>
                      <span className='col-md-11 col-sm-11 col-xs-11 info-right'>{this.state.email}</span>
                    </li>
                  </ul>
                </div>
            );
        }
        else if(this.state.showEdit == true){
            return (
                <form className="col-md-3 col-sm-3 col-xs-12 profile_left" onSubmit={this.handleSubmit}>
                  <div className="crop-avatar profile_img hover-btn">
                      <img id="output" className="img-responsive avatar-view hover-btn" alt="Avatar" src={image_src}/>
                      <input onChange={this.loadFile} type="file" className="image file-upload inputfile inputfile-1" name="file" id="file-1"/>
                      <label className="icon-prof profile_pic_user show-bg" htmlFor="file-1">
                        <div className="fa fa-camera label-camera"></div>
                        <div className="label-prof opacity-1"> Upload photo</div>
                      </label>
                      <div className="loading" aria-label="Loading" role="img" tabindex="-1"></div>
                      <div className="pic-error-profile">
                          <ul className="parsley-errors-list pic-error-profile">
                              <li className='parsley-required'> {this.state.error_pic} </li>
                          </ul>
                      </div>
                  </div>
                  <div className="profile-name">
                      <div className="col-md-12 col-sm-12 col-xs-12 margin-top_profile">
                            <div className='form-group has-feedback'>
                                <input id="fname" type='text' className='form-control fname' placeholder='First Name' onChange={this.handleChange.bind(this, 'fname')} defaultValue={this.state.fname}/>
                                <ul className='parsley-errors-list'>
                                    <li className='parsley-required'> {this.state.error_fname} </li>
                                </ul>
                            </div>
                      </div>
                      <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className='form-group has-feedback name-personal'>
                                <input id="lname" type='text' className='form-control' placeholder='Last Name' onChange={this.handleChange.bind(this, 'lname')} defaultValue={this.state.lname}/>
                                <ul className='parsley-errors-list'>
                                    <li className='parsley-required'> {this.state.error_lname} </li>
                                </ul>
                            </div>
                      </div>
                  </div>
                  <ul className="list-unstyled user_data prog-margin">
                  </ul>
                  <ul className="list-unstyled user_data">
                    <li>
                        <SchoolSelect user_school={this.state.school} updateSchool={this.handleSchool} />
                    </li>

                    <li>
                       <DegreeSelect user_degree={this.state.degree} updateDegree={this.handleDegree}/>
                    </li>

                    <li>
                      <div className='form-group has-feedback'>
                          <input id="contact_no" type='text' className='form-control contact_input' placeholder='Contact' onChange={this.handleChange.bind(this, 'contact_no')} defaultValue={this.state.contact_no}/>
                          <ul className='parsley-errors-list'>
                              <li className='parsley-required'> { this.state.error_contact_no} </li>
                          </ul>
                      </div>
                    </li>

                    <li className="btn-personal">
                        <a className="btn btn-warning btn-sm" onClick={this.handleCancel}>Cancel</a>
                        <button type="submit" className="btn btn-primary pull-right btn-sm save-personal">Save Changes</button>
                    </li>
                  </ul>
                </form>
            );
        }
    }
});

var SchoolSelect = React.createClass({
    getInitialState: function(){
      return{
        schools: []
      }
    },
    componentDidMount: function(){
      $.get("/api/v1/schools", function(result) {
          this.setState({
            schools: result
          });
      }.bind(this));
    },
    handleChange: function(e){
      this.props.updateSchool(e.target.value);
    },
    render: function render() {
      var schoolStyle = {
        width: '100%'
      };
      var SchoolList = this.state.schools,
        schoolOpt = function(SchoolList) {
          return SchoolList.name;
      };

      return(
        <Select2 style={schoolStyle} onChange={this.handleChange} defaultValue={this.state.user_school} options={{ placeholder: 'Select School', tags: true }} data={SchoolList.map(schoolOpt)} />
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
      $.get("/api/v1/degrees", function(result) {
          this.setState({
            degrees: result
          });
      }.bind(this));
    },
    handleChange: function(e){
      this.props.updateDegree(e.target.value);
    },
    render: function render() {
      var degreeStyle = {
        width: '100%'
      };
      var DegreeList = this.state.degrees,
        degreeOpt = function(DegreeList) {
          return DegreeList.name;
      };

      return(
          <Select2 style={degreeStyle} onChange={this.handleChange} defaultValue={this.state.user_degree} options={{ placeholder: 'Select Course', tags: true }} data={DegreeList.map(degreeOpt)}/>
      );
    }
});
