var React = require('react');
var id = window.userid;

module.exports = React.createClass({
    getInitialState: function() {
       return {
          view: "default",
          qual_description: "",
          overview_id: "",
          error_Qualdescription: "",
      };
    },
    fetchOverview:function(){
      $.ajax({
        type: "GET",
        url: "/api/v1/qualifications/student/"+id,
        error: function(){
          this.fetchOverview();
          return;
        }.bind(this),
        success: function(response){
          this.setState({
            overview: response
          });

            setTimeout(function () {
             if(response.length == 0){
                this.setState({view: "view1"});
             }
             else{
                this.setState({view: "view2"});
             }

            var overview2 = function(result) {
               return (
                result.qual_description
              );
            };

            this.setState({
              qual_description: this.state.overview.map(overview2)
            });
          }.bind(this), 1000);

        }.bind(this)
      });
    },
    componentWillMount: function(){
      this.fetchOverview();
    },
    addOverview: function() {
      this.setState({
        view: "add"
      });
    },
    editOverview: function() {
      var overview = function(result) {
        this.setState({
          overview_id: result.id
        });
        return;
      }.bind(this );

      this.state.overview.map(overview);
      this.setState({
        view: "edit"
      });
    },
    handleChange: function(field, e){
        var state = {};
        state[field] = e.target.value;
        this.setState(state);
    },
    handleCancel: function(){
      this.setState({
        view: "view2"
      });
    },
    handleSubmit(e) {
      e.preventDefault();
        var formData = new FormData();
        formData.append('qual_description', this.state.qual_description);
      this.sendToServer(formData);
      return;
    },
    sendToServer(formData) {
        $.ajax({
            type: "POST",
            url: "/api/v1/qualifications/student/create/"+id,
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
              $(".overview-btn").html('<b>Saving</b> <i class="fa fa-circle-o-notch fa-spin"></i>');
            },
            error: function(jqXhr, json, errorThrown) {
              $(".overview-btn").html('<b>Save Changes</b>');

                if(jqXhr.status === 422) {
                    var errors = jqXhr.responseJSON;
                    var qualDescriptionMessage = errors['qual_description'];

                    this.setState({
                        error_Qualdescription: qualDescriptionMessage,
                        submitted: false
                    });

                    if("qual_description" in errors) {
                        $('#qual_description').addClass('parsley-error').focus();
                    } else {
                        $('#qual_description').removeClass('parsley-error');
                    }
                }
            }.bind(this),
            success: function(data) {
              $(".overview-btn").html('<b>Save</b>');
              this.fetchOverview();
              this.setState({
                view: "view2"
              });
            }.bind(this)
        });
    },
    handleSave(e) {
      e.preventDefault();
        var formData = new FormData();
        formData.append('qual_description', this.state.qual_description);
        this.saveToServer(formData);
      return;
    },
    saveToServer(formData) {
        var overview_id = this.state.overview_id;
        $.ajax({
            type: "POST",
            url: "/api/v1/qualifications/student/"+overview_id,
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
              $(".save-edit-overview").html('<b>Saving</b> <i class="fa fa-circle-o-notch fa-spin"></i>');
            },
            error: function(jqXhr, json, errorThrown) {
              $(".save-edit-overview").html('<b>Save changes</b>');

                if(jqXhr.status === 422) {
                    var errors = jqXhr.responseJSON;
                    var qualDescriptionMessage = errors['qual_description'];

                    this.setState({
                        error_Qualdescription: qualDescriptionMessage,
                        submitted: false
                    });

                    if("qual_description" in errors) {
                        $('#qual_description').addClass('parsley-error').focus();
                    } else {
                        $('#qual_description').removeClass('parsley-error');
                    }
                }
            }.bind(this),
            success: function(data) {
              $(".overview-btn").html('<b>Save</b>');
              this.fetchOverview();
              this.setState({
                view: "view2"
              });
            }.bind(this)
        });
    },
    render: function() {
      var overview = function(result) {
        return (
          <OverviewShow key={result.id} overview_id={result.id} overview={result.qual_description} />
        );
      };
      var overview2 = function(result) {
        return (
          result.qual_description
        );
      };
      if(this.state.view == 'default'){
        return(
          <div className="" role="tabpanel" data-example-id="togglable-tabs" id="overview-tip">
            <ul id="myTab" className="nav nav-tabs bar_made" role="tablist">
              <h2 className="profile-h2">
                <span className="fa fa-binoculars"></span> Overview
              </h2>
            </ul>
            <div id="myTabContent" className="tab-content">
              <div role="tabpanel" className="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                <div className="message_wrapper">
                    <div className="div_overview message msg-content" id="step1">
                      <div className="font-32 fa fa-spinner fa-spin"></div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      else if(this.state.view == 'view1'){
        return(
          <div className="" role="tabpanel" data-example-id="togglable-tabs" id="overview-tip">
            <ul id="myTab" className="nav nav-tabs bar_made" role="tablist">
              <h2 className="profile-h2">
                <span className="fa fa-binoculars"></span> Overview
              </h2>
            </ul>
            <div id="myTabContent" className="tab-content">
              <div role="tabpanel" className="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                <div className="message_wrapper">
                    <div className="div_overview message msg-content" id="step1">
                        <a className="add_overview" onClick={this.addOverview}>Add Overview</a>
                    </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      else if(this.state.view == 'view2'){
        return(
          <div className="" role="tabpanel" data-example-id="togglable-tabs" id="overview-tip">
            <ul id="myTab" className="nav nav-tabs bar_made" role="tablist">
              <h2 className="profile-h2">
                <span className="fa fa-binoculars"></span> Overview
              </h2>
              <div className="pull-right panel_add">
                  <a href="#" role="button" data-tooltip="Edit Overview" onClick={this.editOverview}>
                      <i className="fa fa-pencil-square-o"> </i>
                  </a>
              </div>
            </ul>
            <div id="myTabContent" className="tab-content">
              <div role="tabpanel" className="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                <div className="message_wrapper">
                    <div className="message msg-content" id="step1">
                      {this.state.overview.map(overview)}
                    </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      else if(this.state.view == 'add'){
        return(
          <div className="" role="tabpanel" data-example-id="togglable-tabs" id="overview-tip">
            <ul id="myTab" className="nav nav-tabs bar_made" role="tablist">
              <h2 className="profile-h2">
                <span className="fa fa-binoculars"></span> Overview
              </h2>
            </ul>
            <div id="myTabContent" className="tab-content">
              <div role="tabpanel" className="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                <div className="message_wrapper">
                    <div className="message msg-content" id="step1">
                      <form className='form-group has-feedback' onSubmit={this.handleSubmit}>
                          <textarea onChange={this.handleChange.bind(this, 'qual_description')} className='form-control textarea-overview' id="qual_description" placeholder='Type your overview here'/>
                          <ul className='parsley-errors-list'>
                              <li className='parsley-required font-12'> {this.state.error_Qualdescription} </li>
                          </ul>
                          <button type="submit" className="btn btn-primary btn-sm overview-btn">Save</button>
                      </form>
                    </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      else if(this.state.view == 'edit'){
        return(
          <div className="" role="tabpanel" data-example-id="togglable-tabs" id="overview-tip">
            <ul id="myTab" className="nav nav-tabs bar_made" role="tablist">
              <h2 className="profile-h2">
                <span className="fa fa-binoculars"></span> Overview
              </h2>
            </ul>
            <div id="myTabContent" className="tab-content">
              <div role="tabpanel" className="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                <div className="message_wrapper">
                    <div className="message msg-content" id="step1">
                      <form className='form-group has-feedback' onSubmit={this.handleSave}>
                          <textarea onChange={this.handleChange.bind(this, 'qual_description')} className='form-control textarea-overview' id="qual_description" placeholder='Type your overview here' defaultValue={this.state.overview.map(overview2)}/>
                          <ul className='parsley-errors-list'>
                              <li className='parsley-required font-12'> {this.state.error_Qualdescription} </li>
                          </ul>
                          <div className="overview-btn">
                            <a className="btn btn-warning btn-sm" onClick={this.handleCancel}>Cancel</a>
                            <button type="submit" className="btn btn-primary btn-sm save-edit-overview">Save Changes</button>
                          </div>
                      </form>
                    </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
});

var OverviewShow = React.createClass({
    displayName: "OverviewShow",
    render: function render() {
        return (
          <div overview_id={this.props.overview_id}>{this.props.overview}</div>
      );
    }
});
