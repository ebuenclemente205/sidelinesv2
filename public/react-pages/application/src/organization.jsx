var React = require('react');
var id = window.userid;

module.exports = React.createClass({
    getInitialState: function() {
        return {
            organizations: [],
            org_name: "",
            org_position: "",
            org_start: "",
            org_end: "",
            error_org_name: "",
            error_org_position: "",
            error_org_start: "",
            error_org_end: ""
        };
    },
    componentWillMount: function() {
        this.fetchOrganization();
    },
    fetchOrganization: function() {
        $.ajax({
            type: "GET",
			url: "/api/v1/organizations/student/"+id,
			error: function(){
				this.fetchOrganization();
				return;
			}.bind(this),
			success: function(response){
				this.setState({
					organizations: response
				});

			}.bind(this)
        });
    },
    showOrganizationModal: function() {
        $('#org_name').removeClass('parsley-error');
        $('#org_position').removeClass('parsley-error');
        $('#org_end').removeClass('parsley-error');
        $('#org_start').removeClass('parsley-error');
        $('#org_form')[0].reset();
        $("#organizationModal").modal('show');
        this.setState({
            org_name: "",
            org_position: "",
            org_start: "",
            org_end: "",
            error_org_name: "",
            error_org_position: "",
            error_org_start: "",
            error_org_end: ""
        });
    },    
    handleChange(field, e){
        var state = {};
        state[field] = e.target.value;
        this.setState(state);
    },
    handleSubmit(e) {
        e.preventDefault();
        var formData = new FormData();

        formData.append('org_name', this.state.org_name);
        formData.append('org_position', this.state.org_position);
        formData.append('org_start', this.state.org_start);
        formData.append('org_end', this.state.org_end);

        this.sendToServer(formData);
        return;
    },
    sendToServer(formData) {
        $.ajax({
            type: "POST",
            url: "/api/v1/organizations/student/create/"+id,
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function(){
                $(".add-btn-org").html('<b>Adding</b> <i class="fa fa-circle-o-notch fa-spin"></i>');
            },
            error: function(jqXhr, json, errorThrown) {
                $(".save-personal").html('<b>Save Changes</b>');

                  if(jqXhr.status === 422) {
                      var errors = jqXhr.responseJSON;
                      var orgNameMessage     = errors['org_name'];
                      var orgPositionMessage = errors['org_position'];
                      var orgStartMessage    = errors['org_start'];
                      
                      if("org_end" in errors ){
                         var orgEndMessage = errors['org_end'][0];
                       }
                       else{
                         var orgEndMessage = errors['org_end'];
                       }

                      console.log(errors);

                      this.setState({
                           error_org_name: orgNameMessage,
                           error_org_position: orgPositionMessage,
                           error_org_start: orgStartMessage,
                           error_org_end: orgEndMessage,
                           submitted: false
                      });
                      

                      if("org_name" in errors) {
                          $('#org_name').addClass('parsley-error').focus();
                      } else {
                          $('#org_name').removeClass('parsley-error');
                      }

                      if("org_position" in errors) {
                          $('#org_position').addClass('parsley-error').focus();
                      } else {
                          $('#org_position').removeClass('parsley-error');
                      }

                      if("org_end" in errors) {
                          $('#org_end').addClass('parsley-error').focus();
                          $('#org_start').addClass('parsley-error');
                          
                      } else {                          
                          $('#org_end').removeClass('parsley-error');
                          $('#org_start').removeClass('parsley-error');
                      }
                  }
            }.bind(this),
            success: function(data) {
                $(".add-btn-org").html('<b>Add</b>');
                $("#organizationModal").modal('hide');
                $('#org_form')[0].reset();
                this.setState({
                    org_name: "",
                    org_position: "",
                    org_start: "",
                    org_end: ""
                });
                this.fetchOrganization();
            }.bind(this)
        });
    },
    render: function () {
        var fetchOrganization = this.fetchOrganization;
        var organizations = this.state.organizations;
        var studentOrganization = function(organizations) {
            return (
                <StudentOrganization key={organizations.id} organizations={organizations} id={organizations.id} fetchOrganization={fetchOrganization}/>
            );
        };
        return (
            <div>
                <div className="x_panel" id="organization-tip">
                    <div className="x_content">
                        <div className="" role="tabpanel" data-example-id="togglable-tabs">
                          <ul id="myTab" className="nav nav-tabs bar_made" role="tablist">
                              <h2 className="profile-h2"><span className="fa fa-heart"></span> Organization </h2>
                          </ul>
                          <div className="row">

                              { this.state.organizations.map(studentOrganization) }

                              <div className="col-md-4 col-sm-4 col-xs-12">
                                  <div className="well-education-profile profile_view add_organization_box_profile margin_top" onClick={this.showOrganizationModal}>
                                      <img src="/dist/img/plus.png" className="center-margin img-responsive add_seminar_image" />
                                      <div className="title_center col-xs-12 margin_top ">
                                          <h4 className="font-18 gray2"> Add Organization </h4>
                                      </div>
                                  </div>
                              </div>
                          </div>
                        </div>
                        <div id="organizationModal" className="modal fade" role="dialog" aria-hidden="true">
                            <div className="modal-dialog">
                                <form className="modal-content form" id="org_form" onSubmit={this.handleSubmit}>
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                        <h4>Add Organization</h4>
                                    </div>
                                    <div className="modal-body">
                                        <div className="container">
                                            <div className="form col-md-12 form-horizontal form-label-left">
                                                <div className="row">
                                                    <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14" >Organization Name *</label>
                                                    <div className="form_education col-md-8 col-sm-8 col-xs-12">
                                                        <input id="org_name" type="text" className="form-control" onChange={this.handleChange.bind(this, 'org_name')} placeholder="Organization Name"/>
                                                        <ul className="parsley-errors-list">
                                                            <li className="parsley-required"> {this.state.error_org_name} </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14" > Position * </label>
                                                    <div className="form_education col-md-8 col-sm-8 col-xs-12">
                                                        <input id="org_position" type="text" className="form-control" placeholder="Position" onChange={this.handleChange.bind(this, 'org_position')}/>
                                                        <ul className="parsley-errors-list">
                                                            <li className="parsley-required"> {this.state.error_org_position} </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14"> Year Attended *</label>
                                                    <div className="form_education col-md-3 col-sm-3 col-xs-12 form-group has-feedback">
                                                        <input id="org_start" type="year" className="date-picker form-control" defaultValue="" onChange={this.handleChange.bind(this, 'org_start')} placeholder="Start" pattern="[1-9][0-9]*|0" minLength="4" maxLength="4" required="required" />
                                                        <span className="fa fa-calendar form-control-feedback"></span>
                                                    </div>
                                                    <label className="to col-md-1 col-sm-1 col-xs-12 control-label font-14">
                                                        to
                                                    </label>
                                                    <div className="form_education col-md-3 col-sm-3 col-xs-12 form-group has-feedback">
                                                        <input id="org_end" type="year" className="date-picker form-control" defaultValue="" onChange={this.handleChange.bind(this, 'org_end')} placeholder="End" pattern="[1-9][0-9]*|0" minLength="4" maxLength="4" required="required" />
                                                        <span className="fa fa-calendar form-control-feedback"></span>
                                                    </div>
                                                    <div className="error-year-attended">
                                                        <ul className="parsley-errors-list error-year-attended col-md-offset-4 col-sm-8 col-xs-12">
                                                            <li className="parsley-required">
                                                                {this.state.error_org_end}
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
                                                <button type="submit" className="btn btn-primary btn-sm save-personal pull-right add-btn-org">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        );
    }
});

