var React = require('react');
var id = window.userid;

module.exports = React.createClass({
    getInitialState: function () {
        return {
            seminars: [],
            have_pic: false,
            sem_title: "",
            sem_date: "",
            sem_place: "",
            error_sem_image: "",
            error_sem_title: "",            
            error_sem_date: "",
            error_sem_place: "",
        };
    },
    componentWillMount: function() {
        this.fetchSeminars();
    },
    loadFile: function(e){
      if(e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg' ||  e.target.files[0].type == 'image/jpg') {
          var reader = new FileReader();
          reader.onload = imageIsLoaded;
          reader.readAsDataURL(e.target.files[0]);
        function imageIsLoaded(e) {
          $('#sem_pic').attr('src', e.target.result);          
          $('.work-img-add-achievement').addClass('pic_onupload');
        };
        this.setState({
          have_pic: true
        });
      }
    },
    fetchSeminars: function() {
        $.ajax({
            type: "GET",
            url: "/api/v1/seminars/student/"+id,
            error: function(){
                this.fetchSeminars();
                return;
            }.bind(this),
            success: function(response){
                this.setState({
                    seminars: response
                });
            }.bind(this)
        });
    },
    showseminarModal: function() {
        $('#seminar_title').removeClass('parsley-error');
        $('#seminar_date').removeClass('parsley-error');
        $('#seminar_place').removeClass('parsley-error');
        $('#sem_form')[0].reset();        
        $('.work-img-add-achievement').removeClass('pic_onupload');
        $('#sem_pic').attr('src', '/dist/img/add.png');
        this.setState({
            have_pic: false,
            sem_title: "",
            sem_date: "",
            sem_place: "",
            error_sem_image: "",
            error_sem_title: "",            
            error_sem_date: "",
            error_sem_place: ""
        });
        $("#seminarModal").modal('show');
    },
    handleChange(field, e){
        var state = {};
        state[field] = e.target.value;
        this.setState(state);
    },
    handleSubmit(e) {
        e.preventDefault();
        var formData = new FormData();
        var file = e.target[1].files;

        if(this.state.have_pic == true){
          formData.append('file', file[0]);
        }

        formData.append('seminar_title', this.state.sem_title);
        formData.append('seminar_date', this.state.sem_date);
        formData.append('seminar_place', this.state.sem_place);

        this.sendToServer(formData);
        return;
    },
    sendToServer(formData) {
        $.ajax({
            type: "POST",
            url: "/api/v1/seminars/student/create/"+id,
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function(){
                $(".add-btn-sem").html('<b>Adding</b> <i class="fa fa-circle-o-notch fa-spin"></i>');
            },
            error: function(jqXhr, json, errorThrown) {
                $(".save-personal").html('<b>Save Changes</b>');

              if(jqXhr.status === 422) {
                  var errors = jqXhr.responseJSON;
                  var semTitleMessage = errors['seminar_title'];
                  var semImage        = errors['file'];
                  var semDate         = errors['seminar_date'];
                  var semPlace        = errors['seminar_place'];

                  console.log(errors);

                  this.setState({
                      error_sem_title: semTitleMessage,
                      error_sem_image: semImage,
                      error_sem_date: semDate,
                      error_sem_place: semPlace,
                      submitted: false
                  });

                  if("seminar_title" in errors) {
                      $('#seminar_title').addClass('parsley-error').focus();
                  } else {
                      $('#seminar_title').removeClass('parsley-error');
                  }

                  if("seminar_date" in errors) {
                      $('#seminar_date').addClass('parsley-error').focus();
                  } else {
                      $('#seminar_date').removeClass('parsley-error');
                  }

                  if("seminar_place" in errors) {
                      $('#seminar_place').addClass('parsley-error').focus();
                  } else {
                      $('#seminar_place').removeClass('parsley-error');
                  }                  
              }
          }.bind(this),
            success: function(data) {
                $(".add-btn-sem").html('<b>Add</b>');
                $("#seminarModal").modal('hide');
                $('#sem_form')[0].reset();
                this.setState({
                    have_pic: false,
                    sem_title: "",
                    sem_date: "",
                    sem_place: ""
                });
                this.fetchSeminars();
            }.bind(this)
        });
    },
    render: function () {
        var seminars = this.state.seminars;
        var fetchSeminars = this.fetchSeminars;
        var studentSeminar = function(seminars) {
            return (
                <StudentSeminar key={seminars.id} id={seminars.id} seminars={seminars} seminars_image={seminars.seminar_image} fetchSeminars={fetchSeminars}/>
            );
        }
        return (
            <div>
                <div className="x_panel" id="seminar-tip">
                    <div className="x_content">
                        <div className="" role="tabpanel" data-example-id="togglable-tabs">
                          <ul id="myTab" className="nav nav-tabs bar_made" role="tablist">
                              <h2 className="profile-h2"><span className="fa fa-trophy"></span> Seminars </h2>
                          </ul>
                          <div className="row">

                              { this.state.seminars.map(studentSeminar) }

                              <div className="col-md-4 col-sm-4 col-xs-12">
                                  <div className="well-education-profile profile_view add_achievement_box_profile" onClick={this.showseminarModal}>
                                      <img src="/dist/img/plus.png" className="center-margin img-responsive add_seminar_image" />
                                      <div className="title_center col-xs-12 margin_top">
                                          <h4 className="font-18 gray2"> Add Seminar </h4>
                                      </div>
                                  </div>
                              </div>

                          </div>
                        </div>
                    </div>
                </div>
                <div id="seminarModal" className="modal fade" role="dialog" aria-hidden="true">
                    <div className="modal-dialog">
                        <form id="sem_form" className="modal-content form" onSubmit={this.handleSubmit}>
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h4>Add Seminar</h4>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="form col-md-12 form-horizontal form-label-left">
                                        <div className="row">
                                            <label className="control-label achievement-control-label col-md-4 col-sm-4 col-xs-12 font-14" > Upload Photo </label>
                                            <div className="col-md-3 col-sm-3 col-xs-12">
                                                <label htmlFor="sem_upload" className="work-img-add-achievement">
                                                    <img id="sem_pic" src="/dist/img/add.png" className="center-margin img-responsive pull-right" />
                                                </label>
                                                <ul className="parsley-errors-list ul-error-pic">
                                                    <li className="parsley-required"> {this.state.error_sem_image} </li>
                                                </ul>
                                            </div>
                                            <input id="sem_upload" className="outline-none col-md-5 col-sm-5 col-xs-12 hide-upload" onChange={this.loadFile} type="file" />
                                        </div>
                                        <div className="row">
                                            <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14" >Title *</label>
                                            <div className="form_education col-md-6 col-sm-6 col-xs-12">
                                                <input id="seminar_title" type="text" defaultValue="" onChange={this.handleChange.bind(this, 'sem_title')} className="form-control" placeholder="Seminar Title"/>
                                                <ul className="parsley-errors-list">
                                                    <li className="parsley-required font-12"> {this.state.error_sem_title} </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="control-label achievement-control-label-year col-md-4 col-sm-4 col-xs-12 font-14"> Date Attended *</label>                                            
                                            <div className="form_education col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                                                <input id="seminar_date" type="date" className="date-picker form-control" title="Click calendar icon to trigger Date Picker" onChange={this.handleChange.bind(this, 'sem_date')} required="required" />
                                                <span className="fa fa-calendar form-control-feedback"></span>
                                            </div>
                                            <div className="error-year-attended">
                                                <ul className="parsley-errors-list achievement-date col-md-offset-4 col-sm-8 col-xs-12">
                                                    <li className="parsley-required">
                                                        {this.state.error_sem_date}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="control-label achievement-control-label col-md-4 col-sm-4 col-xs-12 font-14" > Location </label>
                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                <input id="seminar_place" type="text" className="form-control" defaultValue="" onChange={this.handleChange.bind(this, 'sem_place')} placeholder="Location" col="90"/>
                                                <ul className="parsley-errors-list">
                                                    <li className="parsley-required font-12"> {this.state.error_sem_place} </li>
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
                                        <button type="submit" className="btn btn-primary btn-sm save-personal pull-right add-btn-sem">Add</button>
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

var StudentSeminar = React.createClass({
    getInitialState: function(){
        return{
            have_pic: false,
            sem_title: this.props.seminars.seminar_title,
            sem_date: this.props.seminars.seminar_date,
            sem_place: this.props.seminars.seminar_place,
            sem_image: this.props.seminars.seminar_image,
            error_edit_sem_title: "",  
            error_edit_sem_image: "",                      
            error_edit_sem_date: "",
            error_edit_sem_place: "",
        };        
    },  
    showImageSem: function(){
        $('#showImageSem'+this.props.id).modal('show');
    },
    showEditseminarModal: function() {
        this.setState({
            sem_title: this.props.seminars.seminar_title,
            sem_date: this.props.seminars.seminar_date,
            sem_place: this.props.seminars.seminar_place,
            sem_image: this.props.seminars.seminar_image,
            error_edit_sem_title: "",
            error_edit_sem_image: "",
            error_edit_sem_date: "",
            error_edit_sem_place: "",
            have_pic: false
        });
        if(this.props.seminars.seminar_image){
            $('#work-img-add-achievement'+this.props.id).addClass('pic_onupload');
        }        
        else{
            $('#work-img-add-achievement'+this.props.id).removeClass('pic_onupload');
            $('#sem_pic'+this.props.id).attr('src', '/dist/img/add.png');
        }
        $('#edit_seminar_title'+this.props.id).removeClass('parsley-error');
        $('#edit_seminar_date'+this.props.id).removeClass('parsley-error');
        $('#edit_seminar_place'+this.props.id).removeClass('parsley-error');
        $('#editsemModal'+this.props.id).modal('show');
    },
    componentDidMount:function(){
        $('#editsemModal'+this.props.id).on('hidden.bs.modal', function(){
            $('#sem_pic'+this.props.id).attr('src', this.props.seminars.seminar_image);
            this.setState({
                sem_title: this.props.seminars.seminar_title,
                sem_date: this.props.seminars.seminar_date,
                sem_place: this.props.seminars.seminar_place,
                sem_image: this.props.seminars.seminar_image,
                have_pic: false
            });
        }.bind(this));
    },
    loadFile: function(e){
      var id = this.props.id;
      if(e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg' ||  e.target.files[0].type == 'image/jpg') {
          var reader = new FileReader();
          reader.onload = imageIsLoaded;
          reader.readAsDataURL(e.target.files[0]);
        function imageIsLoaded(e) {
          $('#sem_pic'+id).attr('src', e.target.result);
          $('#work-img-add-achievement'+id).addClass('pic_onupload');
        };
      }
      this.setState({
        have_pic: true
      });
    },
    handleChange(field, e){
        var state = {};
        state[field] = e.target.value;
        this.setState(state);
    },
    saveData(e) {
        e.preventDefault();
        var formData = new FormData();
        var file = e.target[1].files;

        if(this.state.have_pic == true){
          formData.append('file', file[0]);
        }

        formData.append('seminar_title', this.state.sem_title);
        formData.append('seminar_date', this.state.sem_date);
        formData.append('seminar_place', this.state.sem_place);
        this.sendToServer(formData);
        return;
    },
    sendToServer(formData) {
        $.ajax({            
            type: "POST",
            url: "/api/v1/seminars/student/"+this.props.id,
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function(){
                $(".add-btn-sem").html('<b>Adding</b> <i class="fa fa-circle-o-notch fa-spin"></i>');
            },
            error: function(jqXhr, json, errorThrown) {
              $(".save-personal").html('<b>Save Changes</b>');

              if(jqXhr.status === 422) {
                  var errors = jqXhr.responseJSON;
                  var semTitleMessage = errors['seminar_title'];
                  var semImage        = errors['file'];
                  var semDate         = errors['seminar_date'];
                  var semPlace        = errors['seminar_place'];

                  console.log(errors);

                  this.setState({
                      error_edit_sem_title: semTitleMessage,
                      error_edit_sem_image: semImage,
                      error_edit_sem_date: semDate,
                      error_edit_sem_place: semPlace,
                      submitted: false
                  });

                  if("seminar_title" in errors) {
                      $('#edit_seminar_title'+this.props.id).addClass('parsley-error').focus();
                  } else {
                      $('#edit_seminar_title'+this.props.id).removeClass('parsley-error');
                  }

                  if("seminar_date" in errors) {
                      $('#edit_seminar_date'+this.props.id).addClass('parsley-error').focus();
                  } else {
                      $('#edit_seminar_date'+this.props.id).removeClass('parsley-error');
                  }

                  if("seminar_place" in errors) {
                      $('#edit_seminar_place'+this.props.id).addClass('parsley-error').focus();
                  } else {
                      $('#edit_seminar_place'+this.props.id).removeClass('parsley-error');
                  }                  
              }
          }.bind(this),
            success: function(data) {             
                $(".add-btn-sem").html('<b>Add</b>');   
                $('#editsemModal'+this.props.id).modal('hide');
                this.setState({
                    have_pic: false
                });
                this.props.fetchSeminars();
            }.bind(this)
        });
    },
    confirmDelete(e) {
        e.preventDefault();
        $("#deleteModalSem"+this.props.id).modal('show');
    },
    deleteSeminar(){
        var id = this.props.id;
        this.deleteToServer(id);
    },
    deleteToServer(id) {
        $.ajax({
            type: "DELETE",
            url: "/api/v1/seminars/delete/"+id,
            data: {
                id: this.props.id
            },
            beforeSend: function(){
                $(".btn-delete-sem").html('<b>Deleting </b><i class="fa fa-circle-o-notch fa-spin"></i>');
            },
            success: function(data) {
                $(".btn-delete-sem").html('<b>Delete</b>');
                $("#deleteModalSem"+this.props.id).modal('hide');
                $("#deletesem_"+this.props.id).parent('div').fadeOut();
            }.bind(this)
        });
    },
    render: function() {
        if(this.props.seminars.seminar_image){
            var sem_image = this.props.seminars.seminar_image;
        }
        else{
            var sem_image = "/dist/img/plus.png";
        }

        if(this.props.seminars.seminar_image)
        {
            return (
                <div className="col-md-4 col-sm-4 col-xs-12">
                    <div className="thumbnail-profile" id={"deletesem_"+this.props.id}>
                        <div className="image-profile view view-first">
                          <img className="brief center-margin img-responsive school_image_achievement" src={sem_image} alt="image" />
                          <div className="mask">
                            <p> {this.props.seminars.seminar_place} <br/> {this.props.seminars.seminar_date} </p>
                            <div className="tools">
                              <a role="button" title="View Image" onClick={this.showImageSem}><i className="fa fa-external-link"></i></a>
                              <a role="button" title="Edit" onClick={this.showEditseminarModal}><i className="fa fa-pencil"></i></a>
                              <a role="button" title="Delete" onClick={this.confirmDelete}><i className="fa fa-trash"></i></a>                              
                            </div>
                          </div>
                        </div>
                        <div className="caption text-center footer-tips-href">
                          <h5> {this.props.seminars.seminar_title} </h5>
                        </div>
                    </div>
                    <div id={"editsemModal"+this.props.id} className="modal fade" role="dialog" aria-hidden="true">
                        <div className="modal-dialog">
                            <form id={"sem_form"+this.props.id} className="modal-content form" onSubmit={this.saveData}>
                                 <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    <h4>Edit Seminar</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <div className="form col-md-12 form-horizontal form-label-left">
                                            <div className="row">
                                                <label className="control-label achievement-control-label col-md-4 col-sm-4 col-xs-12 font-14" > Upload Photo </label>
                                                <div className="col-md-3 col-sm-3 col-xs-12">
                                                    <label htmlFor={"sem_upload"+this.props.id} className="pic_onupload work-img-add-achievement" id={"work-img-add-achievement"+this.props.id}>
                                                        <img id={"sem_pic"+this.props.id} src={sem_image} className="center-margin img-responsive pull-right" />
                                                    </label>
                                                    <ul className="parsley-errors-list ul-error-pic">
                                                        <li className="parsley-required"> {this.state.error_edit_sem_image} </li>
                                                    </ul>
                                                </div>
                                                <input id={"sem_upload"+this.props.id} className="outline-none col-md-5 col-sm-5 col-xs-12 hide-upload" onChange={this.loadFile} type="file" />                                                
                                            </div>
                                            <div className="row">
                                                <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14" >Title *</label>
                                                <div className="form_education col-md-6 col-sm-6 col-xs-12">
                                                    <input id={"edit_seminar_title"+this.props.id} type="text" value={this.state.sem_title} onChange={this.handleChange.bind(this, 'sem_title')} className="form-control" placeholder="Seminar Title"/>
                                                    <ul className="parsley-errors-list">
                                                        <li className="parsley-required"> {this.state.error_edit_sem_title} </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <label className="control-label achievement-control-label-year col-md-4 col-sm-4 col-xs-12 font-14"> Date Attended *</label>                                            
                                                <div className="form_education col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                                                    <input id={"edit_seminar_date"+this.props.id} type="date" className="date-picker form-control" value={this.state.sem_date} title="Click calendar icon to trigger Date Picker" onChange={this.handleChange.bind(this, 'sem_date')} required="required" />
                                                    <span className="fa fa-calendar form-control-feedback"></span>
                                                </div>
                                                <div className="error-year-attended">
                                                    <ul className="parsley-errors-list achievement-date col-md-offset-4 col-sm-8 col-xs-12">
                                                        <li className="parsley-required">
                                                            {this.state.error_edit_sem_date}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <label className="control-label achievement-control-label col-md-4 col-sm-4 col-xs-12 font-14" > Location </label>
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <input id={"edit_seminar_place"+this.props.id} type="text" className="form-control" value={this.state.sem_place} onChange={this.handleChange.bind(this, 'sem_place')} placeholder="Location" col="90"/>
                                                    <ul className="parsley-errors-list">
                                                        <li className="parsley-required"> {this.state.edit_seminar_place} </li>
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
                                            <button type="submit" className="btn btn-primary btn-sm save-personal pull-right">Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id={"showImageSem"+this.props.id} className="modal fade" role="dialog" aria-hidden="true">
                        <div className="modal-dialog">
                            <form id={"sem_form"+this.props.id} className="modal-content form" onSubmit={this.handleSubmit}>
                                 <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    <h4>Seminar Image</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <img className="center-margin img-responsive" src={this.state.sem_image}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id={"deleteModalSem"+this.props.id} className="modal fade" role="dialog" aria-hidden="true">
                        <div className="modal-dialog">
                            <form className="modal-content form">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    <h3>Delete Seminar</h3>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <h4>Are you sure you want to delete this Seminar?</h4>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="x_footer x_modal_foot">
                                        <div className="form-group has-feedback">
                                            <a className="btn btn-primary btn-sm pull-left btn-delete-sem" aria-hidden="true" onClick={this.deleteSeminar}>Confirm</a>
                                            <a className="btn btn-warning btn-sm save-personal pull-right" data-dismiss="modal">Cancel</a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="col-md-4 col-sm-4 col-xs-12">
                    <div className="well profile_view achieve_info_profile " id={"deletesem_"+this.props.id}>
                        <ul className="nav navbar-right panel_toolbox edit_delete">
                            <li>
                                <a role="button" data-tooltip="Edit" onClick={this.showEditseminarModal}>
                                    <i className="fa fa-pencil font-large"></i>
                                </a>
                            </li>
                            <li>
                                <a role="button" data-tooltip="Delete" onClick={this.confirmDelete}>
                                    <i className="fa fa-trash font-large"></i>
                                </a>
                            </li>
                        </ul>
                        <div className="title_center col-xs-12 margin_top">
                            <h2 className="font-18"> {this.props.seminars.seminar_title} </h2>
                            <ul className="list-unstyled">
                                <li> { this.props.seminars.seminar_place}  </li>
                                <li> { this.props.seminars.seminar_date } </li>
                            </ul>
                        </div>
                    </div>
                    <div id={"editsemModal"+this.props.id} className="modal fade" role="dialog" aria-hidden="true">
                        <div className="modal-dialog">
                            <form id={"sem_form"+this.props.id} className="modal-content form" onSubmit={this.saveData}>
                                 <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    <h4>Edit Seminar</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <div className="form col-md-12 form-horizontal form-label-left">
                                            <div className="row">
                                                <label className="control-label achievement-control-label col-md-4 col-sm-4 col-xs-12 font-14" > Upload Photo </label>
                                                <div className="col-md-3 col-sm-3 col-xs-12">
                                                    <label htmlFor={"sem_upload"+this.props.id} className="pic_onupload work-img-add-achievement" id={"work-img-add-achievement"+this.props.id}>
                                                        <img id={"sem_pic"+this.props.id} src={sem_image} className="center-margin img-responsive pull-right" />
                                                    </label>
                                                    <ul className="parsley-errors-list ul-error-pic">
                                                        <li className="parsley-required"> {this.state.error_edit_sem_image} </li>
                                                    </ul>
                                                </div>
                                                <input id={"sem_upload"+this.props.id} className="outline-none col-md-5 col-sm-5 col-xs-12 hide-upload" onChange={this.loadFile} type="file" />
                                            </div>
                                            <div className="row">
                                                <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14" >Title *</label>
                                                <div className="form_education col-md-6 col-sm-6 col-xs-12">
                                                    <input id={"edit_seminar_title"+this.props.id} type="text" defaultValue={this.state.sem_title} onChange={this.handleChange.bind(this, 'sem_title')} className="form-control" placeholder="Seminar Title"/>
                                                    <ul className="parsley-errors-list">
                                                        <li className="parsley-required"> {this.state.error_edit_sem_title} </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <label className="control-label achievement-control-label-year col-md-4 col-sm-4 col-xs-12 font-14"> Date Attended *</label>                                            
                                                <div className="form_education col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                                                    <input id={"edit_seminar_date"+this.props.id} type="date" className="date-picker form-control" defaultValue={this.state.sem_date} title="Click calendar icon to trigger Date Picker" onChange={this.handleChange.bind(this, 'sem_date')} required="required" />
                                                    <span className="fa fa-calendar form-control-feedback"></span>
                                                </div>
                                                <div className="error-year-attended">
                                                    <ul className="parsley-errors-list achievement-date col-md-offset-4 col-sm-8 col-xs-12">
                                                        <li className="parsley-required">
                                                            {this.state.error_edit_sem_date}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <label className="control-label achievement-control-label col-md-4 col-sm-4 col-xs-12 font-14" > Location </label>
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <input id={"edit_seminar_place"+this.props.id} type="text" className="form-control" defaultValue={this.state.sem_place} onChange={this.handleChange.bind(this, 'sem_place')} placeholder="Location" col="90"/>
                                                    <ul className="parsley-errors-list">
                                                        <li className="parsley-required"> {this.state.error_edit_sem_place} </li>
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
                                            <button type="submit" className="btn btn-primary btn-sm save-personal pull-right">Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id={"deleteModalSem"+this.props.id} className="modal fade" role="dialog" aria-hidden="true">
                        <div className="modal-dialog">
                            <form className="modal-content form">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    <h3>Delete Seminar</h3>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <h4>Are you sure you want to delete this Seminar?</h4>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="x_footer x_modal_foot">
                                        <div className="form-group has-feedback">
                                            <a className="btn btn-primary btn-sm pull-left btn-delete-sem" aria-hidden="true" onClick={this.deleteSeminar}>Confirm</a>
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
    }
});
