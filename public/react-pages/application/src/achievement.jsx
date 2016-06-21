var React = require('react');
var id = window.userid;

module.exports = React.createClass({
    getInitialState: function () {
        return {
            achievements: [],
            have_pic: false,
            achieve_title: "",
            achieve_date: "",
            achieve_desc: "",
            error_achieve_title: "",
            error_achieve_image: "",
            error_achieve_date: "",
            error_achieve_desc: "",
        };
    },
    componentWillMount: function() {
        this.fetchAchievement();
    },
    loadFile: function(e){
      if(e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpeg' ||  e.target.files[0].type == 'image/jpg') {
          var reader = new FileReader();
          reader.onload = imageIsLoaded;
          reader.readAsDataURL(e.target.files[0]);
        function imageIsLoaded(e) {
          $('#achieve_pic').attr('src', e.target.result);          
          $('.work-img-add-achievement').addClass('pic_onupload');
        };
        this.setState({
          have_pic: true
        });
      }
    },
    fetchAchievement: function() {
        $.ajax({
			type: "GET",
			url: "/api/v1/achievements/student/"+id,
			error: function(){
				this.fetchAchievement();
				return;
			}.bind(this),
			success: function(response){
				this.setState({
					achievements: response
				});
			}.bind(this)
		});
    },
    showAchievementModal: function() {
        $('#achieve_title').removeClass('parsley-error');
        $('#achieve_date').removeClass('parsley-error');
        $('#achieve_description').removeClass('parsley-error');
        $('#achieve_form')[0].reset();        
        $('.work-img-add-achievement').removeClass('pic_onupload');
        $('#achieve_pic').attr('src', '/dist/img/add.png');
        this.setState({
            have_pic: false,
            achieve_title: "",
            achieve_date: "",
            achieve_desc: "",
            error_achieve_title: "",
            error_achieve_image: "",
            error_achieve_date: "",
            error_achieve_desc: ""
        });
        $("#achievementModal").modal('show');
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

        formData.append('achieve_title', this.state.achieve_title);
        formData.append('achieve_date', this.state.achieve_date);
        formData.append('achieve_description', this.state.achieve_desc);

        this.sendToServer(formData);
        return;
    },
    sendToServer(formData) {
        $.ajax({
            type: "POST",
            url: "/api/v1/achievements/student/create/"+id,
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function(){
                $(".add-btn-achv").html('<b>Adding</b> <i class="fa fa-circle-o-notch fa-spin"></i>');
            },
            error: function(jqXhr, json, errorThrown) {
            $(".save-personal").html('<b>Save Changes</b>');

              if(jqXhr.status === 422) {
                  var errors = jqXhr.responseJSON;
                  var achvTitle = errors['achieve_title'];
                  var achvImage = errors['file'];
                  var achvDate  = errors['achieve_date'];
                  var achvDesc  = errors['achieve_description'];

                  console.log(errors);

                  this.setState({
                      error_achieve_title: achvTitle,
                      error_achieve_image: achvImage,
                      error_achieve_date: achvDate,
                      error_achieve_desc: achvDesc,
                      submitted: false
                  });

                  if("achieve_title" in errors) {
                      $('#achieve_title').addClass('parsley-error').focus();
                  } else {
                      $('#achieve_title').removeClass('parsley-error');
                  }
                  if("achieve_date" in errors) {
                      $('#achieve_date').addClass('parsley-error').focus();
                  } else {
                      $('#achieve_date').removeClass('parsley-error');
                  }
                  if("achieve_description" in errors) {
                      $('#achieve_description').addClass('parsley-error').focus();
                  } else {
                      $('#achieve_description').removeClass('parsley-error');
                  }
              }
          }.bind(this),
            success: function(data) {
                $(".add-btn-achv").html('<b>Add</b>');
                $("#achievementModal").modal('hide');
                $('#achieve_form')[0].reset();
                $('#achieve_title').removeClass('parsley-error');
                $('#achieve_date').removeClass('parsley-error');
                $('#achieve_description').removeClass('parsley-error');

                this.setState({
                    have_pic: false,
                    achieve_title: "",
                    achieve_date: "",
                    achieve_desc: "",
                    error_achieve_title: "",
                    error_achieve_image: "",
                    error_achieve_date: "",
                    error_achieve_desc: "",
                });

                this.fetchAchievement();
            }.bind(this)
        });
    },
    render: function () {
        var fetchAchievement = this.fetchAchievement;
        var achievements = this.state.achievements;
        var studentAchievement = function(achievements) {
            return (
                <StudentAchievement key={achievements.id} id={achievements.id} achievements={achievements} fetchAchievement={fetchAchievement}/>
            );
        }
        return (
            <div>
                <div className="x_panel" id="achievement-tip">
                    <div className="x_content">
                        <div className="" role="tabpanel" data-example-id="togglable-tabs">
                          <ul id="myTab" className="nav nav-tabs bar_made" role="tablist">
                              <h2 className="profile-h2"><span className="fa fa-trophy"></span> Achievement </h2>
                          </ul>
                          <div className="row">

                              { this.state.achievements.map(studentAchievement) }


                              <div className="col-md-4 col-sm-4 col-xs-12">
                                  <div className="well-education-profile profile_view add_achievement_box_profile" onClick={this.showAchievementModal}>
                                      <img src="/dist/img/plus.png" className="center-margin img-responsive add_seminar_image" />
                                      <div className="title_center col-xs-12 margin_top">
                                          <h4 className="font-18 gray2"> Add Achievement </h4>
                                      </div>
                                  </div>
                              </div>

                          </div>
                        </div>
                    </div>
                </div>
                <div id="achievementModal" className="modal fade" role="dialog" aria-hidden="true">
                    <div className="modal-dialog">
                        <form id="achieve_form" className="modal-content form" onSubmit={this.handleSubmit}>
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h4>Add Achievement</h4>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="form col-md-12 form-horizontal form-label-left">
                                        <div className="row">
                                            <label className="control-label achievement-control-label col-md-4 col-sm-4 col-xs-12 font-14" > Upload Photo </label>
                                            <div className="col-md-3 col-sm-3 col-xs-12">
                                                <label htmlFor="achieve_upload" className="work-img-add-achievement">
                                                    <img id="achieve_pic" src="/dist/img/add.png" className="center-margin img-responsive pull-right" />                                                    
                                                </label>
                                                <ul className="parsley-errors-list ul-error-pic">
                                                    <li className="parsley-required"> {this.state.error_achieve_image} </li>
                                                </ul>
                                            </div>
                                            <input id="achieve_upload" className="outline-none col-md-5 col-sm-5 col-xs-12 hide-upload" onChange={this.loadFile} type="file" />
                                        </div>
                                        <div className="row">
                                            <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14" >Title *</label>
                                            <div className="form_education col-md-6 col-sm-6 col-xs-12">
                                                <input id="achieve_title" type="text" defaultValue="" onChange={this.handleChange.bind(this, 'achieve_title')} className="form-control" placeholder="Achievement Title"/>
                                                <ul className="parsley-errors-list">
                                                    <li className="parsley-required"> {this.state.error_achieve_title} </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="control-label achievement-control-label-year col-md-4 col-sm-4 col-xs-12 font-14"> Date Achieved *</label>                                            
                                            <div className="form_education col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                                                <input id="achieve_date" type="date" className="date-picker form-control" title="Click calendar icon to trigger Date Picker" onChange={this.handleChange.bind(this, 'achieve_date')}  required="required" />
                                                <span className="fa fa-calendar form-control-feedback"></span>
                                            </div>
                                            <div className="error-year-attended">
                                                <ul className="parsley-errors-list achievement-date col-md-offset-4 col-sm-8 col-xs-12">
                                                    <li className="parsley-required"> {this.state.error_achieve_date} </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="control-label achievement-control-label col-md-4 col-sm-4 col-xs-12 font-14" > Description </label>
                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                <textarea id="achieve_description" className="form-control" defaultValue="" onChange={this.handleChange.bind(this, 'achieve_desc')} placeholder="Description" col="90"></textarea>
                                                <ul className="parsley-errors-list error-year-attended col-md-offset-4 col-sm-8 col-xs-12">
                                                    <li className="parsley-required"> {this.state.error_achieve_desc} </li>
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
                                        <button type="submit" className="btn btn-primary btn-sm save-personal pull-right add-btn-achv">Add</button>
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

var StudentAchievement = React.createClass({
    getInitialState: function(){
        return{
            achieve_title: this.props.achievements.achieve_title,
            achieve_date: this.props.achievements.achieve_date,
            achieve_desc: this.props.achievements.achieve_description,
            achieve_image: this.props.achievements.achieve_image,
            error_edit_achieve_title: "",
            error_edit_achieve_image: "",
            error_edit_achieve_date: "",
            error_edit_achieve_desc: "",
            have_pic: false
        };        
    },
    showImageAchv: function(){
        $('#showImageAchv'+this.props.id).modal('show');
    },
    showEditAchievementModal: function() {
        $('#edit_achieve_title'+this.props.id).removeClass('parsley-error');
        $('#edit_achieve_date'+this.props.id).removeClass('parsley-error');
        $('#edit_achieve_description'+this.props.id).removeClass('parsley-error');        
        this.setState({
            achieve_title: this.props.achievements.achieve_title,
            achieve_date: this.props.achievements.achieve_date,
            achieve_desc: this.props.achievements.achieve_description,
            achieve_image: this.props.achievements.achieve_image,
            error_edit_achieve_title: "",
            error_edit_achieve_image: "",
            error_edit_achieve_date: "",
            error_edit_achieve_desc: "",
            have_pic: false
        });
        if(this.state.achieve_image){
            $('#work-img-add-achievement'+this.props.id).addClass('pic_onupload');
        }        
        else{
            $('#work-img-add-achievement'+this.props.id).removeClass('pic_onupload');
            $('#achieve_pic'+this.props.id).attr('src', '/dist/img/add.png');
        }
        $('#editachvModal'+this.props.id).modal('show');        
    },
    componentDidMount:function(){
        $('#editachvModal'+this.props.achievements.id).on('hidden.bs.modal', function(){
            $('#achieve_pic'+this.props.achievements.id).attr('src', this.props.achievements.achieve_image);
            this.setState({
                achieve_title: this.props.achievements.achieve_title,
                achieve_date: this.props.achievements.achieve_date,
                achieve_desc: this.props.achievements.achieve_description,
                achieve_image: this.props.achievements.achieve_image,
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
          $('#achieve_pic'+id).attr('src', e.target.result);
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

        formData.append('achieve_title', this.state.achieve_title);
        formData.append('achieve_date', this.state.achieve_date);
        formData.append('achieve_description', this.state.achieve_desc);

        this.sendToServer(formData);
        return;
    },
    sendToServer(formData) {
        $.ajax({
            type: "POST",
            url: "/api/v1/achievements/student/"+this.props.id,
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function(){
                $(".add-btn-achv").html('<b>Adding</b> <i class="fa fa-circle-o-notch fa-spin"></i>');
            },
            error: function(jqXhr, json, errorThrown) {
                $(".save-personal").html('<b>Save Changes</b>');

                  if(jqXhr.status === 422) {
                      var errors = jqXhr.responseJSON;
                      var achvTitle = errors['achieve_title'];
                      var achvImage = errors['file'];
                      var achvDate  = errors['achieve_date'];
                      var achvDesc  = errors['achieve_description'];

                      console.log(errors);

                      this.setState({
                          error_edit_achieve_title: achvTitle,
                          error_edit_achieve_image: achvImage,
                          error_edit_achieve_date: achvDate,
                          error_edit_achieve_desc: achvDesc,
                          submitted: false
                      });

                      if("achieve_title" in errors) {
                          $('#edit_achieve_title'+this.props.id).addClass('parsley-error').focus();
                      } else {
                          $('#edit_achieve_title'+this.props.id).removeClass('parsley-error');
                      }
                      if("achieve_date" in errors) {
                          $('#edit_achieve_date'+this.props.id).addClass('parsley-error').focus();
                      } else {
                          $('#edit_achieve_date'+this.props.id).removeClass('parsley-error');
                      }
                      if("achieve_description" in errors) {
                          $('#edit_achieve_description'+this.props.id).addClass('parsley-error').focus();
                      } else {
                          $('#edit_achieve_description'+this.props.id).removeClass('parsley-error');
                      }
                  }
            }.bind(this),
            success: function(data) {                
                $(".add-btn-achv").html('<b>Add</b>');
                $('#editachvModal'+this.props.id).modal('hide');

                this.setState({
                    error_edit_achieve_title: "",
                    error_edit_achieve_image: "",
                    error_edit_achieve_date: "",
                    error_edit_achieve_desc: "",
                    have_pic: false                 
                });   

                

                this.props.fetchAchievement();
            }.bind(this)
        });
    },
    confirmDelete(e) {
        e.preventDefault();
        $("#deleteModalAchv"+this.props.id).modal('show');
    },
    deleteAchievement(){
        var id = this.props.id;
        this.deleteToServer(id);
    },
    deleteToServer(id) {
        $.ajax({
            type: "DELETE",
            url: "/api/v1/achievements/delete/"+id,
            data: {
                id: this.props.id
            },
            beforeSend: function(){
                $(".btn-delete-achv").html('<b>Deleting </b><i class="fa fa-circle-o-notch fa-spin"></i>');
            },
            success: function(data) {
                $(".btn-delete-achv").html('<b>Delete</b>');
                $("#deleteModalAchv"+this.props.id).modal('hide');
                $("#deleteachv_"+this.props.id).parent('div').fadeOut();
            }.bind(this)
        });
    },
    render: function() {
        if(this.props.achievements.achieve_image){
            var achieve_image = this.props.achievements.achieve_image;
        }
        else{
            var achieve_image = "/dist/img/plus.png";
        }

        if(this.props.achievements.achieve_image)
        {
            return (
                <div className="col-md-4 col-sm-4 col-xs-12">
                    <div className="thumbnail-profile" id={"deleteachv_"+this.props.id}>
                        <div className="image-profile view view-first">
                          <img className="brief center-margin img-responsive school_image_achievement" src={this.props.achievements.achieve_image} alt="image" />
                          <div className="mask">
                            <p> {this.props.achievements.achieve_description} <br/> {this.props.achievements.achieve_date} </p>
                            <div className="tools">
                              <a role="button" title="View Image" onClick={this.showImageAchv}><i className="fa fa-external-link"></i></a>
                              <a role="button" title="Edit" onClick={this.showEditAchievementModal}><i className="fa fa-pencil"></i></a>
                              <a role="button" title="Delete" onClick={this.confirmDelete}><i className="fa fa-trash"></i></a>                              
                            </div>
                          </div>
                        </div>
                        <div className="caption text-center footer-tips-href">
                          <h5> {this.props.achievements.achieve_title} </h5>
                        </div>
                    </div>
                    <div id={"editachvModal"+this.props.id} className="modal fade" role="dialog" aria-hidden="true">
                        <div className="modal-dialog">
                            <form id={"achieve_form"+this.props.id} className="modal-content form" onSubmit={this.saveData}>
                                 <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    <h4>Edit Achievement</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <div className="form col-md-12 form-horizontal form-label-left">
                                            <div className="row">
                                                <label className="control-label achievement-control-label col-md-4 col-sm-4 col-xs-12 font-14" > Upload Photo </label>
                                                <div className="col-md-3 col-sm-3 col-xs-12">
                                                    <label htmlFor={"achieve_upload"+this.props.id} className="pic_onupload work-img-add-achievement" id={"work-img-add-achievement"+this.props.id}>
                                                        <img id={"achieve_pic"+this.props.id} src={achieve_image} className="center-margin img-responsive pull-right" />
                                                    </label>
                                                    <ul className="parsley-errors-list ul-error-pic">
                                                        <li className="parsley-required"> {this.state.error_edit_achieve_image} </li>
                                                    </ul>
                                                </div>
                                                <input id={"achieve_upload"+this.props.id} className="outline-none col-md-5 col-sm-5 col-xs-12 hide-upload" onChange={this.loadFile} type="file" />
                                            </div>
                                            <div className="row">
                                                <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14" >Title *</label>
                                                <div className="form_education col-md-6 col-sm-6 col-xs-12">
                                                    <input id={"edit_achieve_title"+this.props.id} type="text" value={this.state.achieve_title} onChange={this.handleChange.bind(this, 'achieve_title')} className="form-control" placeholder="Achievement Title"/>
                                                    <ul className="parsley-errors-list">
                                                        <li className="parsley-required">
                                                          {this.state.error_edit_achieve_title}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <label className="control-label achievement-control-label-year col-md-4 col-sm-4 col-xs-12 font-14"> Date Achieved *</label>                                            
                                                <div className="form_education col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                                                    <input id={"edit_achieve_date"+this.props.id}type="date" className="date-picker form-control" value={this.state.achieve_date} title="Click calendar icon to trigger Date Picker" onChange={this.handleChange.bind(this, 'achieve_date')} required="required" />
                                                    <span className="fa fa-calendar form-control-feedback"></span>
                                                </div>
                                                <div className="error-year-attended">
                                                    <ul className="parsley-errors-list achievement-date col-md-offset-4 col-sm-8 col-xs-12">
                                                        <li className="parsley-required">
                                                            {this.state.error_edit_achieve_date}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <label className="control-label achievement-control-label col-md-4 col-sm-4 col-xs-12 font-14" > Description </label>
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <textarea id={"edit_achieve_description"+this.props.id} className="form-control" value={this.state.achieve_desc} onChange={this.handleChange.bind(this, 'achieve_desc')} placeholder="Description" col="90"></textarea>
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
                    <div id={"showImageAchv"+this.props.id} className="modal fade" role="dialog" aria-hidden="true">
                        <div className="modal-dialog">
                            <form id={"achieve_form"+this.props.id} className="modal-content form" onSubmit={this.handleSubmit}>
                                 <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    <h4>Achievement Image</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <img className="center-margin img-responsive" src={this.props.achievements.achieve_image}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id={"deleteModalAchv"+this.props.id} className="modal fade" role="dialog" aria-hidden="true">
                        <div className="modal-dialog">
                            <form className="modal-content form">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    <h3>Delete Achievement</h3>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <h4>Are you sure you want to delete this Achievement?</h4>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="x_footer x_modal_foot">
                                        <div className="form-group has-feedback">
                                            <a className="btn btn-primary btn-sm pull-left btn-delete-achv" aria-hidden="true" onClick={this.deleteAchievement}>Confirm</a>
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
                    <div className="well profile_view achieve_info_profile" id={"deleteachv_"+this.props.id}>
                        <ul className="nav navbar-right panel_toolbox edit_delete">
                            <li>
                                <a role="button" data-tooltip="Edit" onClick={this.showEditAchievementModal}>
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
                            <h2 className="font-18"> {this.props.achievements.achieve_title} </h2>
                            <ul className="list-unstyled">
                                <li> { this.props.achievements.achieve_description}  </li>
                                <li> { this.props.achievements.achieve_date } </li>
                            </ul>
                        </div>
                    </div>
                    <div id={"editachvModal"+this.props.id} className="modal fade" role="dialog" aria-hidden="true">
                        <div className="modal-dialog">
                            <form id={"achieve_form"+this.props.id} className="modal-content form" onSubmit={this.saveData}>
                                 <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    <h4>Edit Achievement</h4>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <div className="form col-md-12 form-horizontal form-label-left">
                                            <div className="row">
                                                <label className="control-label achievement-control-label col-md-4 col-sm-4 col-xs-12 font-14" > Upload Photo </label>
                                                <div className="col-md-3 col-sm-3 col-xs-12">
                                                    <label htmlFor={"achieve_upload"+this.props.id} className="pic_onupload work-img-add-achievement" id={"work-img-add-achievement"+this.props.id}>
                                                        <img id={"achieve_pic"+this.props.id} src={achieve_image} className="center-margin img-responsive pull-right" />
                                                    </label>
                                                    <ul className="parsley-errors-list ul-error-pic">
                                                        <li className="parsley-required"> {this.state.error_edit_achieve_image} </li>
                                                    </ul>
                                                </div>
                                                <input id={"achieve_upload"+this.props.id} className="outline-none col-md-5 col-sm-5 col-xs-12 hide-upload" onChange={this.loadFile} type="file" />
                                            </div>
                                            <div className="row">
                                                <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14" >Title *</label>
                                                <div className="form_education col-md-6 col-sm-6 col-xs-12">
                                                    <input id={"edit_achieve_title"+this.props.id} type="text" value={this.state.achieve_title} onChange={this.handleChange.bind(this, 'achieve_title')} className="form-control" placeholder="Achievement Title"/>
                                                    <ul className="parsley-errors-list">
                                                        <li className="parsley-required"> 
                                                            {this.state.error_edit_achieve_title} 
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <label className="control-label achievement-control-label-year col-md-4 col-sm-4 col-xs-12 font-14"> Date Achieved *</label>                                            
                                                <div className="form_education col-md-6 col-sm-6 col-xs-12 form-group has-feedback">
                                                    <input id={"edit_achieve_date"+this.props.id} type="date" className="date-picker form-control" value={this.state.achieve_date} title="Click calendar icon to trigger Date Picker" onChange={this.handleChange.bind(this, 'achieve_date')} required="required" />
                                                    <span className="fa fa-calendar form-control-feedback"></span>
                                                </div>
                                                <div className="error-year-attended">
                                                    <ul className="parsley-errors-list achievement-date col-md-offset-4 col-sm-8 col-xs-12">
                                                        <li className="parsley-required">
                                                            {this.state.error_edit_achieve_date}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <label className="control-label achievement-control-label col-md-4 col-sm-4 col-xs-12 font-14" > Description </label>
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <textarea id={"edit_achieve_description"+this.props.id} className="form-control" value={this.state.achieve_desc} onChange={this.handleChange.bind(this, 'achieve_desc')} placeholder="Description" col="90"></textarea>
                                                    <ul className="parsley-errors-list">
                                                        <li className="parsley-required"> 
                                                            {this.state.error_edit_achieve_desc} 
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
                                            <button type="submit" className="btn btn-primary btn-sm save-personal pull-right">Save Changes</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id={"deleteModalAchv"+this.props.id} className="modal fade" role="dialog" aria-hidden="true">
                        <div className="modal-dialog">
                            <form className="modal-content form">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    <h3>Delete Achievement</h3>
                                </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <h4>Are you sure you want to delete this Achievement?</h4>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <div className="x_footer x_modal_foot">
                                        <div className="form-group has-feedback">
                                            <a className="btn btn-primary btn-sm pull-left btn-delete-achv" aria-hidden="true" onClick={this.deleteAchievement}>Confirm</a>
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
