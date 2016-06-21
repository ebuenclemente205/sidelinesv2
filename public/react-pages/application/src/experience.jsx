var React = require('react');
var id = window.userid;

module.exports = React.createClass({
    getInitialState(){
        return{
            experiences: []
        };
    },
    componentWillMount: function(){
      this.fetchExperiences();
    },
    componentDidMount: function(){
      $( "#createExperience" ).hide();
    },
    addExperience: function(e){
      e.preventDefault();
      $( "#createExperience" ).show();
      $('html, body').animate({ scrollTop: $('#createExperience').offset().top -100}, 'fast');
    },
    fetchExperiences: function(){
      $.ajax({
        type: "GET",
        url: "/api/v1/experiences/student/"+id,
        error: function(){
          this.fetchExperiences();
          console.log("Failed to query Experiences and reloaded");
          return;
        }.bind(this),
        success: function(response){
          this.setState({
            experiences: response
          });
        }.bind(this)
      });
    },
    render: function () {
        var experiences = this.state.experiences;
        var studentExperience = function(experiences) {
          return (
              <StudentExperience key={experiences.id} experiences={experiences}/>
          );
        };
        return (
            <div className="x_panel" id="experience-tip">
                <div className="x_content">
                    <div role="tabpanel" data-example-id="togglable-tabs">
                        <ul id="myTab" className="nav nav-tabs bar_made" role="tablist">
                            <h2 className="profile-h2"><span className="fa fa-globe"></span> Experiences</h2>
                            <div className="pull-right panel_add">
                                <a href="#" role="button" data-tooltip="Add Experience" onClick={this.addExperience}>
                                  <i className="fa fa-plus-square-o"> </i>
                                </a>
                            </div>
                        </ul>
                        <div id="myTabContent" className="tab-content">
                            <div role="tabpanel" className="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                                {this.state.experiences.map(studentExperience)}
                                <CreateExperience fetchExperiences={this.fetchExperiences}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

var CreateExperience = React.createClass({
  getInitialState: function(){
    return {
      exp_title: "",
      exp_location: "",
      exp_start: "",
      exp_end: "",
      exp_description: "",
      exp_name_of_company: "",
      error_expTitle: "",
      error_expNameOfCompany: "",
      error_expLocation: "",
      error_expStart: "",
      error_expEnd: "",
      error_expDescription: "",
    };
  },
  handleCancel: function(e){
    e.preventDefault();
    $('#experience_form')[0].reset();
    $( "#createExperience" ).slideUp();
  },
  handleChange: function(field, e){
      var state = {};
      state[field] = e.target.value;
      this.setState(state);
  },
  handleSubmit(e) {
    e.preventDefault();
      var formData = new FormData();
      formData.append('exp_title', this.state.exp_title);
      formData.append('exp_name_of_company', this.state.exp_name_of_company);
      formData.append('exp_location', this.state.exp_location);
      formData.append('exp_start', this.state.exp_start);
      formData.append('exp_end', this.state.exp_end);
      formData.append('exp_description', this.state.exp_description);
    this.sendToServer(formData);
    return;
  },
  sendToServer(formData) {
      $.ajax({
          type: "POST",
          url: "/api/v1/experiences/student/create/"+id,
          data: formData,
          processData: false,
          contentType: false,
          beforeSend: function() {
            $(".exp-btn").html('<b>Saving</b> <i class="fa fa-circle-o-notch fa-spin"></i>');
          },
          error: function(jqXhr, json, errorThrown) {
            $(".exp-btn").html('<b>Save</b>');

              if(jqXhr.status === 422) {
                  var errors = jqXhr.responseJSON;
                  var expTitleMessage         = errors['exp_title'];
                  var expNameOfCompanyMessage = errors['exp_name_of_company'];
                  var expLocationMessage      = errors['exp_location'];
                  var expStartMessage         = errors['exp_start'];
                  var expEndMessage           = errors['exp_end'];
                  var expDescriptionMessage   = errors['exp_description'];

                  console.log(errors);

                  this.setState({
                      error_expTitle: expTitleMessage,
                      error_expNameOfCompany: expNameOfCompanyMessage,
                      error_expLocation: expLocationMessage,
                      error_expStart: expStartMessage,
                      error_expEnd: expEndMessage,
                      error_expDescription: expDescriptionMessage,
                      submitted: false
                  });

                  if("exp_title" in errors) {
                      $('#exp_title').addClass('parsley-error').focus();
                  } else {
                      $('#exp_title').removeClass('parsley-error');
                  }

                  if("exp_name_of_company" in errors) {
                      $('#exp_name_of_company').addClass('parsley-error').focus();
                  } else {
                      $('#exp_name_of_company').removeClass('parsley-error');
                  }

                  if("exp_location" in errors) {
                      $('#exp_location').addClass('parsley-error').focus();
                  } else {
                      $('#exp_location').removeClass('parsley-error');
                  }

                  if("exp_end" in errors) {
                      $('#exp_end').addClass('parsley-error').focus();
                       $('#exp_start').addClass('parsley-error').focus();
                  } else {
                      $('#exp_end').removeClass('parsley-error');
                      $('#exp_start').removeClass('parsley-error');
                  }

                  if("exp_description" in errors) {
                      $('#exp_description').addClass('parsley-error').focus();
                  } else {
                      $('#exp_description').removeClass('parsley-error');
                  }
              }
          }.bind(this),
          success: function(data) {
            $(".exp-btn").html('<b>Save</b>');
            $('#experience_form')[0].reset();
            $( "#createExperience" ).slideUp();        

            this.setState({
                error_expTitle: "",
                error_expNameOfCompany: "",
                error_expLocation: "",
                error_expStart: "",
                error_expEnd: "",
                error_expDescription: "",
            });

            console.log(data);


            this.props.fetchExperiences();
            
          }.bind(this)
      });
  },
  render: function render() {
    return(
      <div id="createExperience" className="message_wrapper">
        <div className="message msg-content add-msg-content">
            <form id="experience_form" className="row" onSubmit={this.handleSubmit}>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group has-feedback">
                          <label htmlFor="exp_title" className="font-14">Position *</label>
                          <input id="exp_title" type="text" className="form-control" placeholder="Position" onChange={this.handleChange.bind(this, 'exp_title')}/>
                          <ul className='parsley-errors-list'>
                              <li className='parsley-required font-12'> {this.state.error_expTitle} </li>
                          </ul>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group has-feedback">
                            <label htmlFor="exp_name_of_company" className="font-14">Company Name *</label>
                            <input id="exp_name_of_company" type="text" className="form-control" placeholder="Company Name" onChange={this.handleChange.bind(this, 'exp_name_of_company')}/>
                            <ul className='parsley-errors-list'>
                                <li className='parsley-required font-12'> {this.state.error_expNameOfCompany} </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group has-feedback">
                            <label htmlFor="exp_location" className="font-14">Address *</label>
                            <input id="exp_location" type="text" className="form-control" placeholder="Address" onChange={this.handleChange.bind(this, 'exp_location')}/>
                            <ul className='parsley-errors-list'>
                                <li className='parsley-required  font-12'> {this.state.error_expLocation} </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                        <label htmlFor="exp_start" className="font-14">Time Period *</label>
                        <div className="row">
                            <div className="col-md-5 col-xs-12">
                                 <div className="form-group has-feedback">
                                    <input id="exp_start" defaultValue="" id="exp_start" type="Month" className="form-control date-picker" onChange={this.handleChange.bind(this, 'exp_start')}/>
                                    <span className="fa fa-calendar form-control-feedback"> </span>
                                    <ul className='parsley-errors-list'>
                                        <li className='parsley-required font-12'> {this.state.error_expEnd} </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-1 col-xs-5">
                                <label className="date-to font-14">to</label>
                            </div>
                            <div className="col-md-5 col-xs-12">
                                 <div className="form-group has-feedback">
                                    <input id="exp_end" defaultValue="" id="exp_end" type="Month" className="form-control date-picker" onChange={this.handleChange.bind(this, 'exp_end')}/>
                                    <span className="fa fa-calendar form-control-feedback"> </span>
                                    <ul className='parsley-errors-list'>
                                        <li className='parsley-required'></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="form-group has-feedback">
                            <label htmlFor="exp_description" className="font-14"> Description </label>
                            <textarea id="exp_description" className="form-control" placeholder="Description" col="90" onChange={this.handleChange.bind(this, 'exp_description')}></textarea>
                            <ul className='parsley-errors-list'>
                                <li className='parsley-required font-12'> {this.state.error_expDescription}</li>
                            </ul>
                        </div>
                        <a onClick={this.handleCancel} className="btn btn-warning btn-sm">Cancel</a>
                        <button type="submit" className="btn btn-primary btn-sm exp-btn">Save</button>
                    </div>
                </div>
            </form>
        </div>
      </div>
    );
  }
});

var StudentExperience = React.createClass({
    getInitialState: function(){
        return {
          view: "view",
          exp_title: this.props.experiences.exp_title,
          exp_name_of_company: this.props.experiences.exp_name_of_company,
          exp_location: this.props.experiences.exp_location,
          exp_end: this.props.experiences.exp_end,
          exp_start: this.props.experiences.exp_start,
          exp_description: this.props.experiences.exp_description,
          oldexp_title: this.props.experiences.exp_title,
          oldexp_name_of_company: this.props.experiences.exp_name_of_company,
          oldexp_location: this.props.experiences.exp_location,
          oldexp_end: this.props.experiences.exp_end,
          oldexp_start: this.props.experiences.exp_start,
          oldexp_description: this.props.experiences.exp_description,
          error_editExpTitle: "",
          error_editExpNameOfCompany: "",
          error_editExpLocation: "",
          error_editExpStart: "",
          error_editExpEnd: "",
          error_editExpDescription: "",
        };
      },
      showEdit: function(e){
        e.preventDefault();
        this.setState({
          view: "edit"
        });
      },
      handleCancel: function(){
        this.setState({
          view: "view",
          exp_title: this.state.oldexp_title,
          exp_name_of_company: this.state.oldexp_name_of_company,
          exp_location: this.state.oldexp_location,
          exp_end: this.state.oldexp_end,
          exp_start: this.state.oldexp_start,
          exp_description: this.state.oldexp_description,
        });
      },
      handleDelete: function(){
        $("#deleteModal"+this.props.experiences.id).modal('show');
      },
      confirmDelete: function(){
        var user_experiences = this.props.experiences.id;
        $.ajax({
          type: "DELETE",
          url: "/api/v1/experiences/delete/"+user_experiences,
          beforeSend: function(){
            $("#deleteexp-btn").html('<b>Deleting</b> <i class="fa fa-circle-o-notch fa-spin"></i>');
          },
          success: function(data) {
            $("#deleteexp-btn").html('<b>Delete</b>');
            $("#deleteModal"+user_experiences).modal('hide');
            setTimeout(function () {
               $("#deleteModal"+user_experiences).parent('div').fadeOut('fast');
            }, 800);

          }.bind(this)
        });
      },
      handleChange: function(field, e){
        var state = {};
        state[field] = e.target.value;
        this.setState(state);
      },
      handleSubmit(e) {
        e.preventDefault();
          var formData = new FormData();
          formData.append('exp_title', this.state.exp_title);
          formData.append('exp_name_of_company', this.state.exp_name_of_company);
          formData.append('exp_location', this.state.exp_location);
          formData.append('exp_start', this.state.exp_start);
          formData.append('exp_end', this.state.exp_end);
          formData.append('exp_description', this.state.exp_description);
        this.sendToServer(formData);
        return;
      },
      sendToServer(formData) {
          var user_exp = this.props.experiences.id;
          $.ajax({
              type: "POST",
              url: "/api/v1/experiences/student/"+user_exp,
              data: formData,
              processData: false,
              contentType: false,
              beforeSend: function() {
                $(".edit-exp-btn").html('<b>Saving</b> <i class="fa fa-circle-o-notch fa-spin"></i>');
              },
              error: function(jqXhr, json, errorThrown) {
                $(".edit-exp-btn").html('<b>Save Changes</b>');

                  if(jqXhr.status === 422) {
                      var errors = jqXhr.responseJSON;
                      var expTitleMessage         = errors['exp_title'];
                      var expNameOfCompanyMessage = errors['exp_name_of_company'];
                      var expLocationMessage      = errors['exp_location'];
                      var expStartMessage         = errors['exp_start'];
                      var expEndMessage           = errors['exp_end'];
                      var expDescriptionMessage   = errors['exp_description'];

                      console.log(errors);

                      this.setState({
                          error_editExpTitle: expTitleMessage,
                          error_editExpNameOfCompany: expNameOfCompanyMessage,
                          error_editExpLocation: expLocationMessage,
                          error_editExpStart: expStartMessage,
                          error_editExpEnd: expEndMessage,
                          error_editExpDescription: expDescriptionMessage,
                      });

                      if("exp_title" in errors) {
                          $('#edit_exp_title').addClass('parsley-error').focus();
                      } else {
                          $('#edit_exp_title').removeClass('parsley-error');
                      }

                      if("exp_name_of_company" in errors) {
                          $('#edit_exp_name_of_company').addClass('parsley-error').focus();
                      } else {
                          $('#edit_exp_name_of_company').removeClass('parsley-error');
                      }

                      if("exp_location" in errors) {
                          $('#edit_exp_location').addClass('parsley-error').focus();
                      } else {
                          $('#edit_exp_location').removeClass('parsley-error');
                      }

                      if("exp_end" in errors) {
                          $('#edit_exp_end').addClass('parsley-error').focus();
                           $('#edit_exp_start').addClass('parsley-error').focus();
                      } else {
                          $('#edit_exp_end').removeClass('parsley-error');
                          $('#edit_exp_start').removeClass('parsley-error');
                      }

                      if("exp_description" in errors) {
                          $('#edit_exp_description').addClass('parsley-error').focus();
                      } else {
                          $('#edit_exp_description').removeClass('parsley-error');
                      }
                  }
              }.bind(this),
              success: function(data) {
                $(".edit-exp-btn").html('<b>Save Changes</b>');
                this.setState({
                  view: "view",
                  exp_title: data.exp_title,
                  exp_name_of_company: data.exp_name_of_company,
                  exp_location: data.exp_location,
                  exp_end: data.exp_end,
                  exp_start: data.exp_start,
                  exp_description: data.exp_description,
                  oldexp_title: data.exp_title,
                  oldexp_name_of_company: data.exp_name_of_company,
                  oldexp_location: data.exp_location,
                  oldexp_end: data.exp_end,
                  oldexp_start: data.exp_start,
                  oldexp_description: data.exp_description
                });
              }.bind(this)
          });
      },
    render: function() {
        var endYear = moment(this.state.exp_end).format('YYYY');
        var startYear = moment(this.state.exp_start).format('YYYY');
        var dateLength = endYear - startYear;
        if(dateLength > 0){
          if(dateLength == 1){
            dateLength = " ( "+ dateLength + " year )";
          }
          else{
            dateLength = " ( "+ dateLength + " years )";
          }
        }
        else{
          dateLength = "";
        }

        if(this.state.view == "view"){
            return (
              <div id="myTabContent" className="tab-content">
                 <div role="tabpanel" className="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                    <div className="message_wrapper">
                        <div className="message msg-content">
                        <div className="pull-right panel_add">
                            <a role="button" data-tooltip="Edit" onClick={this.showEdit}>
                                <i className="fa fa-pencil font-17"> </i>
                            </a>
                            <a role="button" data-tooltip="Delete" onClick={this.handleDelete}>
                                <i className="fa fa-trash-o font-17"> </i>
                            </a>
                        </div>
                          <h3> {this.state.exp_title} </h3>
                          <h4 className="inline-div">{this.state.exp_name_of_company} </h4> <p className="inline-div">( {this.state.exp_location} )</p>
                          <p> {moment(this.state.exp_start).format('MMMM YYYY')} - {moment(this.state.exp_end).format('MMMM YYYY') + dateLength} </p>
                          <p> {this.state.exp_description} </p>
                        </div>
                    </div>
                 </div><hr/>
                 <div id={"deleteModal"+this.props.experiences.id} className="modal fade" role="dialog" aria-hidden="true">
                    <div className="modal-dialog">
                        <form className="modal-content form">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h3>Delete Experience</h3>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <h4>Are you sure you want to delete this Experience?</h4>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="x_footer x_modal_foot">
                                    <div className="form-group has-feedback">
                                        <a id="deleteexp-btn" className="btn btn-primary btn-sm pull-left" aria-hidden="true" onClick={this.confirmDelete}>Confirm</a>
                                        <a className="btn btn-warning btn-sm save-personal pull-right" data-dismiss="modal">Cancel</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
              </div>
            );
        }
        else if(this.state.view == "edit"){
            return(
              <div id="editExperience" className="message_wrapper">
                <div className="message msg-content add-msg-content">
                    <form id="experience_form" className="row" onSubmit={this.handleSubmit}>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group has-feedback">
                                    <label htmlFor="exp_title" className="font-14">Position *</label>
                                    <input id="edit_exp_title" type="text" className="form-control" defaultValue={this.state.exp_title} placeholder="Position" onChange={this.handleChange.bind(this, 'exp_title')}/>
                                    <ul className='parsley-errors-list'>
                                        <li className='parsley-required font-12'> {this.state.error_editExpTitle} </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group has-feedback">
                                    <label htmlFor="exp_name_of_company" className="font-14">Company Name *</label>
                                    <input id="edit_exp_name_of_company" type="text" className="form-control" defaultValue={this.state.exp_name_of_company} placeholder="Company Name" onChange={this.handleChange.bind(this, 'exp_name_of_company')}/>
                                    <ul className='parsley-errors-list'>
                                        <li className='parsley-required font-12'> {this.state.error_editExpNameOfCompany} </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <div className="form-group has-feedback">
                                    <label htmlFor="exp_location" className="font-14">Address *</label>
                                    <input id="edit_exp_location" type="text" className="form-control" defaultValue={this.state.exp_location} placeholder="Address" onChange={this.handleChange.bind(this, 'exp_location')}/>
                                    <ul className='parsley-errors-list'>
                                        <li className='parsley-required font-12'> {this.state.error_editExpLocation} </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <label htmlFor="exp_start" className="font-14">Time Period *</label>
                                <div className="row">
                                    <div className="col-md-5 col-xs-12">
                                         <div className="form-group has-feedback">
                                            <input id="edit_exp_start" required defaultValue={moment(this.state.exp_start).format('YYYY-MM')} id="exp_start" type="Month" className="form-control date-picker" onChange={this.handleChange.bind(this, 'exp_start')}/>
                                            <span className="fa fa-calendar form-control-feedback"> </span>
                                            <ul className='parsley-errors-list'>
                                                <li className='parsley-required font-12'> {this.state.error_editExpEnd} </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-1 col-xs-5">
                                        <label className="date-to font-14">to</label>
                                    </div>
                                    <div className="col-md-5 col-xs-12">
                                         <div className="form-group has-feedback">
                                            <input id="edit_exp_end" required defaultValue={moment(this.state.exp_end).format('YYYY-MM')} id="exp_end" type="Month" className="form-control date-picker" onChange={this.handleChange.bind(this, 'exp_end')}/>
                                            <span className="fa fa-calendar form-control-feedback"> </span>
                                            <ul className='parsley-errors-list'>
                                                <li className='parsley-required font-12'> </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="form-group has-feedback">
                                    <label htmlFor="edit_exp_description" className="font-14"> Description </label>
                                    <textarea className="form-control" placeholder="Description" defaultValue={this.state.exp_description} col="90" onChange={this.handleChange.bind(this, 'exp_description')}></textarea>
                                    <ul className='parsley-errors-list'>
                                        <li className='parsley-required font-12'> {this.state.error_editExpDescription} </li>
                                    </ul>
                                </div>
                                <a onClick={this.handleCancel} className="btn btn-warning btn-sm">Cancel</a>
                                <button type="submit" className="btn btn-primary btn-sm edit-exp-btn">Save Changes</button>
                            </div>
                        </div>
                    </form>
                </div><hr/>
              </div>
            );
        }
    }
});
