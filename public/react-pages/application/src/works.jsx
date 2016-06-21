var React = require('react');
var id = window.userid;

module.exports = React.createClass({
    getInitialState: function(){
        return {
            works: [],
        };
    },
    componentWillMount: function(){
      this.fetchWorks();
    },
    componentDidMount: function(){
      $( "#createWork" ).hide();
    },
    addWork: function(e){
      e.preventDefault();
      $( "#createWork" ).show();
      $('html, body').animate({ scrollTop: $('#createWork').offset().top -100}, 'fast');
      $('.work-img-add').removeClass('remove-border');
      $('#work_pic').removeClass('work_pic_min');
      $('#work_pic').attr('src', "dist/img/plus.png");
    },
    fetchWorks:function(){
      $.ajax({
        type: "GET",
        url: "/api/v1/works/student/"+id,
        error: function(){
          this.fetchWorks();
          console.log("Failed to query Works and reloaded");
          return;
        }.bind(this),
        success: function(response){
          this.setState({
            works: response
          });
        }.bind(this)
      });
    },
    render: function () {
      var works = this.state.works;
      var studentWorks = function(works) {
          return (
              <ShowWork key={works.id} works={works}/>
          );
      };
      return (
        <div className="x_panel" id="works-tip">
          <div className="x_content">
            <div className="" role="tabpanel" data-example-id="togglable-tabs">
              <ul id="myTab" className="nav nav-tabs bar_made" role="tablist">
                  <h2 className="profile-h2"><span className="fa fa-clipboard"></span> Works </h2>
                  <div className="pull-right panel_add">
                      <a href="#" role="button" data-tooltip="Add Works" onClick={this.addWork}>
                          <i className="fa fa-plus-square-o"> </i>
                      </a>
                  </div>
              </ul>
              {this.state.works.map(studentWorks)}
              <CreateWork fetchWorks={this.fetchWorks}/>
            </div>
          </div>
        </div>
      );
    }
});

