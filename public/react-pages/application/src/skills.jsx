var React = require('react');
var Select2 = require('react-select2-wrapper');
var id = window.userid;
var x = 1;

module.exports = React.createClass({
    getInitialState : function() {
        return {
            data: [],
            showEdit: false,
            skill: ""
        };
    },
    fetchSkills: function(){
       $.ajax({
          type: "GET",
          url: "/api/v1/skills/student/"+id,
          error: function(){
            this.fetchSkills();
            return;
          }.bind(this),
          success: function(response){
            this.setState({
              data: response
            });
          }.bind(this)
        });
    },
    componentWillMount() {
      this.fetchSkills();
    },
    showEdit: function(e){
      this.setState({
        showEdit: true
      });
    },
    close: function(e){
      this.setState({
        showEdit: false
      });
      this.fetchSkills();
    },
    resetData: function(){
      this.fetchSkills();
    },
    handleSkillChange: function(e) {
        this.setState({
            skill : e
        })
    },
    updateSkillbyEnter: function(e){
      this.setState({
        skill : e
      });
      this.onAddSkillbyEnter();
    },
    onAddSkillbyEnter: function(){
      $.get("/api/v1/skills/student/"+id, function(result) {
        var existing = false;

        for (var i = 0; i < result.length; i++) {
          if(this.state.skill.toLowerCase() === result[i].name.toLowerCase()){
            existing = true;
            $("#exists").css("display", "block").fadeOut(2000);
            break;
          }else if(this.state.skill === ""){
            existing = true;
            break;
          }
        }

        if(!existing){
          this.submitSkill();
        }

      }.bind(this));
    },
    onAddSkill: function(e){
      e.preventDefault();
      $.get("/api/v1/skills/student/"+id, function(result) {
        var existing = false;

        for (var i = 0; i < result.length; i++) {
          if(this.state.skill.toLowerCase() === result[i].name.toLowerCase()){
            existing = true;
            $("#exists").css("display", "block").fadeOut(2000);
            break;
          }else if(this.state.skill === ""){
            existing = true;
            break;
          }
        }

        if(!existing){
          this.submitSkill();
        }

      }.bind(this));
    },
    submitSkill: function(){
      $.ajax({
        type: "POST",
        url: '/api/v1/skills/student/create/'+id,
        data: {
          new_skill: this.state.skill
        },
        success: function(response) {
          $('.select2-selection__choice').empty().addClass('hide-input');
          $('#skill').val('').trigger('change');
          $('#skill').focus().select();
          this.fetchSkills();
          this.setState({ skill: "" });
        }.bind(this)

      });
    },
    render: function() {
      if(this.state.showEdit == false){
        return(
          <div className="skills_tab_margin" role="tabpanel" data-example-id="togglable-tabs" id="skills-tip">
            <ul id="myTab" className="nav nav-tabs bar_made" role="tablist">
              <h2 className="profile-h2">
                <span className="fa fa-tags"></span> Skills
              </h2>
              <div className="pull-right panel_add">
                  <a data-tooltip="Edit Skill" onClick={this.showEdit}>
                      <i className="fa fa-pencil-square-o"> </i>
                  </a>
              </div>
            </ul>
            <div id="myTabContent" className="tab-content">
              <div role="tabpanel" className="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                <div className="message_wrapper">
                  <div className="message msg-content">
                    <ul className="list-unstyled scroll-view">
                      <Skill_list data={this.state.data} />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      else{
        return(
          <div className="skills_tab_margin" role="tabpanel" data-example-id="togglable-tabs">
            <ul id="myTab" className="nav nav-tabs bar_made" role="tablist">
              <h2 className="profile-h2">
                <span className="fa fa-tags"></span> Skills
              </h2>
            </ul>
            <div id="myTabContent" className="tab-content">
              <div role="tabpanel" className="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                <div className="message_wrapper">
                  <div className="message msg-content skill-content">
                    <div className="list-unstyled scroll-view">
                      <form className="row" onSubmit={this.onAddSkill}>
                        <div className="col-md-8 col-sm-8 col-xs-12">
                          <div className="form-group has-feedback">
                            <SkillSelect data={this.state.dataSkills} skill={this.state.skill} updateSkill={this.handleSkillChange} updateSkillbyEnter={this.updateSkillbyEnter}/>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12 btn-skills-add">
                          <button type="submit" className="btn btn-primary pull-left btn-sm" id="addskill">Add</button>
                          <a type="submit" className="btn btn-warning btn-sm" id="addskill" onClick={this.close}>Close</a>
                        </div>
                      </form>
                      <div className="form">
                        <div className="display-skills">
                          <SkillsAddedList data={this.state.data} resetData={this.resetData}/>
                          {this.state.selectedSkills}
                        </div>
                      </div>
                      <ul className="parsley-errors-list hide-error" id="exists">
                        <li className="parsley-required">Skill already exists in your list</li>
                      </ul>
                      <div className="font-12">
                          <p> You can still add: 41 </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
});

var SkillsAddedList = React.createClass({
    displayName: "SkillsAddedList",
    render: function render() {
        var Deleted = function(){
          this.props.resetData();
        }.bind(this);
        var onRemove = function(skill, e){
          $.ajax({
            type: "DELETE",
            url: "/api/v1/skills/student/delete/"+id,
            data: {
              skill: skill
            },
            success: function(data) {
              console.log("Successlly Deleted");
              $('#skill').focus();
              Deleted();
            }.bind(this)
          });
        };
        var skillOpt = function skillOpt(result) {
            return  React.createElement(
              "label",
              {className:"btn-default btn-xs selected-btns", key:result.id},
              React.createElement("span",{className:"fa fa-remove remove-x delete_", onClick:onRemove.bind(this, result.id)}),
              React.createElement("span",{className:"remove-word"},result.name)
            );
        };
        return React.createElement(
            "div",
            {className:"inline-div"},
            this.props.data.map(skillOpt)
        );
    }
});

var SkillAdded = React.createClass({
    displayName: "SkillAdded",
  getInitialState: function(){
    return {
      skill: this.props.data.name
    };
  },
  onRemove(){
    $.ajax({
      type: "DELETE",
      url: "/api/v1/skills/student/delete/"+id,
      data: {
        skill: this.props.data.id
      },
      success: function(data) {
        console.log("Successlly Deleted");
        $(".delete_"+this.props.data.id).parent('label').remove();
        $('#skill').focus();
      }.bind(this)
    });
  },
    render: function render() {
      return  React.createElement(
        "label",
        {className:"btn-default btn-xs selected-btns"},
        React.createElement("span",{className:"fa fa-remove remove-x delete_"+this.props.data.id, onClick:this.onRemove}),
        React.createElement("span",{className:"remove-word"},this.state.skill)
      );
    }
});

var Skill_list = React.createClass({
    displayName: "Skill_list",
    render: function render() {
        var skillOpt = function skillOpt(result) {
            return React.createElement(Skills,
                {key: result.id,
                data: result
            });
        };
        return React.createElement(
            "div",
            null,
            this.props.data.map(skillOpt)
        );
    }
});

var Skills = React.createClass({
    displayName: "Skills",
    getInitialState: function(){
        return{
            skill: this.props.data.name
        };
    },
    render: function render() {
        return (
          <li className="div-skills">
              <p className="line"><a className="btn profile-skill-btn btn-sm pull-left tag-skills">{this.state.skill}</a></p>
          </li>
        );
    }
});

var SkillSelect = React.createClass({
    getInitialState: function(){
      return{
        skills: [],
        skill: ""
      }
    },
    componentWillMount: function(){
      $.get("/api/v1/skills", function(result) {
          this.setState({
            skills: result
          });
      }.bind(this));
    },
    componentDidMount: function(){
      setTimeout(function(){
        $('#skill').focus().select();
      },500);
    },
    handleChange: function(e){
      this.props.updateSkill(e.target.value);

      if(event.keyCode == 13){
        this.props.updateSkillbyEnter(e.target.value);
      }
    },
    render: function render() {
      var skillStyle = {
        width: '100%'
      };
      var SkillsOptions = this.state.skills,
        skillOpt = function(SkillsOptions) {
          return SkillsOptions.name;
      };
      return(
          <Select2 id="skill" multiple style={skillStyle} value={null} options={{ placeholder:"Type your skill here", tags: true, maximumSelectionLength: 1 }} data={SkillsOptions.map(skillOpt)} onChange={this.handleChange}/>
      );
    }
});