var StudentOrganization = React.createClass({    
    getInitialState: function(){
        return{
            org_name: this.props.organizations.org_name,
            org_position: this.props.organizations.org_position,
            org_start: this.props.organizations.org_start,
            org_end: this.props.organizations.org_end
        };        
    },  
    showEditOrganizationModal: function() {
        $('#org_name'+this.props.id).removeClass('parsley-error');
        $('#org_position'+this.props.id).removeClass('parsley-error');
        $('#org_end'+this.props.id).removeClass('parsley-error');
        $('#org_start'+this.props.id).removeClass('parsley-error');
        this.setState({
            org_name: this.props.organizations.org_name,
            org_position: this.props.organizations.org_position,
            org_start: this.props.organizations.org_start,
            org_end: this.props.organizations.org_end,
            error_org_name: "",
            error_org_position: "",
            error_org_start: "",
            error_org_end: ""
        });
        $('#editOrganizationModal'+this.props.id).modal('show');
    },
    handleChange(field, e){
        var state = {};
        state[field] = e.target.value;
        this.setState(state);
    },
    saveData(e) {
        e.preventDefault();
        var formData = new FormData();

        formData.append('org_name', this.state.org_name);
        formData.append('org_position', this.state.org_position);
        formData.append('org_start', this.state.org_start);
        formData.append('org_end', this.state.org_end);
        this.sendToServer(formData);
        return;
    },
    sendToServer(formData) {
        $.ajax({            
            type: "POST",
            url: "/api/v1/organizations/student/"+this.props.id,
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function(){
                $(".edit-org-btn").html('<b>Saving</b> <i class="fa fa-circle-o-notch fa-spin"></i>');
            },
            error: function(jqXhr, json, errorThrown) {
                $(".edit-org-btn").html('<b>Save Changes</b>');

                  if(jqXhr.status === 422) {
                      var errors = jqXhr.responseJSON;
                      var orgNameMessage     = errors['org_name'];
                      var orgPositionMessage = errors['org_position'];
                      var orgStartMessage    = errors['org_start'];
                      
                      if("org_end" in errors ){
                         var orgEndMessage = errors['org_end'][0];
                       }
                       else{
                         var orgEndMessage = errors['org_end'];
                       }

                      console.log(errors);

                      this.setState({
                           error_org_name: orgNameMessage,
                           error_org_position: orgPositionMessage,
                           error_org_start: orgStartMessage,
                           error_org_end: orgEndMessage,
                           submitted: false
                      });
                      

                      if("org_name" in errors) {
                          $('#org_name'+this.props.id).addClass('parsley-error').focus();
                      } else {
                          $('#org_name'+this.props.id).removeClass('parsley-error');
                      }

                      if("org_position" in errors) {
                          $('#org_position'+this.props.id).addClass('parsley-error').focus();
                      } else {
                          $('#org_position'+this.props.id).removeClass('parsley-error');
                      }

                      if("org_end" in errors) {
                          $('#org_end'+this.props.id).addClass('parsley-error').focus();
                          $('#org_start'+this.props.id).addClass('parsley-error');
                          
                      } else {                          
                          $('#org_end'+this.props.id).removeClass('parsley-error');
                          $('#org_start'+this.props.id).removeClass('parsley-error');
                      }
                  }
            }.bind(this),
            success: function(data) {             
                $(".edit-org-btn").html('<b>Save Changes</b>');   
                $('#editOrganizationModal'+this.props.id).modal('hide');
                this.props.fetchOrganization();
            }.bind(this)
        });
    },
    confirmDelete(e) {
        e.preventDefault();
        $("#deleteModalOrg"+this.props.id).modal('show');
    },
    deleteOrganization(){
        var id = this.props.id;
        this.deleteToServer(id);
    },
    deleteToServer(id) {
        $.ajax({
            type: "DELETE",
            url: "/api/v1/organizations/delete/"+id,
            data: {
                id: this.props.id
            },
            beforeSend: function(){
                $(".btn-delete-org").html('<b>Deleting </b><i class="fa fa-circle-o-notch fa-spin"></i>');
            },
            success: function(data) {
                $(".btn-delete-org").html('<b>Delete</b>');
                $("#deleteModalOrg"+this.props.id).modal('hide');
                $("#deleteorg_"+this.props.id).parent('div').fadeOut();
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="col-md-4 col-sm-4 col-xs-12">
                <div className="well profile_view org_info_profile" id={"deleteorg_"+this.props.id}>
                    <ul className="nav navbar-right panel_toolbox edit_delete">
                        <li>
                            <a role="button" data-tooltip="Edit" onClick={this.showEditOrganizationModal}>
                                <i className="fa fa-pencil font-large"></i>
                            </a>
                        </li>
                        <li>
                            <a role="button" data-tooltip="Delete" onClick={this.confirmDelete}>
                                <i className="fa fa-trash font-large"></i>
                            </a>
                        </li>
                    </ul>
                    <div className="title_center col-xs-12 margin_top ">
                        <h2 className="font-18"> { this.props.organizations.org_name } </h2>
                        <ul className="list-unstyled">
                            <li> { this.props.organizations.org_position } </li>
                            <li> { this.props.organizations.org_start } - { this.props.organizations.org_end }</li>
                        </ul>
                    </div>
                </div>
                <div id={"editOrganizationModal"+this.props.id} className="modal fade" role="dialog" aria-hidden="true">
                    <div className="modal-dialog">
                        <form className="modal-content form" onSubmit={this.saveData}>
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h4>Edit Organization</h4>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="form col-md-12 form-horizontal form-label-left">
                                        <div className="row">
                                            <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14" >Organization Name *</label>
                                            <div className="form_education col-md-8 col-sm-8 col-xs-12">
                                                <input id={"org_name"+this.props.id} type="text" value={ this.state.org_name } onChange={this.handleChange.bind(this, 'org_name')} className="form-control" placeholder="Organization Name"/>
                                                <ul className="parsley-errors-list">
                                                    <li className="parsley-required">
                                                        {this.state.error_org_name}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14" > Position * </label>
                                            <div className="form_education col-md-8 col-sm-8 col-xs-12">
                                                <input id={"org_position"+this.props.id} type="text" value={ this.state.org_position } onChange={this.handleChange.bind(this, 'org_position')} className="form-control" placeholder="Position" />
                                                <ul className="parsley-errors-list">
                                                    <li className="parsley-required">
                                                        {this.state.error_org_position}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="control-label col-md-4 col-sm-4 col-xs-12 font-14"> Year Attended *</label>
                                            <div className="form_education col-md-3 col-sm-3 col-xs-12 form-group has-feedback">
                                                <input type="year" className="date-picker form-control" value={ this.state.org_start } onChange={this.handleChange.bind(this, 'org_start')} placeholder="Start" id={"org_start"+this.props.id} pattern="[1-9][0-9]*|0" minLength="4" maxLength="4" required="required" />
                                                <span className="fa fa-calendar form-control-feedback"></span>
                                            </div>
                                            <label className="to col-md-1 col-sm-1 col-xs-12 control-label font-14">
                                                to
                                            </label>
                                            <div className="form_education col-md-3 col-sm-3 col-xs-12 form-group has-feedback">
                                                <input type="year" className="date-picker form-control" value={ this.state.org_end } onChange={this.handleChange.bind(this, 'org_end')} placeholder="End" id={"org_end"+this.props.id} pattern="[1-9][0-9]*|0" minLength="4" maxLength="4" required="required" />
                                                <span className="fa fa-calendar form-control-feedback"></span>
                                            </div>
                                            <div className="error-year-attended">
                                                <ul className="parsley-errors-list error-year-attended col-md-offset-4 col-sm-8 col-xs-12">
                                                    <li className="parsley-required">
                                                        {this.state.error_org_end}
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
                                        <button type="submit" className="btn btn-primary btn-sm save-personal pull-right edit-org-btn">Save Changes</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div id={"deleteModalOrg"+this.props.id} className="modal fade" role="dialog" aria-hidden="true">
                    <div className="modal-dialog">
                        <form className="modal-content form">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h3>Delete Organization</h3>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <h4>Are you sure you want to delete this Organization?</h4>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="x_footer x_modal_foot">
                                    <div className="form-group has-feedback">
                                        <a className="btn btn-primary btn-sm pull-left btn-delete-org" aria-hidden="true" onClick={this.deleteOrganization}>Confirm</a>
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
});
