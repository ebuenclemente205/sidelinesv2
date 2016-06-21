var React = require('react');
var id = window.userid;

module.exports = React.createClass({
    getInitialState: function() {
        return {
            recommendations: [],
            email_to: "",
        }
    },
    componentWillMount: function(){
      this.fetchRecommendations();
    },
    fetchRecommendations: function() {
      $.ajax({
        type: "GET",
        url: "/api/v1/recommendations/student/"+id,
        error: function(){
          this.fetchRecommendations();
          return;
        }.bind(this),
        success: function(response){
          if(response.length == 0){
            $('#recom_foot').removeClass('x_footer');
          }
          else{
            $('#recom_foot').addClass('x_footer');
          }         
          this.setState({
            recommendations: response
          });
        }.bind(this)
      });
    },
    handleChange: function(field, e){
        var state = {};
        state[field] = e.target.value;
        this.setState(state);
    },
    handleSubmit: function(e) {
      e.preventDefault();
        var formData = new FormData();
        formData.append('email_to', this.state.email_to);
      this.sendToServer(formData);
      return;
    },
    sendToServer: function(formData) {
        $.ajax({
            type: "POST",
            url: "/api/v1/recommendations/student/create/"+id,
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
              $("#btn_recommend_save").html('<b>Sending</b> <i class="fa fa-circle-o-notch fa-spin"></i>');
            },
            success: function(data) {
              $("#recommendationModal").modal("hide");
              $("#btn_recommend_save").html('<b>Send</b>');
              $("#email_recommend")[0].reset();
              this.setState({
                    email_to: "",
              });
              console.log(data);
            }.bind(this)
        });
    },
    showRecommendationModal: function() {
        $("#recommendationModal").modal('show');
        setTimeout(function(){
            $("#email").focus();
        },200);        
    },
    render: function () {
        var recommendations = this.state.recommendations;
        var studentRecommendations = function(recommendations) {
          return (
              <StudentRecommendations key={recommendations.id} recommendations={recommendations}/>
          );
        };
        return (
            <div>
                <div className="x_panel">
                    <div className="x_title">
                    <h2>Recommendations</h2>
                      <div className="clearfix"></div>
                    </div>
                    <div className="x_content">
                        { this.state.recommendations.map(studentRecommendations) }
                    </div>
                    <div id="recom_foot" onClick={this.showRecommendationModal}>
                        <button id="step3" className="btn btn-danger btn-block btn-sm">Ask for Recommendation</button>
                    </div>
                </div>
                <div id="recommendationModal" className="modal fade" role="dialog" aria-hidden="true">
                    <div className="modal-dialog">
                        <form className="modal-content form" id="email_recommend" onSubmit={this.handleSubmit}>
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                <h4> Send Recommendation </h4>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="form col-md-12 form-horizontal form-label-left recom-body">
                                        <div className="row">
                                            <label className="control-label col-md-3 col-sm-3 col-xs-12 font-14" htmlFor="email"> Send to: </label>
                                            <div className="form_education col-md-9 col-sm-9 col-xs-12">
                                                <input id="email" type="text" className="form-control" placeholder="sample@sample.com" onChange={this.handleChange.bind(this,'email_to')}/>
                                                <ul className="parsley-errors-list">
                                                    <li className="parsley-required"></li>
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
                                        <button id="btn_recommend_save" type="submit" className="btn btn-primary btn-sm save-personal pull-right"> Send </button>
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

var StudentRecommendations = React.createClass({
    render: function() {
        return (
            <div>
                <ul className="list-unstyled scroll-view">
                  <li className="media event hover-list">
                    <div className="media-body">
                      <a className="title" href="#"> {this.props.recommendations.email_to} </a>
                        <div className="row">
                            <div className="col-md-6">
                                <p> Character
                                    <i className="fa fa-star"></i>
                                    <i> {this.props.recommendations.character_rating} </i>
                                </p>
                            </div>
                            <div className="col-md-6">
                                <p> Skill
                                    <i className="fa fa-star"></i>
                                    <i> {this.props.recommendations.skill_rating} </i>
                                </p>
                            </div>
                        </div>
                    </div>
                    </li>
                </ul>
            </div>
        );
    }
});