var CreateWork = React.createClass({
  getInitialState: function(){
    return {
      work_title: "",
      work_position: "",
      work_start: "",
      work_end: "",
      work_url: "",
      work_description: "",
      error_workTitle: "",
      error_workPosition: "",
      error_workStart: "",
      error_workEnd: "",
      error_workUrl: "",
      error_workImage: "",
      error_workDescription: "",
      have_pic: false
    };
  },
  InitializeErrors: function() {
    this.setState({
      error_workTitle: "",
      error_workPosition: "",
      error_workStart: "",
      error_workEnd: "",
      error_workUrl: "",
      error_workImage: "",
      error_workDescription: "",
    });
  },
  removeErorrClass: function() {      
      $('#work_title').removeClass('parsley-error');
      $('#work_end').removeClass('parsley-error');
      $('#work_start').removeClass('parsley-error');
      $('#work_description').removeClass('parsley-error');      
  },
  loadFile: function(e){
    if(e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg' ||  e.target.files[0].type == 'image/jpg') {
        var reader = new FileReader();
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(e.target.files[0]);
      function imageIsLoaded(e) {
        $('#work_pic').attr('src', e.target.result);
      };
      this.setState({
        have_pic: true
      });
      $('.work-img-add').addClass('remove-border');
      $('#work_pic').addClass('work_pic_min');
    }
  },
  handleCancel: function(e){
    e.preventDefault();
    $('#works_form')[0].reset();
    $( "#createWork" ).slideUp();    

    this.InitializeErrors();
    this.removeErorrClass();
  },
  handleChange: function(field, e){
      var state = {};
      state[field] = e.target.value;
      this.setState(state);
  },
  handleSubmit(e) {
    e.preventDefault();
      var formData = new FormData();
      var file = e.target[5].files;

      if(this.state.have_pic == true){
        formData.append('file', file[0]);
      }

      formData.append('work_title', this.state.work_title);
      formData.append('work_position', this.state.work_position);
      formData.append('work_start', this.state.work_start);
      formData.append('work_end', this.state.work_end);
      formData.append('work_url', this.state.work_url);
      formData.append('work_description', this.state.work_description);
    this.sendToServer(formData);
    return;
  },
  sendToServer(formData) {
      $.ajax({
          type: "POST",
          url: "/api/v1/works/student/create/"+id,
          data: formData,
          processData: false,
          contentType: false,
          beforeSend: function() {
            $(".works-btn").html('<b>Saving</b> <i class="fa fa-circle-o-notch fa-spin"></i>');
          },
          error: function(jqXhr, json, errorThrown) {
            $(".works-btn").html('<b>Save</b>');
              if(jqXhr.status === 422) {
                  var errors = jqXhr.responseJSON;
                  var workTitleMessage = errors['work_title'];
                  var workPositionMessage = errors['work_position'];
                  var workStartMessage = errors['work_start'];
                  var workEndMessage = errors['work_end'];
                  var workUrlMessage = errors['work_url'];
                  var workImageMessage = errors['file'];
                  var workDescriptionMessage = errors['work_description'];

                  console.log(errors);

                  this.setState({
                      error_workTitle: workTitleMessage,
                      error_workPosition: workPositionMessage,
                      error_workStart: workStartMessage,
                      error_workEnd: workEndMessage,
                      error_workUrl: workUrlMessage,
                      error_workImage: workImageMessage,
                      error_workDescription: workDescriptionMessage,
                      submitted: false
                  });

                  if("work_title" in errors) {
                      $('#work_title').addClass('parsley-error').focus();
                  } else {
                      $('#work_title').removeClass('parsley-error');
                  }                  
                  if("work_end" in errors) {
                      $('#work_start').addClass('parsley-error').focus();
                      $('#work_end').addClass('parsley-error').focus();
                  } else {
                      $('#work_end').removeClass('parsley-error');
                      $('#work_start').removeClass('parsley-error');
                  }
                  if("work_description" in errors) {
                      $('#work_description').addClass('parsley-error').focus();
                  } else {
                      $('#work_description').removeClass('parsley-error');
                  }
              }
          }.bind(this),
          success: function(data) {
            $(".works-btn").html('<b>Save</b>');
            $('#works_form')[0].reset();
            $('.work-img-add').removeClass('remove-border');
            $('#work_pic').removeClass('work_pic_min');
            $('#work_pic').attr('src', "/dist/img/plus.png");
            $( "#createWork" ).slideUp();
            $('#work_title').removeClass('parsley-error');
            $('#work_end').removeClass('parsley-error');
            $('#work_start').removeClass('parsley-error');    
            $('#work_description').removeClass('parsley-error');

            this.setState({
                work_title: "",
                work_position: "",
                work_start: "",
                work_end: "",
                work_url: "",
                work_description: "",
                error_workTitle: "",
                error_workPosition: "",
                error_workStart: "",
                error_workEnd: "",
                error_workUrl: "",
                error_workImage: "",
                error_workDescription: "",
            });

            this.props.fetchWorks();
          }.bind(this)
      });
  },
  render: function render() {
    return(
      <div id="createWork" className="message_wrapper">
        <div className="message msg-content add-msg-content">
            <form id="works_form" className="row" onSubmit={this.handleSubmit}>
                <div className="col-md-6 col-sm-6 col-xs-12">
                    <div className="form-group has-feedback">
                        <label htmlFor="work_title" className="font-14">Project Title *</label>
                        <input id="work_title" type="text" className="form-control" placeholder="Project Title" onChange={this.handleChange.bind(this, 'work_title')}/>
                        <ul className='parsley-errors-list'>
                            <li className='parsley-required font-12'> {this.state.error_workTitle} </li>
                        </ul>
                    </div>
                    <div className="form-group has-feedback">
                        <label htmlFor="work_position" className="font-14">Position</label>
                        <input id="work_position" type="text" className="form-control" placeholder="Position" onChange={this.handleChange.bind(this, 'work_position')}/>
                        <ul className='parsley-errors-list'>
                            <li className='parsley-required font-12'> {this.state.error_workPosition} </li>
                        </ul>
                    </div>
                        <label htmlFor="work_start" className="font-14">Time Period *</label>
                        <div className="row">
                            <div className="col-md-5 col-xs-12">
                                 <div className="form-group has-feedback">
                                    <input id="work_start" placeholder="Year" defaultValue="" id="work_start" type="Month" className="form-control date-picker" onChange={this.handleChange.bind(this, 'work_start')}/>
                                    <span className="fa fa-calendar form-control-feedback"> </span>
                                    <ul className='parsley-errors-list'>
                                        <li className='parsley-required font-12'> {this.state.error_workEnd} </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-1 col-xs-5">
                                <label className="date-to font-14">to</label>
                            </div>
                            <div className="col-md-5 col-xs-12">
                                 <div className="form-group has-feedback">
                                    <input id="work_start" placeholder="Year" defaultValue="" id="work_end" type="Month" className="form-control date-picker" onChange={this.handleChange.bind(this, 'work_end')}/>
                                    <span className="fa fa-calendar form-control-feedback"> </span>
                                </div>
                            </div>
                        </div>
                    <div className="form-group has-feedback">
                        <label htmlFor="work_url" className="font-14"> Url</label>
                        <input id="work_url" type="text" className="form-control" placeholder="(e.g. Google Drive, Github, Bitbucket, Youtube, etc.)" onChange={this.handleChange.bind(this, 'work_url')}/>
                        <ul className='parsley-errors-list'>
                            <li className='parsley-required font-12'> {this.state.error_workUrl} </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-12"></div>
                <div className="col-md-3 col-sm-3 col-xs-12">
                    <label htmlFor="work_image" className="font-14"> Sample Photo </label>
                    <label className="work-img-add" htmlFor="work_upload">
                        <img src="dist/img/plus.png" id="work_pic" className="center-margin img-responsive pull-right" />
                    </label>
                    <div className="form-group has-feedback overflow-hide">
                        <input id="work_upload" className="outline-none hide-upload" onChange={this.loadFile} type="file" />
                        <ul className='parsley-errors-list'>
                            <li className='parsley-required font-12'> {this.state.error_workImage} </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-12 col-xs-12">
                    <div className="form-group has-feedback">
                        <label htmlFor="work_description" className="font-14"> Description *</label>
                        <textarea id="work_description" className="form-control" placeholder="Description" col="90" onChange={this.handleChange.bind(this, 'work_description')}></textarea>
                        <ul className='parsley-errors-list'>
                            <li className='parsley-required font-12'> {this.state.error_workDescription} </li>
                        </ul>
                    </div>
                    <a onClick={this.handleCancel} className="btn btn-warning btn-sm">Cancel</a>
                    <button type="submit" className="btn btn-primary btn-sm works-btn">Save</button>
                </div>
            </form>
        </div>
      </div>
    );
  }
});


var ShowWork = React.createClass({
  getInitialState: function(){
    return {
      view: "view",
      work_title: this.props.works.work_title,
      work_position: this.props.works.work_position,
      work_start: this.props.works.work_start,
      work_end: this.props.works.work_end,
      work_url: this.props.works.work_url,
      work_description: this.props.works.work_description,
      work_image: this.props.works.work_image,
      oldwork_title: this.props.works.work_title,
      oldwork_position: this.props.works.work_position,
      oldwork_start: this.props.works.work_start,
      oldwork_end: this.props.works.work_end,
      oldwork_url: this.props.works.work_url,
      oldwork_description: this.props.works.work_description,
      oldwork_image: this.props.works.work_image,
      error_editWorkTitle: "",
      error_editWorkPosition: "",
      error_editWorkTitle: "",
      error_editWorStart: "",
      error_editWorkEnd: "",
      error_editWorkUrl: "",
      error_editWorkImage: "",
      error_editWorkDescription: "",
      have_pic: false
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
      work_title: this.state.oldwork_title,
      work_position: this.state.oldwork_position,
      work_start: this.state.oldwork_start,
      work_end: this.state.oldwork_end,
      work_url: this.state.oldwork_url,
      work_description: this.state.oldwork_description,
      work_image: this.state.oldwork_image,
      error_editWorkTitle: "",
      error_editWorkPosition: "",
      error_editWorkTitle: "",
      error_editWorStart: "",
      error_editWorkEnd: "",
      error_editWorkUrl: "",
      error_editWorkImage: "",
      error_editWorkDescription: "",
      have_pic: false
    });
  },
  loadFile: function(e){
    if(e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg' ||  e.target.files[0].type == 'image/jpg') {
        var reader = new FileReader();
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(e.target.files[0]);
      function imageIsLoaded(e) {
        $('#work_pic'+this.props.works.id).attr('src', e.target.result);
      };
      this.setState({
        have_pic: true
      });
    }
  },
  handleDelete: function(){
    $("#deleteModal"+this.props.works.id).modal('show');
  },
  confirmDelete: function(){
    var user_work = this.props.works.id;
    $.ajax({
      type: "DELETE",
      url: "/api/v1/works/delete/"+user_work,
      beforeSend: function(){
        $("#deletework-btn").html('<b>Deleting</b> <i class="fa fa-circle-o-notch fa-spin"></i>');
      },
      success: function(data) {
        $("#deletework-btn").html('<b>Delete</b>');
        $("#deleteModal"+user_work).modal('hide');
        setTimeout(function () {
           $("#deleteModal"+user_work).parent('div').fadeOut('fast');
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
      var file = e.target[5].files;

      if(this.state.have_pic == true){
        formData.append('file', file[0]);
      }

      formData.append('work_title', this.state.work_title);
      formData.append('work_position', this.state.work_position);
      formData.append('work_start', this.state.work_start);
      formData.append('work_end', this.state.work_end);
      formData.append('work_url', this.state.work_url);
      formData.append('work_description', this.state.work_description);
    this.sendToServer(formData);
    return;
  },
  sendToServer(formData) {
      var user_work = this.props.works.id;
      $.ajax({
          type: "POST",
          url: "/api/v1/works/student/"+user_work,
          data: formData,
          processData: false,
          contentType: false,
          beforeSend: function() {
            $(".works-btn").html('<b>Saving</b> <i class="fa fa-circle-o-notch fa-spin"></i>');
          },
          error: function(jqXhr, json, errorThrown) {
            $(".works-btn").html('<b>Save Changes</b>');
              if(jqXhr.status === 422) {
                  var errors = jqXhr.responseJSON;
                  var workTitleMessage = errors['work_title'];
                  var workPositionMessage = errors['work_position'];
                  var workStartMessage = errors['work_start'];
                  var workEndMessage = errors['work_end'];
                  var workUrlMessage = errors['work_url'];
                  var workImageMessage = errors['file'];
                  var workDescriptionMessage = errors['work_description'];

                  console.log(errors);

                  this.setState({
                      error_editWorkTitle: workTitleMessage,
                      error_editWorkPosition: workPositionMessage,
                      error_editWorStart: workStartMessage,
                      error_editWorkEnd: workEndMessage,
                      error_editWorkUrl: workUrlMessage,
                      error_editWorkImage: workImageMessage,
                      error_editWorkDescription: workDescriptionMessage,
                      submitted: false
                  });

                  if("work_title" in errors) {
                      $('#edit_work_title').addClass('parsley-error').focus();
                  } else {
                      $('#edit_work_title').removeClass('parsley-error');
                  }
                  if("work_start" in errors) {
                      $('#edit_work_start').addClass('parsley-error').focus();
                  } else {
                      $('#edit_work_start').removeClass('parsley-error');
                  }
                  if("work_end" in errors) {
                      $('#edit_work_end').addClass('parsley-error').focus();
                  } else {
                      $('#edit_work_end').removeClass('parsley-error');
                  }
                  if("work_description" in errors) {
                      $('#edit_work_description').addClass('parsley-error').focus();
                  } else {
                      $('#edit_work_description').removeClass('parsley-error');
                  }
              }
          }.bind(this),
          success: function(data) {
            $(".works-btn").html('<b>Save</b>');
            this.setState({
              view: "view",
              work_title: data.work_title,
              work_position: data.work_position,
              work_start: data.work_start,
              work_end: data.work_end,
              work_url: data.work_url,
              work_description: data.work_description,
              work_image: data.work_image,
              oldwork_title: data.work_title,
              oldwork_position: data.work_position,
              oldwork_start: data.work_start,
              oldwork_end: data.work_end,
              oldwork_url: data.work_url,
              oldwork_description: data.work_description,
              oldwork_image: data.work_image,
              have_pic: false

            });
          }.bind(this)
      });
  },
  render: function(){    
    var work_img = "/img/works/"+this.state.work_image;
    var endYear = moment(this.state.work_end).format('YYYY');
    var startYear = moment(this.state.work_start).format('YYYY');
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
      if(this.state.work_image){        
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
                        <div className="row">
                            <div className="col-lg-10 col-md-10 col-sm-6">
                                <h3> {this.state.work_title} </h3>
                                <h4> {this.state.work_position} </h4>
                                <p> {moment(this.state.work_start).format('MMMM YYYY')} - {moment(this.state.work_end).format('MMMM YYYY') + dateLength}  </p>
                                <p>
                                   <a href="#" className="work-links"> {this.state.work_url} </a>
                                </p>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-6">
                                <img src={work_img} className="work-img pull-right" />
                            </div>
                            <div className="col-md-12">
                                <p> {this.state.work_description}
                                </p>
                            </div>
                        </div>
                      </div>
                  </div><hr/>
                </div>
                <div id={"deleteModal"+this.props.works.id} className="modal fade" role="dialog" aria-hidden="true">
                    <div className="modal-dialog">
                        <form className="modal-content form">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h3>Delete Work</h3>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <h4>Are you sure you want to delete this Sample Work?</h4>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="x_footer x_modal_foot">
                                    <div className="form-group has-feedback">
                                        <a id="deletework-btn" className="btn btn-primary btn-sm pull-left" aria-hidden="true" onClick={this.confirmDelete}>Confirm</a>
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
        else{
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
                        <div className="row">
                            <div className="col-lg-10 col-md-10 col-sm-6">
                                <h3> {this.state.work_title} </h3>
                                <h4> {this.state.work_position} </h4>
                                <p> {moment(this.state.work_start).format('MMMM YYYY')} - {moment(this.state.work_end).format('MMMM YYYY') + dateLength}  </p>
                                <p>
                                   <a href="#" className="work-links"> {this.state.work_url} </a>
                                </p>
                            </div>
                            <div className="col-md-12">
                                <p> {this.state.work_description}
                                </p>
                            </div>
                        </div>
                      </div>
                  </div><hr/>
                </div>
                <div id={"deleteModal"+this.props.works.id} className="modal fade" role="dialog" aria-hidden="true">
                    <div className="modal-dialog">
                        <form className="modal-content form">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h3>Delete Work</h3>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <h4>Are you sure you want to delete this Sample Work?</h4>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="x_footer x_modal_foot">
                                    <div className="form-group has-feedback">
                                        <a id="deletework-btn" className="btn btn-primary btn-sm pull-left" aria-hidden="true" onClick={this.confirmDelete}>Confirm</a>
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
      }
      else if(this.state.view == "edit"){
        return (
        <div id="myTabContent" className={"tab-content edit_"+this.props.works.id}>
          <div className="message_wrapper">
            <div className="message msg-content add-msg-content">
                <form id="works_form" className="row" onSubmit={this.handleSubmit}>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group has-feedback">
                            <label htmlFor="work_title" className="font-14">Project Title *</label>
                            <input id="edit_work_title" type="text" defaultValue={this.state.work_title} className="form-control" placeholder="Project Title" onChange={this.handleChange.bind(this, 'work_title')}/>
                            <ul className='parsley-errors-list'>
                                <li className='parsley-required font-12'> {this.state.error_editWorkTitle} </li>
                            </ul>
                        </div>
                        <div className="form-group has-feedback">
                            <label htmlFor="work_position" className="font-14">Position</label>
                            <input id="edit_work_position" type="text" defaultValue={this.state.work_position} className="form-control" placeholder="Position" onChange={this.handleChange.bind(this, 'work_position')}/>
                            <ul className='parsley-errors-list'>
                                <li className='parsley-required font-12'> {this.state.error_editWorkPosition} </li>
                            </ul>
                        </div>
                            <label htmlFor="work_start" className="font-14">Time Period *</label>
                            <div className="row">
                                <div className="col-md-5 col-xs-12">
                                     <div className="form-group has-feedback">
                                        <input id="edit_work_start" placeholder="Year" required defaultValue={moment(this.state.work_start).format('YYYY-MM')} id="work_start" type="Month" className="form-control date-picker" onChange={this.handleChange.bind(this, 'work_start')}/>
                                        <span className="fa fa-calendar form-control-feedback"> </span>
                                        <ul className='parsley-errors-list'>
                                            <li className='parsley-required font-12'> {this.state.error_editWorkEnd} </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-1 col-xs-5">
                                    <label className="date-to font-14">to</label>
                                </div>
                                <div className="col-md-5 col-xs-12">
                                     <div className="form-group has-feedback">
                                        <input id="edit_work_start" placeholder="Year" required defaultValue={moment(this.state.work_end).format('YYYY-MM')} id="work_end" type="Month" className="form-control date-picker" onChange={this.handleChange.bind(this, 'work_end')}/>
                                        <span className="fa fa-calendar form-control-feedback"> </span>
                                        <ul className='parsley-errors-list'>
                                            <li className='parsley-required'></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        <div className="form-group has-feedback">
                            <label htmlFor="work_url" className="font-14"> Url</label>
                            <input id="edit_work_url" type="text" className="form-control" defaultValue={this.state.work_url} placeholder="(e.g. Google Drive, Github, Bitbucket, Youtube, etc.)" onChange={this.handleChange.bind(this, 'work_url')}/>
                            <ul className='parsley-errors-list'>
                                <li className='parsley-required font-12'> {this.state.error_editWorkUrl} </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-12"></div>
                    <div className="col-md-3 col-sm-3 col-xs-12">
                        <label htmlFor="work_description" className="font-14"> Sample Photo </label>
                        <label className="work-img-add remove-border" htmlFor="work_upload">
                            <img src={work_img} id={"work_pic"+this.props.works.id} className="center-margin img-responsive pull-right work_pic_min" />
                        </label>
                        <div className="form-group has-feedback overflow-hide">
                            <input id="edit_work_upload" className="outline-none" onChange={this.loadFile} type="file" />
                            <ul className='parsley-errors-list'>
                                <li className='parsley-required font-12'> {this.state.error_editWorkImage} </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-12 col-xs-12">
                        <div className="form-group has-feedback">
                            <label htmlFor="edit_work_description" className="font-14"> Description *</label>
                            <textarea id="edit_work_description" className="form-control" placeholder="Description" defaultValue={this.state.work_description} col="90" onChange={this.handleChange.bind(this, 'work_description')}></textarea>
                            <ul className='parsley-errors-list'>
                                <li className='parsley-required font-12'> {this.state.error_editWorkDescription} </li>
                            </ul>
                        </div>
                        <a onClick={this.handleCancel} className="btn btn-warning btn-sm">Cancel</a>
                        <button type="submit" className="btn btn-primary btn-sm works-btn">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
          </div><hr/>
        </div>
      );
    }
  }
});
