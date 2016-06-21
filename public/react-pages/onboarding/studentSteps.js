"use strict";
var id = window.userid;
var step = parseInt(window.step)+1;
var x = 1;

var StudentSteps = React.createClass({
	getInitialState : function() {
        return {
            step: step,
			step1: 1,
			step2: 2,
			step3: 3
        };
    },
	componentDidMount(){
		if(this.state.step == 2){
			$("#step-1").addClass('done'),
			$("#step-1").removeClass('selected'),
			$("#step-1").fadeIn('slow'),
			$("#step-2").addClass('selected').fadeIn('slow'),
			$("#step-2").fadeIn('slow')

			this.setState({
				step1 : ""
			});
			$(".step-1").addClass('fa fa-check')
		}
		else if(this.state.step == 3){
			$("#step-1").addClass('done'),
			$("#step-1").removeClass('selected'),
			$("#step-1").fadeIn('slow'),
			$("#step-2").addClass('done'),
			$("#step-2").removeClass('selected'),
			$("#step-2").fadeIn('slow'),
			$("#step-3").addClass('selected').fadeIn('slow'),
			$("#step-3").fadeIn('slow')

			this.setState({
				step1 : "",
				step2 : ""
			});
			$(".step-1").addClass('fa fa-check')
			$(".step-2").addClass('fa fa-check');
		}
	},
	nextStep2: function(){
		$("#step-1").addClass('done'),
		$("#step-1").removeClass('selected'),
		$("#step-1").fadeIn('slow'),
		$("#step-2").addClass('selected').fadeIn('slow'),
		$("#step-2").fadeIn('slow')

		this.setState({
			step1 : "",
			step: this.state.step + 1
		});
		$(".step-1").addClass('fa fa-check')
	},
	nextStep3: function(){
		$("#step-2").addClass('done'),
		$("#step-2").removeClass('selected'),
		$("#step-2").fadeIn('slow'),
		$("#step-3").addClass('selected').fadeIn('slow'),
		$("#step-3").fadeIn('slow')

		this.setState({
			step2 : "",
			step: this.state.step + 1
		});
		$(".step-2").addClass('fa fa-check');
	},
	stepToServer(stepData){
		$.ajax({
            type: "POST",
            url: "/api/v1/educations/student/next/"+id,
            data: stepData,
            processData: false,
            contentType: false,
            success: function(data) {
            }.bind(this)
        });
	},
	render() {
	    return React.createElement(
	      "div",
	      { "className": "form_wizard wizard_horizontal" },
	      React.createElement(
	        "ul",
	        { "className": "wizard_steps anchor" },
	        React.createElement(
	          "li",
	          null,
	          React.createElement(
	            "a",
	            { id:"step-1", "className": "selected" },
	            React.createElement(
	              "span",
	              { id:"step-1", "className": "step-1 step_no font-15" },
				  React.createElement(
					  "strong",
					  null,
					  this.state.step1
				  )
	            ),
	            React.createElement(
	              "span",
	              { "className": "step_descr" },
	              "Step 1",
	              React.createElement("br", null),
	              React.createElement(
	                "small",
	                null,
	                "Personal Information"
	              )
	            )
	          )
	        ),
			React.createElement(
	          "li",
	          null,
	          React.createElement(
	            "a",
	            { id:"step-2", "className": "disabled" },
	            React.createElement(
	              "span",
	              { id:"step-2", "className": "step-2 step_no font-15" },
	              React.createElement(
					  "strong",
					  null,
					  this.state.step2
				  )
	            ),
	            React.createElement(
	              "span",
	              { "className": "step_descr" },
	              "Step 2",
	              React.createElement("br", null),
	              React.createElement(
	                "small",
	                null,
	                "Educational Background"
	              )
	            )
	          )
	        ),
			React.createElement(
			  "li",
			  null,
			  React.createElement(
			    "a",
			    { id:"step-3", "className": "disabled" },
			    React.createElement(
			      "span",
			      { id:"step-3", "className": "step-3 step_no font-15" },
				  React.createElement(
					  "strong",
					  null,
					  this.state.step3
				  )
			    ),
			    React.createElement(
			      "span",
			      { "className": "step_descr" },
			      "Step 3",
			      React.createElement("br", null),
			      React.createElement(
			        "small",
			        null,
			        "Your Skills & Abilities"
			      )
			    )
			  )
			)
		  ),
		  React.createElement(
			  StepContainer,
			  { updateStep2: this.nextStep2, updateStep3:this.nextStep3, step: this.state.step }
		  )
	    );
	  }
});

var StepContainer = React.createClass({
	getInitialState(){
		return{
			btnNext: "Next ",
			btnPrev: "Back ",
			dataSchools: [],
			dataDegrees: [],
			dataEducation: [],
			dataSkills: [],
			displayer: [],
			selectedSkills: [],
			student_skills: [],
			schoolid: "",
			degreeid: "",
			pic_url : "/dist/img/user.png",
			have_pic: false,
			fname: "",
			lname: "",
			yr_lvl: "",
			contact_no: "",
			date_of_birth: "",
			gender: "m",
			school_pic: "/dist/img/avatar-default-school.png",
			degree_name: "No Degree",
			school_name: "No School",
			attainment: "College",
			schoolStart: "",
			schoolEnd: "",
			schoolAdded: "",
			error_fname: "",
            error_lname: "",
            error_gender: "",
            error_schoolid: "",
            error_degreeid: "",
            error_pic_url : "",
            error_yr_lvl: "",
            error_contact_no: "",
            error_date_of_birth: "",
			error_schoolid_edu: "",
			error_degreeid_edu: "",
			error_attainment: "",
			error_schoolstart: "",
			error_schoolend: "",
			newschoolid: "",
			newdegreeid: "",
			skill: "",
			skillid: "",

		};
	},
	componentDidMount() {
		this.fetchEducation();		
		this.fetchDegrees();
		this.fetchSchools();
		this.fetchSkills();
		this.fetchSkillsStudents();		

		$('input[name="date_of_birth"]').daterangepicker({
			singleDatePicker: true,
			changeYear: true,
			showDropdowns: true,
		},
		function(start) {
			this.setState({
				date_of_birth: start.format('YYYY-MM-DD')
			});
		}.bind(this));

		$("#educationModal").on('hidden.bs.modal', function(){
			$(this).find('form')[0].reset();
		});

		$("#educationModal").on('hidden.bs.modal', function(){
			$("#school").select2("val", "");
			$("#degree").select2("val", "");
			$('#schoolStart').removeClass('parsley-error');
			$('#schoolEnd').removeClass('parsley-error');
			this.setState({
				error_schoolid_edu: "",
				error_degreeid_edu: "",
				error_schoolstart: "",
				error_schoolend: "",
				error_attainment: "",
				newschoolid: "",
				newdegreeid: "",
				schoolStart: "",
				schoolEnd: "",
			});
		}.bind(this));
    },
    fetchSkillsStudents: function(){
    	$.ajax({
			type: "GET",
			url: "/api/v1/skills/student/"+id,
			success: function(skills){
				this.setState({
	                student_skills: skills
	            });
			}.bind(this)
		});
    },
    fetchSkills: function(){
    	$.ajax({
			type: "GET",
			url: "/api/v1/skills",
			success: function(resultSkills){
				this.setState({
	                dataSkills: resultSkills
	            });
			}.bind(this),
			error: function(){
				this.fetchSkills();
			}
		});
    },
    fetchSchools:function(){
    	$.ajax({
			type: "GET",
			url: "/api/v1/schools",
			success: function(resultSchools){
				this.setState({
	                dataSchools: resultSchools
	            });
			}.bind(this),
            error: function(){
				this.componentDidMount();
			}
		});
    },
    fetchDegrees: function(){
    	$.ajax({
			type: "GET",
			url: "/api/v1/degrees",
			success: function(resultDegrees){
				this.setState({
	                dataDegrees: resultDegrees
	            });
			}.bind(this),
            error: function(){
				this.fetchDegrees();
			}
		});
    },
    fetchEducation: function(){
    	$.ajax({
			type: "GET",
			url: "/api/v1/educations/student/"+id,
			success: function(resultEducation){
				this.setState({
	                dataEducation: resultEducation
	            });
			}.bind(this),
            error: function(){
				this.fetchEducation();
			}
		});
    },
	handlePrev(e) {
		e.preventDefault();
        this.props.updatePrevStep();
		e.preventDefault();
    },
	handleChange(field, e){
        var state = {};
        state[field] = e.target.value;
        this.setState(state);
    },
	handleCollege(e){
		$('#showDegree').slideDown('fast');
		this.setState({
			attainment: "College"
		});
	},
	handleHighschool(e){
		$('#showDegree').slideUp('fast');
		this.setState({
			attainment: "Highschool"
		});
	},
	handleElementary(e){
		$('#showDegree').slideUp('fast');
		this.setState({
			attainment: "Elementary"
		});
	},
	handleGenderM(e) {
        this.setState({
            gender: "m"
        })
    },
	handleGenderF(e) {
        this.setState({
            gender: "f"
        })
    },
	handleNewSchool(e) {
        this.setState({
            newschoolid : e
        })
    },
	handleNewDegree(e) {
        this.setState({
            newdegreeid : e
        })
    },
	handleSchoolChange(e) {
        this.setState({
            schoolid : e
        })
    },
	handleSkillChange(e) {
        this.setState({
            skill : e
        })
    },
	updateSkillbyEnter(e){
		this.setState({
			skill : e
		});
		this.onAddSkillbyEnter();
	},
	onAddSkillbyEnter(){
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
	addPhp(){
		$.get("/api/v1/skills/student/"+id, function(result) {
			var existing = false;
			for (var i = 0; i < result.length; i++) {
				if("php" === result[i].name.toLowerCase()){
					existing = true;
					$("#exists").css("display", "block").fadeOut(2000);
					break;
				}
			}

			if(!existing){
				$.ajax({
					type: "POST",
					url: '/api/v1/skills/student/create/'+id,
					data: {
						new_skill: "php"
					},
					success: function(response) {
						var cbs = this.state.selectedSkills;
						x++;
						cbs.push(
							React.createElement(
								Selected_skills,
								{ key: x,
								skillid: response.id,
								skill: response.name }
							)
						);
						this.setState({
							displayer: cbs
						});
						$("#skill").select2("val", "");
					}.bind(this)

				});
			}

		}.bind(this));
	},
	addAutocad(){
		$.get("/api/v1/skills/student/"+id, function(result) {
			var existing = false;
			for (var i = 0; i < result.length; i++) {
				if("autocad" === result[i].name.toLowerCase()){
					existing = true;
					$("#exists").css("display", "block").fadeOut(2000);
					break;
				}
			}

			if(!existing){
				$.ajax({
					type: "POST",
					url: '/api/v1/skills/student/create/'+id,
					data: {
						new_skill: "autocad"
					},
					success: function(response) {
						var cbs = this.state.selectedSkills;
						x++;
						cbs.push(
							React.createElement(
								Selected_skills,
								{ key: x,
								skillid: response.id,
								skill: response.name }
							)
						);
						this.setState({
							displayer: cbs
						});
						$("#skill").select2("val", "");
					}.bind(this)

				});
			}

		}.bind(this));
	},
	addCs(){
		$.get("/api/v1/skills/student/"+id, function(result) {
			var existing = false;
			var name = "Customer Support";
			for (var i = 0; i < result.length; i++) {
				if(name.toLowerCase() === result[i].name.toLowerCase()){
					existing = true;
					$("#exists").css("display", "block").fadeOut(2000);
					break;
				}
			}

			if(!existing){
				$.ajax({
					type: "POST",
					url: '/api/v1/skills/student/create/'+id,
					data: {
						new_skill: "Customer Support"
					},
					success: function(response) {
						var cbs = this.state.selectedSkills;
						x++;
						cbs.push(
							React.createElement(
								Selected_skills,
								{ key: x,
								skillid: response.id,
								skill: response.name }
							)
						);
						this.setState({
							displayer: cbs
						});
						$("#skill").select2("val", "");
					}.bind(this)

				});
			}

		}.bind(this));
	},
	addMd(){
		$.get("/api/v1/skills/student/"+id, function(result) {
			var existing = false;
			var name = "Mobile Development";
			for (var i = 0; i < result.length; i++) {
				if(name.toLowerCase() === result[i].name.toLowerCase()){
					existing = true;
					$("#exists").css("display", "block").fadeOut(2000);
					break;
				}
			}

			if(!existing){
				$.ajax({
					type: "POST",
					url: '/api/v1/skills/student/create/'+id,
					data: {
						new_skill: "Mobile Development"
					},
					success: function(response) {
						var cbs = this.state.selectedSkills;
						x++;
						cbs.push(
							React.createElement(
								Selected_skills,
								{ key: x,
								skillid: response.id,
								skill: response.name }
							)
						);
						this.setState({
							displayer: cbs
						});
						$("#skill").select2("val", "");
					}.bind(this)

				});
			}

		}.bind(this));
	},
	addGd(){
		$.get("/api/v1/skills/student/"+id, function(result) {
			var existing = false;
			var name = "Graphic Designing";
			for (var i = 0; i < result.length; i++) {
				if(name.toLowerCase() === result[i].name.toLowerCase()){
					existing = true;
					$("#exists").css("display", "block").fadeOut(2000);
					break;
				}
			}

			if(!existing){
				$.ajax({
					type: "POST",
					url: '/api/v1/skills/student/create/'+id,
					data: {
						new_skill: "Graphic Designing"
					},
					success: function(response) {
						var cbs = this.state.selectedSkills;
						x++;
						cbs.push(
							React.createElement(
								Selected_skills,
								{ key: x,
								skillid: response.id,
								skill: response.name }
							)
						);
						this.setState({
							displayer: cbs
						});
						$("#skill").select2("val", "");
					}.bind(this)

				});
			}

		}.bind(this));
	},
	addHtml(){
		$.get("/api/v1/skills/student/"+id, function(result) {
			var existing = false;
			var name = "html";
			for (var i = 0; i < result.length; i++) {
				if(name.toLowerCase() === result[i].name.toLowerCase()){
					existing = true;
					$("#exists").css("display", "block").fadeOut(2000);
					break;
				}
			}

			if(!existing){
				$.ajax({
					type: "POST",
					url: '/api/v1/skills/student/create/'+id,
					data: {
						new_skill: "html"
					},
					success: function(response) {
						var cbs = this.state.selectedSkills;
						x++;
						cbs.push(
							React.createElement(
								Selected_skills,
								{ key: x,
								skillid: response.id,
								skill: response.name }
							)
						);
						this.setState({
							displayer: cbs
						});
						$("#skill").select2("val", "");
					}.bind(this)

				});
			}

		}.bind(this));
	},
	addSa(){
		$.get("/api/v1/skills/student/"+id, function(result) {
			var existing = false;
			var name = "System Analysis";
			for (var i = 0; i < result.length; i++) {
				if(name.toLowerCase() === result[i].name.toLowerCase()){
					existing = true;
					$("#exists").css("display", "block").fadeOut(2000);
					break;
				}
			}

			if(!existing){
				$.ajax({
					type: "POST",
					url: '/api/v1/skills/student/create/'+id,
					data: {
						new_skill: "System Analysis"
					},
					success: function(response) {
						var cbs = this.state.selectedSkills;
						x++;
						cbs.push(
							React.createElement(
								Selected_skills,
								{ key: x,
								skillid: response.id,
								skill: response.name }
							)
						);
						this.setState({
							displayer: cbs
						});
						$("#skill").select2("val", "");
					}.bind(this)

				});
			}

		}.bind(this));
	},
	onAddSkill(e){
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
	submitSkill(){
		$.ajax({
			type: "POST",
			url: '/api/v1/skills/student/create/'+id,
			data: {
				new_skill: this.state.skill
			},
			success: function(response) {
				var cbs = this.state.selectedSkills;
				x++;
				cbs.push(
					React.createElement(
						Selected_skills,
						{ key: x,
						skillid: response.id,
						skill: response.name }
					)
				);
				this.setState({
					displayer: cbs
				});
				$("#skill").select2("val", "");
			}.bind(this)

		});
	},
	handleDegreeChange(e) {
        this.setState({
            degreeid : e
        })
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
				have_pic : true
			});
		}
    },
	gotoStep2(){
		this.props.updateStep2();
		this.fetchSchools();
		$("html, body").animate({ scrollTop: 0 }, "slow");
	},
	gotoStep3(e){
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "/api/v1/educations/student/next/"+id,
			data: {
				step: this.props.step
			},
			beforeSend: function(){
				$(".btn-next").html('<b>Saving </b><i class="fa fa-circle-o-notch fa-spin"></i>');
				$(".error_message").removeClass('show_error');
			},
			success: function(response) {
				if(response.edu_count == 0){
					$(".btn-next").html('<b>Next</b> <img class="fa img-responsive next-arrow-onboard-img" src="/dist/img/next-arrow.png">');
					$(".error_message").html(''+response.error_message+'');
					$(".error_message").addClass('show_error');
					setTimeout(function () {
					    $(".error_message").removeClass('show_error');
					}, 2000);
					return;
				}
				else{
					$(".btn-next").html('<b>Finish</b>');
					this.props.updateStep3();
					$("html, body").animate({ scrollTop: 0 }, "slow");
				}
			}.bind(this)
		});
	},
	finish(e){
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "/api/v1/educations/student/next/"+id,
			data: {
				step: this.props.step
			},
			beforeSend: function(){
				$(".btn-next").html('<b>Saving </b><i class="fa fa-circle-o-notch fa-spin"></i>');
				$(".error_message").removeClass('show_error');
			},
			success: function(response) {
				if(response.skill_count == 0){
					$(".btn-next").html('<b>Finish </b><img class="fa img-responsive next-arrow-onboard-img" src="/dist/img/next-arrow.png">');
					$(".error_message").html(''+response.error_message+'');
					$(".error_message").addClass('show_error');
					setTimeout(function () {
					    $(".error_message").removeClass('show_error');
					}, 2000);
					return;
				}
				else{
					window.location= "/" + id + "/verify";
				}
			}.bind(this)
		});
	},
	handleSubmit(e) {
		e.preventDefault();

		var file = e.target[0].files;
        var formData = new FormData();

		if(this.state.have_pic == true){
			formData.append('file', file[0]);
		}
        formData.append('fname', this.state.fname);
        formData.append('lname', this.state.lname);
        formData.append('school_id', this.state.schoolid);
        formData.append('degree_id', this.state.degreeid);
        formData.append('yr_lvl', this.state.yr_lvl);
        formData.append('contact_no', this.state.contact_no);
        formData.append('gender', this.state.gender);
        formData.append('date_of_birth', this.state.date_of_birth);

		this.sendToServer(formData);
		return;
	},
	showEducationModal(){
		$("#educationModal").modal('show');
	},
    sendToServer(formData) {
        $.ajax({
            type: "POST",
            url: "/api/v1/register/student/"+id+"/details",
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
                $(".btn-next").html('<b>Saving</b> <i class="fa fa-circle-o-notch fa-spin"></i>');
            },
			error: function(jqXhr, json, errorThrown) {
                if(jqXhr.status === 422) {
				   $(".btn-next").html('<b>Next</b> <img class="fa img-responsive next-arrow-onboard-img" src="/dist/img/next-arrow.png">');
                   //status means that this is a validation error, now we need to get messages from JSON
                   var errors = jqXhr.responseJSON;
                   var fnameMessage = errors['fname'];
                   var lnameMessage = errors['lname'];
                   var fileMessage = errors['file'];
                   var genderMessage = errors['gender'];
                   var contactNoMessage = errors['contact_no'];
                   var dobMessage = errors['date_of_birth'];
                   var schoolIdMessage = errors['school_id'];
                   var degreeIdMessage = errors['degree_id'];
                   var yrLvlMessage = errors['yr_lvl'];


                   this.setState({
                       error_fname: fnameMessage,
                       error_lname: lnameMessage,
                       error_gender: genderMessage,
                       error_schoolid: schoolIdMessage,
                       error_degreeid: degreeIdMessage,
                       error_pic_url : fileMessage,
                       error_yr_lvl: yrLvlMessage,
                       error_contact_no: contactNoMessage,
                       error_date_of_birth: dobMessage,
                       submitted: false
                   });

                    if("lname" in errors) {
                        $('#lastname').addClass('parsley-error').focus();
                    } else {
                        $('#lastname').removeClass('parsley-error');
                    }

                    if("fname" in errors) {
                        $('#firstname').addClass('parsley-error').focus();
                    } else {
                        $('#firstname').removeClass('parsley-error');
                    }

                    if("date_of_birth" in errors) {
                        $('#birthday').addClass('parsley-error');
                    } else {
                        $('#birthday').removeClass('parsley-error');
                    }

                    if("schoolid" in errors) {
                        $('.select2-selection--single').css('border-color', 'red');
                    } else {
                        $('#school-list').removeClass('parsley-error');
                    }

                    if("degreeid" in errors) {
                        $('#degree-list').addClass('parsley-error');
                    } else {
                        $('#degree-list').removeClass('parsley-error');
                    }

                    if("yr_lvl" in errors) {
                        $('#yr_lvl').addClass('parsley-error');
                    } else {
                        $('#yr_lvl').removeClass('parsley-error');
                    }

                    if("contact_no" in errors) {
                        $('#contact').addClass('parsley-error');
                    } else {
                        $('#contact').removeClass('parsley-error');
                    }
               }
		   }.bind(this),
			success: function(data) {
				$(".btn-next").html('<b>Next</b> <img class="fa img-responsive next-arrow-onboard-img" src="/dist/img/next-arrow.png">');
				this.setState({
					btnPrev: " Previous",
					school_name: data.school.name,
					degree_name: data.degree.name,
					school_pic: "/img/profilepics/"+data.school_image
				});
				this.gotoStep2();
            }.bind(this)
        });
    },
	submitEducation(e){
		e.preventDefault();
		var educationData = new FormData();

		educationData.append('school_id', this.state.newschoolid);
		educationData.append('degree_id', this.state.newdegreeid);
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
					   $('#schoolStart').addClass('parsley-error').focus();
					   $('#schoolEnd').addClass('parsley-error');
				   } else {
					   $('#schoolStart').removeClass('parsley-error');
					   $('#schoolEnd').removeClass('parsley-error');
				   }
			    }
				$(".btn-add-education").html('<b>Add</b>');

			}.bind(this),
            beforeSend: function() {
                $(".btn-add-education").html('<b>Saving </b><i class="fa fa-circle-o-notch fa-spin"></i>');
            },
			success: function(data) {
				var cbs = this.state.displayer;
				cbs.push(React.createElement(Add_Edu,{ key: data.education.id, school: data.school, degree: data.degree, data: data.education }));
				this.setState({
					displayer: cbs
				});

				$(".btn-add-education").html('<b>Add</b>');
				$("#educationModal").modal('hide');
				$("#educationModal").on('hidden.bs.modal', function(){
				    $(this).find('form')[0].reset();
					$("#school").select2("val", "");
					$("#degree").select2("val", "");
					$('#schoolStart').removeClass('parsley-error');
					$('#schoolEnd').removeClass('parsley-error');
				});

				this.setState({
					error_schoolid_edu: "",
					error_degreeid_edu: "",
					error_schoolstart: "",
					error_schoolend: "",
					error_attainment: "",
					newschoolid: "",
					newdegreeid: "",
					schoolStart: "",
					schoolEnd: "",
				});

            }.bind(this)
        });
    },
	render: function render(){
		if(this.props.step == 1){
			return React.createElement(
				"div",
				null,
				React.createElement(
					"form",
					{onSubmit: this.handleSubmit, encType: "multipart/form-data"},
					React.createElement(
					  "div",
					  { "className": "stepContainer"},
					  React.createElement(
				        'div',
				        { className: 'col-md-12 col-sm-12 col-xs-12 steps_box' },
				        React.createElement(
				          'div',
				          { className: 'x_panel panel_steps' },
				          React.createElement(
				            'div',
				            { className: 'x_content steps_content' },
							React.createElement(
						        'div',
						        { className: 'x_title x_header' },
						        React.createElement(
						          'h2',
						          { className:"sky_blue" },
						          "Step 1: We'd like to know you a bit more. Can you introduce yourself?"
						        ),
						        React.createElement('div', { className: 'clearfix' })
						    ),
				            React.createElement(
				              'div',
				              { className: 'row steps_body' },
				              React.createElement(
								  'div',
								  { className: 'col-md-3 col-sm-3 col-xs-12' },
								  React.createElement(
							        'div',
							        { className: 'profile_img hover-btn' },
							          React.createElement(
										  'img',
										  {id:"output",
										  className: 'img-responsive thumbnail avatar-view hover-btn',
										  src: this.state.pic_url,
										  alt: 'Avatar'}
									  ),
									  React.createElement(
										  "input",
										   {type:"file",
										   onChange: this.loadFile,
										   className:"image file-upload inputfile inputfile-1",
										   name: "file",
										   id:"file-1"}
									   ),
									   React.createElement(
										   "label",
										   {className:"icon-prof",
										   htmlFor: "file-1"},
										   React.createElement("div",{className:"fa fa-camera label-camera"}),
										   React.createElement("div",{className:"label-prof"}, "Change photo")
									   ),
									   React.createElement(
										   "div",
										   { className: "pic-error"},
										   React.createElement(
											 'ul',
											 { className: 'parsley-errors-list pic-error'},
											 React.createElement (
												 'li',
												 { className: 'parsley-required'},
												 this.state.error_pic_url
											 )
										   )
									   )
							        )
						      ),
				              React.createElement(
								  'div',
								  { className: 'col-md-9 col-sm-9 col-xs-12' },
								  React.createElement(
									  "div",
									  { className:"row" },
									  React.createElement(
										  "div",
										  { className:"col-md-6 col-sm-6 col-xs-12" },
										  React.createElement(
									        'div',
									        { className: 'form-group has-feedback' },
											React.createElement('label', { htmlFor:"firstname", className:"font-14" }, "First Name"),
									        React.createElement(
												'input',
												{
												id:"firstname",
												type: 'text',
												className: 'form-control',
												placeholder: 'First Name',
												onChange: this.handleChange.bind(this, 'fname')
												}
											),
											React.createElement(
                                               'ul',
                                               { className: 'parsley-errors-list'},
                                               React.createElement (
                                                   'li',
                                                   { className: 'parsley-required'},
                                                   this.state.error_fname
                                               )
									  	  )
										)
									  ),
									  React.createElement(
										  "div",
										  { className:"'col-md-6 col-sm-6 col-xs-12" },
										  React.createElement(
									        'div',
									        { className: 'form-group has-feedback' },
											React.createElement('label', { htmlFor:"lastname", className:"font-14"}, "Last Name"),
									        React.createElement("input", { id:"lastname", type: 'text', className: 'form-control', placeholder: 'Last Name', onChange: this.handleChange.bind(this, 'lname') }),
											React.createElement(
                                               'ul',
                                               { className: 'parsley-errors-list'},
                                               React.createElement (
                                                   'li',
                                                   { className: 'parsley-required'},
                                                   this.state.error_lname
                                               )
									  	  	)
										  )
									  )
								 ),
								  React.createElement(
									  "div",
									  { className:"row" },
									  React.createElement(
										  "div",
										  { className:"'col-md-6 col-sm-6 col-xs-12" },
										  React.createElement(
									        'div',
									        { className: 'form-group has-feedback' },
											React.createElement('label', { htmlFor:"birthday", className:"font-14"}, "Date of Birth"),
									        React.createElement('input', { placeholder:"Date of Birth", id:"birthday", type: 'text', className: 'date-picker form-control', name:"date_of_birth" }),
											React.createElement('span', { className: 'fa fa-calendar form-control-feedback' }),
											React.createElement(
                                               'ul',
		                                           { className: 'parsley-errors-list'},
		                                           React.createElement (
		                                               'li',
		                                               { className: 'parsley-required'},
		                                               this.state.error_date_of_birth
		                                           )
										  	  )
										   )
									  ),
									  React.createElement(
										  "div",
										  { className:"'col-md-4 col-sm-4 col-xs-12" },
										  React.createElement(
									        'div',
									        null,
									        React.createElement('label', {className:"font-14"}, "Gender")
										  ),
										  React.createElement(
									        'div',
									        null,
											React.createElement(
										        'div',
										        { id:"gender", className: 'btn-group', 'data-toggle': 'buttons' },
										        React.createElement(
										          'label',
										          { className: 'btn btn-default active', 'data-toggle-class': 'btn-primary', 'data-toggle-passive-class': 'btn-default', onClick: this.handleGenderM  },
										          React.createElement('input', { type:"radio", 'data-parsley-multiple': 'gender'}),
										          " Male"
										        ),
										        React.createElement(
										          'label',
										          { className: 'btn btn-default', 'data-toggle-class': 'btn-primary', 'data-toggle-passive-class': 'btn-default', onClick: this.handleGenderF },
										          React.createElement('input', { type:"radio", 'data-parsley-multiple': 'gender'}),
										          ' Female'
										        )
										      )
										   )
									  )
								 ),
								  React.createElement(
									  "div",
									  { className:"row" },
									  React.createElement(
										  "div",
										  { className:"col-md-6 col-sm-6 col-xs-12" },
										  React.createElement(
											  'div',
											  { className: 'form-group' },
											  React.createElement('label', { htmlFor:"school", className:"font-14"}, "School"),
											  React.createElement(
												  SchoolSelectProf,
												  { data: this.state.dataSchools, schoolid: this.state.schoolid, updateSchool: this.handleSchoolChange}
										  	  ),
											  React.createElement(
	                                                 'ul',
	                                                 { className: 'parsley-errors-list'},
	                                                 React.createElement (
	                                                     'li',
	                                                     { className: 'parsley-required'},
	                                                     this.state.error_schoolid
	                                                 )
	  									  	  )
										  )
									  )
								 ),
								 React.createElement(
									 "div",
									 { className:"row" },
									 React.createElement(
										 "div",
										 { className:"'col-md-6 col-sm-6 col-xs-12" },
										 React.createElement(
											 'div',
											 { className: 'form-group' },
											 React.createElement('label', { htmlFor:"school", className:"font-14"}, "Course"),
											 React.createElement(
												 DegreeSelectProf,
												 {data: this.state.dataDegrees, degreeid: this.state.degreeid, updateDegree: this.handleDegreeChange}
											 ),
											 React.createElement(
	                                                'ul',
	                                                { className: 'parsley-errors-list'},
	                                                React.createElement (
	                                                    'li',
	                                                    { className: 'parsley-required'},
	                                                    this.state.error_degreeid
	                                                )
	 									  	  )
										 )
									 ),
									 React.createElement(
										 "div",
										 { className:"'col-md-3 col-sm-3 col-xs-12" },
										 React.createElement(
										   'div',
										   { className: 'form-group has-feedback' },
										   React.createElement('label', { htmlFor:"yr_lvl", className:"font-14"}, "Year Level"),
										   React.createElement('input', { id:"yr_lvl", type: 'text', className: 'form-control', placeholder: 'Year Level', onChange: this.handleChange.bind(this, 'yr_lvl') }),
										   React.createElement(
												  'ul',
												  { className: 'parsley-errors-list'},
												  React.createElement (
													  'li',
													  { className: 'parsley-required'},
													  this.state.error_yr_lvl
												  )
											 )
										  )
									 )
								),
								React.createElement(
									"div",
									{ className:"row" },
									React.createElement(
										 "div",
										 { className:"'col-md-6 col-sm-6 col-xs-12" },
										 React.createElement(
										   'div',
										   { className: 'form-group has-feedback' },
										   React.createElement('label', { htmlFor:"contact", className:"font-14"}, "Contact Number"),
										   React.createElement('input', { id:"contact", type:"text", className: 'form-control', placeholder: 'Contact Number', onChange: this.handleChange.bind(this, 'contact_no') }),
										   React.createElement(
											  'ul',
												  { className: 'parsley-errors-list'},
												  React.createElement (
													  'li',
													  { className: 'parsley-required'},
													  this.state.error_contact_no
												  )
											 )
									    )
								    )
							     )
							  )
						    ),
							React.createElement(
								"div",
								{ className:"x_footer x_foot" },
								React.createElement(
								  'div',
								  { 'className': 'form-group has-feedback' },
								  React.createElement(
										'a',
										{className:"btn prev-btn-onboard pull-left", href:"/"+id+"/pickuser"},
										React.createElement('img', { className: 'fa img-responsive prev-arrow-onboard-img', src: '/dist/img/prev-arrow.png' }),
										React.createElement("strong",{ className:"font-14"},this.state.btnPrev)
								  ),
								  React.createElement(
									   'button',
									   {type:"submit", className:"btn next-arrow-onboard pull-right btn-next"},
										React.createElement("strong",{ className:"font-14"}, this.state.btnNext),
										React.createElement('img', { className: 'fa img-responsive next-arrow-onboard-img', src: '/dist/img/next-arrow.png' })
								 )
							   )
							 )
				          )
				        )
				      )
					)
				)
			);
		}
		if(this.props.step == 2){
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					null,
					React.createElement(
					  "div",
					  { "className": "stepContainer"},
					  React.createElement(
						'div',
						{ className: 'col-md-12 col-sm-12 col-xs-12 steps_box' },
						React.createElement(
						  'div',
						  { className: 'x_panel panel_steps' },
						  React.createElement(
							'div',
							{ className: 'x_content steps_content' },
							React.createElement(
								'div',
								{ className: 'x_title x_header' },
								React.createElement(
								  'h2',
								  { className:"sky_blue" },
								  "Step 2: What schools have you gone to and where are you studying now?"
								),
								React.createElement('div', { className: 'clearfix' })
							),
							React.createElement(
						      'div',
						      { className: 'profile_details' },
							React.createElement(
								Education_list,
			                    {dataEducation: this.state.dataEducation}
							),
							React.createElement(
								"div",
								null,
								this.state.displayer
							),
							React.createElement(
							  'div',
							  { className: 'col-md-4 col-sm-4 col-xs-12' },
							  React.createElement(
								'div',
								{ className: 'well profile_view add_school_box', onClick: this.showEducationModal },
								React.createElement(
								  'h4',
								  { className: 'brief' },
									  React.createElement('img', { src: "/dist/img/plus.png", alt: 'Add School', className: 'center-margin img-responsive add_school_image' })
								),
								React.createElement(
								  'div',
								  { className: 'title_center col-xs-12 margin_top' },
								  React.createElement(
									'h2',
									{ className:"font-18 gray2" },
									"Add Education"
								  )
								)
							  )
						    )
						  ),
							React.createElement(
								"div",
								{ className:"x_footer x_foot" },
								React.createElement(
								  'div',
								  { 'className': 'form-group has-feedback' },
								  React.createElement(
									  "div",
									  null,
									  React.createElement(
										   'button',
										   {type:"submit",className:"btn next-arrow-onboard pull-right btn-next", onClick:this.gotoStep3},
											React.createElement("strong",{ className:"font-14"}, this.state.btnNext),
											React.createElement('img', { className: 'fa img-responsive next-arrow-onboard-img', src: '/dist/img/next-arrow.png' })
									 ),
									 React.createElement(
										 "div",
										 {className:"error_message"}
									 )
								  )
							   )
							 )
						  )
						)
					  )
					)
				),
				React.createElement(
					"div",
					{id: "educationModal", className: "modal fade", role: "dialog", "aria-hidden": true},
					React.createElement(
						"div",
						{className: "modal-dialog"},
						React.createElement(
							"form",
							{className: "modal-content", onSubmit: this.submitEducation},
							React.createElement(
								"div",
								{className: "modal-header"},
								React.createElement(
									"button",
									{type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": true}, "×"
								),
								React.createElement(
									"h3",
									null,
									"Add Education"
								)
							),
							React.createElement(
								"div",
								{className: "modal-body"},
								React.createElement(
										"div",
										{className:"container"},
									React.createElement(
										"div",
										{className: "form col-md-12 form-horizontal form-label-left"},
										React.createElement(
											"div",
											{className:"row"},
											React.createElement(
												"label",
												{className:"control-label col-md-4 col-sm-4 col-xs-12 font-14"},
												"Name of School"
											),
											React.createElement(
												"div",
												{className:"form_education col-md-8 col-sm-8 col-xs-12"},
												React.createElement(
	  											  SchoolSelect,
	  											  { data: this.state.dataSchools, updateSchool: this.handleNewSchool}
	  										  ),
											  React.createElement(
  												'ul',
  												{ className: 'parsley-errors-list'},
  												React.createElement (
  													'li',
  													{ className: 'parsley-required'},
  													this.state.error_schoolid_edu
  												)
  											  )
										    )
										),
										React.createElement(
											"div",
											{className:"row"},
											React.createElement(
												"label",
												{className:"control-label col-md-4 col-sm-4 col-xs-12 font-14"},
												"Educational Attainment"
											),
											React.createElement(
										        'div',
										        { id:"gender", className: 'form_education btn-group col-md-8 col-sm-8 col-xs-12', 'data-toggle': 'buttons' },
										        React.createElement(
										          'label',
										          { className: 'btn btn-edu btn-default active', 'data-toggle-class': 'btn-primary', 'data-toggle-passive-class': 'btn-default', onClick: this.handleCollege },
										          React.createElement('input', { type:"radio", 'data-parsley-multiple': 'attainment'}),
										          "College"
										        ),
										        React.createElement(
										          'label',
										          { className: 'btn btn-edu btn-default', 'data-toggle-class': 'btn-primary', 'data-toggle-passive-class': 'btn-default', onClick: this.handleHighschool },
										          React.createElement('input', { type:"radio", 'data-parsley-multiple': 'attainment'}),
										          'Highschool'
											  ),
												React.createElement(
										          'label',
										          { className: 'btn btn-edu btn-default', 'data-toggle-class': 'btn-primary', 'data-toggle-passive-class': 'btn-default', onClick: this.handleElementary },
										          React.createElement('input', { type:"radio", 'data-parsley-multiple': 'attainment'}),
										          'Elementary'
										        )
										    )
										),React.createElement(
										  "div",
										  {className:"row", id:"showDegree"},
										  React.createElement(
											  "label",
											  {className:"control-label col-md-4 col-sm-4 col-xs-12 font-14"},
											  "Course"
										  ),
										  React.createElement(
											  "div",
											  {className:"form_education col-md-8 col-sm-8 col-xs-12"},
											  React.createElement(
											   DegreeSelect,
											   {data: this.state.dataDegrees, updateDegree: this.handleNewDegree}
										   ),
										   React.createElement(
											 'ul',
											 { className: 'parsley-errors-list'},
											 React.createElement (
												 'li',
												 { className: 'parsley-required'},
												 this.state.error_degreeid_edu
											 )
										   )
										  )
									  ),
										React.createElement(
											"div",
											{className:"row"},
											React.createElement(
												"label",
												{className:"control-label col-md-4 col-sm-4 col-xs-12 font-14"},
												"Year Attended"
											),
											React.createElement(
												'div',
												{ className: 'form_education col-md-3 col-sm-3 col-xs-12 form-group has-feedback' },
												React.createElement('input', { defaultValue:"", placeholder:"Start", id:"schoolStart", type: 'year', className: 'date-picker form-control', onChange: this.handleChange.bind(this, 'schoolStart'), pattern: "[1-9][0-9]*|0", minLength: 4, maxLength: 4, required:"required"  }),
												React.createElement('span', { className: 'fa fa-calendar form-control-feedback' })
										   ),
										   React.createElement(
											   "label",
											   {className:"to col-md-1 col-sm-1 col-xs-12 control-label font-14"},
											   "to"
										   ),
										   React.createElement(
											  'div',
											  { className: 'form_education col-md-3 col-sm-3 col-xs-12 form-group has-feedback' },
											  React.createElement('input', { placeholder:"End", id:"schoolEnd", type: 'text', className: 'date-picker form-control', onChange: this.handleChange.bind(this, 'schoolEnd'), pattern: "[1-9][0-9]*|0", minLength: 4, maxLength: 4, required:"required" }),
											  React.createElement('span', { className: 'fa fa-calendar form-control-feedback' })
										  ),
										  React.createElement(
											  'div',
											  { className: 'error-year-attended'},
												 React.createElement(
												   'ul',
												   { className: 'parsley-errors-list error-year-attended col-md-offset-4 col-sm-8 col-xs-12'},
												   React.createElement (
													   'li',
													   { className: 'parsley-required'},
													   this.state.error_schoolend
												   )
											   )
										  )
									  ),
									  React.createElement(
									   'ul',
										{ className: 'parsley-errors-list col-md-offset-4 col-sm-8 col-xs-12'},
										React.createElement (
											'li',
											{ className: 'parsley-required'},
											this.state.error_schoolstart
										)
									  )
									)
								  )
								),
								React.createElement(
									"div",
									{className: "modal-footer"},
									React.createElement(
										"div",
										{ className:"x_footer x_modal_foot" },
										React.createElement(
										  'div',
										  { 'className': 'form-group has-feedback' },
										  React.createElement(
												'a',
												{className:"btn prev-btn-onboard pull-left", "data-dismiss": "modal", "aria-hidden": true},
												React.createElement("strong",{ className:"font-14"}, "Cancel")
										  ),
										  React.createElement(
											   'button',
											   {type:"submit", className:"btn next-arrow-onboard pull-right btn-add-education" },
												React.createElement("strong",{ className:"font-14"}, "Add")
										 )
									 )
								)
							)
						)
					)
				)
			);
		}
		if(this.props.step == 3){
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					null,
					React.createElement(
					  "div",
					  { "className": "stepContainer"},
					  React.createElement(
				        'div',
				        { className: 'col-md-12 col-sm-12 col-xs-12 steps_box' },
				        React.createElement(
				          'div',
				          { className: 'x_panel panel_steps' },
				          React.createElement(
				            'div',
				            { className: 'x_content steps_content' },
							React.createElement(
						        'div',
						        { className: 'x_title x_header' },
						        React.createElement(
						          'h2',
						          { className:"sky_blue" },
						          "Step 3: Almost there! What are the things you're good at?"
						        ),
						        React.createElement('div', { className: 'clearfix' })
						    ),
							React.createElement(
				              'div',
				              { className: 'row steps_body' },
							  React.createElement(
	  				              'form',
	  				              { className: 'row', onSubmit:this.onAddSkill },
	  				              React.createElement(
	  								  'div',
	  								  { className: 'col-md-6 col-sm-6 col-xs-12' },
	  								  React.createElement(
	  									'div',
	  									{ className: 'form-group has-feedback' },
	  									React.createElement(
	  										SkillSelect,
	  										{ data: this.state.dataSkills, skill: this.state.skill, updateSkill: this.handleSkillChange, updateSkillbyEnter: this.updateSkillbyEnter}
	  									),
	  									React.createElement(
  										   'ul',
  										   { className: 'parsley-errors-list hide-error', id:"exists"},
  										   React.createElement (
  											   'li',
  											   { className: 'parsley-required'},
  											   "Skill already exists in your list"
  										   )
	  									)
	  								)
	  							 ),
	  							  React.createElement(
	  								  'div',
	  								  { className: 'col-md-6 col-sm-6 col-xs-12' },
	  								  React.createElement(
	  									  'button',
	  									  {type:"submit", className:"btn add-skill-onboard pull-left", id:"addskill"},
	  									   React.createElement("strong",{ className:"font-14"}, "Add ")
	  								)
	  							  )
	  						    ),
	  							React.createElement(
	  				              'div',
	  				              { className: 'row suggest-row' },
	  							  React.createElement(
	  								  "div",
	  								  {className: "form col-md-12 form-horizontal form-label-left"},
	  								  React.createElement(
	  									  "div",
	  									  {className:"row"},
	  									  React.createElement(
	  										  "div",
	  										  {className:"col-md-1 col-sm-1 col-xs-12 font-14"},
											  React.createElement(
		  										  "label",
		  										  {className:"suggest-label"},
		  										  "Suggestions: "
		  									  )
	  									  ),
	  									  React.createElement(
											  "div",
											  {className:"col-md-11 col-sm-11 col-xs-12"},
											  React.createElement(
												  "label",
		  										  {className:"btn btn-default btn-xs suggest-btns", onClick:this.addPhp},
												  React.createElement("span",{className:"fa fa-plus"}),
		  										  React.createElement("span",{className:"font-13 suggest-word"},"php")
											  ),
											  React.createElement(
 												 "label",
 												 {className:"btn btn-default btn-xs suggest-btns", onClick:this.addAutocad},
 												 React.createElement("span",{className:"fa fa-plus"}),
 												 React.createElement("span",{className:"font-13 suggest-word"},"autocad")
 											 ),
											 React.createElement(
												 "label",
												 {className:"btn btn-default btn-xs suggest-btns", onClick:this.addCs},
												 React.createElement("span",{className:"fa fa-plus"}),
												 React.createElement("span",{className:"font-13 suggest-word"},"Customer Support")
											 ),
											 React.createElement(
												 "label",
												 {className:"btn btn-default btn-xs suggest-btns", onClick:this.addMd},
												 React.createElement("span",{className:"fa fa-plus"}),
												 React.createElement("span",{className:"font-13 suggest-word"},"Mobile Development")
											 ),
											 React.createElement(
												 "label",
												 {className:"btn btn-default btn-xs suggest-btns", onClick:this.addGd},
												 React.createElement("span",{className:"fa fa-plus"}),
												 React.createElement("span",{className:"font-13 suggest-word"},"Graphic Designing")
											 ),
											 React.createElement(
												 "label",
												 {className:"btn btn-default btn-xs suggest-btns", onClick:this.addHtml},
												 React.createElement("span",{className:"fa fa-plus"}),
												 React.createElement("span",{className:"font-13 suggest-word"},"html")
											 ),
											 React.createElement(
												 "label",
												 {className:"btn btn-default btn-xs suggest-btns", onClick:this.addSa},
												 React.createElement("span",{className:"fa fa-plus"}),
												 React.createElement("span",{className:"font-13 suggest-word"},"System Analysis")
											 )
	  									  )
	  								  )
	  							  )
							  ),
							   React.createElement(
								 'div',
								 { className: 'row' },
								 React.createElement(
									 "div",
									 {className: "form col-md-12 col-sm-12 col-xs-12"},
									 React.createElement(
										 "div",
										 {className:"display-skills"},
										 React.createElement(
											 Skill_list,
											 { data: this.state.student_skills }
										 ),
										 this.state.selectedSkills
									 )
								 )
							  )
						    ),
							React.createElement(
								"div",
								{ className:"x_footer x_foot" },
								React.createElement(
								  'div',
								  { 'className': 'form-group has-feedback' },
								  React.createElement(
									  "form",
									  {onSubmit: this.finish},
									  React.createElement(
										   'button',
										   {type:"submit", className:"btn next-arrow-onboard pull-right btn-next"},
											React.createElement("strong",{ className:"font-14"}, "Finish"),
											React.createElement('img', { className: 'fa img-responsive next-arrow-onboard-img', src: '/dist/img/next-arrow.png' })
									 )
								 ),
								 React.createElement(
									 "div",
									 {className:"error_message step3_error"}
								 )
							   )
							 )
				          )
				        )
				      )
					)
				)
			)
		}
	}
});

var Selected_skills = React.createClass({
	getInitialState(){
		return{
			skill: this.props.skill
		};
	},
	onRemove(){
		$.ajax({
			type: "DELETE",
			url: "/api/v1/skills/student/delete/"+id,
			data: {
				skill: this.props.skillid
			},
			success: function(data) {
			}.bind(this)
		});

		$(".delete_"+this.props.skillid).parent('label').remove();
	},
	render: function render(){
		return  React.createElement(
			"div",
			{className:"inline-div"},
			React.createElement(
				"label",
				{className:"btn-default btn-xs selected-btns"},
				React.createElement("span",{className:"fa fa-remove remove-x delete_"+this.props.skillid, onClick:this.onRemove}),
				React.createElement("span",{className:"remove-word"},this.state.skill)
			)
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
            {className:"inline-div"},
            this.props.data.map(skillOpt)
        );
    }
});

var Skills = React.createClass({
    displayName: "Skills",
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
			}.bind(this)
		});

		$(".delete_"+this.props.data.id).parent('label').remove();
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

var SkillSelect = React.createClass({
    displayName: "SkillSelect",
    getInitialState: function(){
        return {
			skill: this.props.skill
        };
    },
	componentDidMount: function(){
		$("#skill").select2({
		  placeholder: "Add your skill here",
		  tags: true,
		  maximumSelectionLength: 1
		});

        $('#skill').on("change", this.handleChange);
	},
	handleChange(e) {
		this.setState({
			skill : e.target.value
		})
		this.props.updateSkill(e.target.value);

		if(event.keyCode == 13){
			this.setState({
				skill : e.target.value
			})
			this.props.updateSkillbyEnter(e.target.value);
		}
	},
    render: function render() {
		var skill = this.state.skill;
        var skillOpt = function skillOpt(result) {
            return React.createElement(SkillOptions,
                {key: result.id,
                data: result
            });
        };
		if(skill == "undefined" || skill == null){
			skill = "";
		}
        return	React.createElement(
			  "select",
              {
              className:"select2_single form-control skill",
			  id:"skill",
			  multiple:"multiple",
			  onKeyDown: this.handleChange
              },
			  React.createElement(
				  "option",
				  {value: skill},
				  skill
			  ),
              this.props.data.map(skillOpt)
		);
    }
});

var SkillOptions = React.createClass({
    displayName: "SkillOptions",

    render: function render() {
        return React.createElement(
            "option",
            {
               value: this.props.data.name
            },
            this.props.data.name
        )
    }
});

var Add_Edu = React.createClass({
    getInitialState(){
		if(this.props.degree == null || this.props.degree == "undefined" || this.props.degree == ""){
			return{
				education_id: this.props.data.id,
	            school_pic: "/dist/img/avatar-default-school.png",
				school_name: this.props.school.name,
				degree_name: "",
				schoolStart: this.props.data.edu_start,
				schoolEnd: this.props.data.edu_end,
				attainment: this.props.data.educational_attainment,
				newschool_name: this.props.school.name,
				newdegree_name: "",
				newschoolStart: this.props.data.edu_start,
				newschoolEnd: this.props.data.edu_end,
				newattainment: this.props.data.educational_attainment,
				dataSchools: [],
				dataDegrees: []
	        };
		}
		else{
			return{
				education_id: this.props.data.id,
	            school_pic: "/dist/img/avatar-default-school.png",
				school_name: this.props.school.name,
				degree_name: this.props.degree.name,
				schoolStart: this.props.data.edu_start,
				schoolEnd: this.props.data.edu_end,
				attainment: this.props.data.educational_attainment,
				newschool_name: this.props.school.name,
				newdegree_name: this.props.degree.name,
				newschoolStart: this.props.data.edu_start,
				newschoolEnd: this.props.data.edu_end,
				newattainment: this.props.data.educational_attainment,
				dataSchools: [],
				dataDegrees: []
	        };
		}
    },
	handleEditDegree(e){
		this.setState({
			newdegree_name: e
		});
	},
	handleEditSchool(e){
		this.setState({
			newschool_name: e
		});
	},
	handleChange(field, e){
        var state = {};
        state[field] = e.target.value;
        this.setState(state);
    },
	handleCollege(e){
		$('#showDegree'+this.state.education_id).slideDown('fast');
		this.setState({
			newattainment: "College"
		});
	},
	handleHighschool(e){
		$('#showDegree'+this.state.education_id).slideUp('fast');
		this.setState({
			newattainment: "Highschool",
		});
	},
	handleElementary(e){
		$('#showDegree'+this.state.education_id).slideUp('fast');
		this.setState({
			newattainment: "Elementary",
		});
	},
	showEdit(e){
		e.preventDefault();
		this.checkAttainment(this.state.attainment);
		$.ajax({
			type: "GET",
			url: "/api/v1/degrees",
			success: function(resultDegrees){
				this.setState({
					dataDegrees: resultDegrees
				});
			}.bind(this),
            error: function(){
				window.location.reload();
			}
		});

		$.ajax({
			type: "GET",
			url: "/api/v1/schools",
			success: function(resultSchools){
				this.setState({
					dataSchools: resultSchools
				});
			}.bind(this),
            error: function(){
				window.location.reload();
			}
		});

		$("#editEducationModal"+this.state.education_id).modal('show');
	},
	checkAttainment(attainment){
		if(attainment == "College"){
			$("#"+attainment+this.state.education_id).addClass('active');
			$("#Highschool"+this.state.education_id).removeClass('active');
			$("#Elementary"+this.state.education_id).removeClass('active');
		}
		if(attainment == "Highschool"){
			$("#"+attainment+this.state.education_id).addClass('active');
			$("#College"+this.state.education_id).removeClass('active');
			$("#Elementary"+this.state.education_id).removeClass('active');
			$('#showDegree'+this.state.education_id).slideUp('fast');
		}
		if(attainment == "Elementary"){
			$("#"+attainment+this.state.education_id).addClass('active');
			$("#Highschool"+this.state.education_id).removeClass('active');
			$("#College"+this.state.education_id).removeClass('active');
			$('#showDegree'+this.state.education_id).slideUp('fast');
		}
	},
	handleSave(e) {
		e.preventDefault();
		var id = this.state.education_id;
		var saveData = new FormData();

		if(this.state.newattainment == "Highschool" || this.state.newattainment == "Elementary"){
			saveData.append('degree_id', "");
		}else{
			saveData.append('degree_id', this.state.newdegree_name);
		}

		saveData.append('edu_start', this.state.newschoolStart);
		saveData.append('edu_end', this.state.newschoolEnd);
		saveData.append('educational_attainment', this.state.newattainment);
		saveData.append('school_id', this.state.newschool_name);

		// console.log(this.state.newdegree_name);
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
					   error_schoolend: eduEndMessage,
					   error_attainment: attainmentMessage,
					   submitted: false,
				   });

				   if("edu_start" in errors || "edu_end" in errors) {
					   $('#schoolStart'+this.state.education_id).addClass('parsley-error').focus();
					   $('#schoolEnd'+this.state.education_id).addClass('parsley-error');
				   } else {
					   $('#schoolStart'+this.state.education_id).removeClass('parsley-error');
					   $('#schoolEnd'+this.state.education_id).removeClass('parsley-error');
				   }
			    }
				$(".btn-edit-education").html('<b>Save Changes</b>');

			}.bind(this),
			beforeSend: function(){
				$(".btn-edit-education").html('<b>Saving </b><i class="fa fa-circle-o-notch fa-spin"></i>');
			},
			success: function(data) {
				$(".btn-edit-education").html('<b>Save Changes</b>');
				if(data.degree == null){
					this.setState({
						school_name: data.school,
						degree_name: "",
						schoolStart: data.edu_start,
						schoolEnd: data.edu_end,
						attainment: data.educational_attainment,
						error_schoolid_edu: "",
                        error_degreeid_edu: "",
                        error_schoolstart: "",
 					   error_schoolend: "",
 					   error_attainment: ""
					})
				}
				else{
					this.setState({
						school_name: data.school,
						degree_name: data.degree.name,
						schoolStart: data.edu_start,
						schoolEnd: data.edu_end,
						attainment: data.educational_attainment,
						error_schoolid_edu: "",
                        error_degreeid_edu: "",
                        error_schoolstart: "",
 					    error_schoolend: "",
 					    error_attainment: ""
					})
				}
				$("#editEducationModal"+this.state.education_id).modal('hide');
				$('#schoolStart'+this.state.education_id).removeClass('parsley-error');
				$('#schoolEnd'+this.state.education_id).removeClass('parsley-error');
			}.bind(this)
		});
	},
	confirmDelete(e) {
		e.preventDefault();
		$("#deleteEducationModal"+this.state.education_id).modal('show');
	},
	deleteEducation(){
		var id = this.state.education_id;
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
				$(".delete_"+this.state.education_id).parent('div').remove();
				$('.nav-md').css("padding-right","0");
				$(".modal-backdrop").removeClass('modal-backdrop');
				$(".modal-open").removeClass('modal-open');
            }.bind(this)
        });
    },
    render: function render(){
		return React.createElement(
		  'div',
		  { className: 'col-md-4 col-sm-4 col-xs-12' },
		  React.createElement(
			'div',
			{ className: 'well profile_view school_info delete_'+this.state.education_id },
			React.createElement(
		        'ul',
		        { className: 'nav navbar-right panel_toolbox edit_delete' },
		        React.createElement(
		          'li',
		          null,
		          React.createElement(
		            'a',
		            { role: 'button', 'data-tooltip': 'Edit Education', onClick:this.showEdit },
		            React.createElement('i', { className: 'fa fa-pencil font-large' })
		          )
		        ),
		        React.createElement(
		          'li',
		          null,
		          React.createElement(
		            'a',
		            { role: 'button', 'data-tooltip': 'Delete Education', onClick: this.confirmDelete },
		            React.createElement('i', { className: 'fa fa-trash font-large' })
		          )
		       	)
		    ),
			React.createElement(
			  'h4',
			  { className: 'brief' },
			  React.createElement('img', { src: this.state.school_pic, alt: 'School Image', className: 'center-margin img-responsive school_image' })
			),
			React.createElement(
			  'div',
			  { className: 'title_center col-xs-12 margin_top' },
			  React.createElement(
				'h2',
				{ className:"font-18" },
				this.state.school_name
			  ),
			  React.createElement(
				'p',
				{ className:"no_margin_bottom margin_top" },
				React.createElement(
				  'strong',
				  null,
				  this.state.degree_name
				)
			  ),
			  React.createElement(
				'ul',
				{ className: 'list-unstyled' },
				React.createElement(
				  'li',
				  null,
				   this.state.schoolStart+" - "+this.state.schoolEnd
				),
				React.createElement(
				  'li',
				  null,
				  this.state.attainment
			     ),
				 React.createElement(
					 "div",
					 {id: "deleteEducationModal"+this.state.education_id, className: "mood modal fade", role: "dialog", "aria-hidden": true},
					 React.createElement(
						 "div",
						 {className: "modal-dialog"},
						 React.createElement(
							 "div",
							 {className: "modal-content"},
							 React.createElement(
								 "div",
								 {className: "modal-header"},
								 React.createElement(
									 "button",
									 {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": true}, "×"
								 ),
								 React.createElement(
									 "h3",
									 {className:"left"},
									 "Delete Education"
								 )
							 ),
							 React.createElement(
								 "div",
								 {className: "modal-body"},
								 React.createElement(
										 "div",
										 {className:"container"},
									 React.createElement(
										 "div",
										 {className: "form col-md-12 form-horizontal title_center font-18"},
										 "Are you sure you want to delete this Education?"
									 )
								   )
								 ),
								 React.createElement(
									 "div",
									 {className: "modal-footer"},
									 React.createElement(
										 "div",
										 { className:"x_footer x_modal_foot" },
										 React.createElement(
										   'div',
										   { 'className': 'form-group has-feedback' },
										   React.createElement(
												'a',
												{className:"btn next-arrow-onboard pull-left btn-delete-education", "data-dismiss": "modal", "aria-hidden": true, onClick: this.deleteEducation},
												 React.createElement("strong",{ className:"font-14"}, "Delete")
										  ),
										   React.createElement(
												 'a',
												 {className:"btn prev-btn-onboard pull-right", "data-dismiss": "modal", "aria-hidden": true},
												 React.createElement("strong",{ className:"font-14"}, "Cancel")
										   )
									  )
								 )
							 )
						 )
					 )
				 ),
				 React.createElement(
 				   "div",
 				   {id: "editEducationModal"+this.state.education_id, className: "modal fade", role: "dialog", "aria-hidden": true},
 				   React.createElement(
 					   "form",
 					   {className: "modal-dialog", onSubmit: this.handleSave},
 					   React.createElement(
 						   "div",
 						   {className: "modal-content"},
 						   React.createElement(
 							   "div",
 							   {className: "modal-header"},
 							   React.createElement(
 								   "button",
 								   {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": true}, "×"
 							   ),
 							   React.createElement(
 								   "h3",
 								   {className:"left"},
 								   "Edit Education"
 							   )
 						   ),React.createElement(
 							   "div",
 							   {className: "modal-body"},
 							   React.createElement(
 									   "div",
 									   {className:"container"},
 								   React.createElement(
 									   "div",
 									   {className: "form col-md-12 form-horizontal form-label-left"},
 									   React.createElement(
 										   "div",
 										   {className:"row"},
 										   React.createElement(
 											   "label",
 											   {className:"control-label col-md-4 col-sm-4 col-xs-12 font-14"},
 											   "Name of School"
 										   ),
 										   React.createElement(
 											   "div",
 											   {className:"form_education col-md-8 col-sm-8 col-xs-12"},
 											   React.createElement(
 												 SchoolSelectEducation,
 												 { data: this.state.dataSchools, updateSchool: this.handleEditSchool, school: this.state.school_name}
 											   ),
 											   React.createElement(
 											   'ul',
 											   { className: 'parsley-errors-list'},
 											   React.createElement (
 												   'li',
 												   { className: 'parsley-required'},
 												   this.state.error_schoolid_edu
 											   )
 											 )
 										   )
 									   ),
 									   React.createElement(
 										   "div",
 										   {className:"row"},
 										   React.createElement(
 											   "label",
 											   {className:"control-label col-md-4 col-sm-4 col-xs-12 font-14"},
 											   "Educational Attainment"
 										   ),
 										   React.createElement(
 											   'div',
 											   { id:"gender", className: 'form_education btn-group col-md-8 col-sm-8 col-xs-12', 'data-toggle': 'buttons' },
 											   React.createElement(
 												 'label',
 												 { className: 'btn btn-edu btn-default', 'data-toggle-class': 'btn-primary', 'data-toggle-passive-class': 'btn-default', onClick: this.handleCollege, id:"College"+this.state.education_id },
 												 React.createElement('input', { type:"radio", 'data-parsley-multiple': 'attainment'}),
 												 "College"
 											   ),
 											   React.createElement(
 												 'label',
 												 { className: 'btn btn-edu btn-default', 'data-toggle-class': 'btn-primary', 'data-toggle-passive-class': 'btn-default', onClick: this.handleHighschool, id:"Highschool"+this.state.education_id },
 												 React.createElement('input', { type:"radio", 'data-parsley-multiple': 'attainment'}),
 												 'Highschool'
 											 ),
 											   React.createElement(
 												 'label',
 												 { className: 'btn btn-edu btn-default', 'data-toggle-class': 'btn-primary', 'data-toggle-passive-class': 'btn-default', onClick: this.handleElementary, id:"Elementary"+this.state.education_id },
 												 React.createElement('input', { type:"radio", 'data-parsley-multiple': 'attainment'}),
 												 'Elementary'
 											   )
 										   )
 									   ),React.createElement(
 										 "div",
 										 {className:"row", id:"showDegree"+this.state.education_id},
 										 React.createElement(
 											 "label",
 											 {className:"control-label col-md-4 col-sm-4 col-xs-12 font-14"},
 											 "Course"
 										 ),
 										 React.createElement(
 											 "div",
 											 {className:"form_education col-md-8 col-sm-8 col-xs-12"},
 											 React.createElement(
	 											  DegreeSelectEducation,
	 											  {data: this.state.dataDegrees, updateDegree: this.handleEditDegree, degree: this.state.degree_name}
											  ),
											  React.createElement(
 	   											   'ul',
 	   											   { className: 'parsley-errors-list'},
 	   											   React.createElement (
 	   												   'li',
 	   												   { className: 'parsley-required'},
 	   												   this.state.error_degreeid_edu
 	   											   )
 	   										 )
 										 )
 									 ),
 									   React.createElement(
 										   "div",
 										   {className:"row"},
 										   React.createElement(
 											   "label",
 											   {className:"control-label col-md-4 col-sm-4 col-xs-12 font-14"},
 											   "Year Attended"
 										   ),
 										   React.createElement(
 											   'div',
 											   { className: 'form_education col-md-3 col-sm-3 col-xs-12 form-group has-feedback' },
 											   React.createElement(
												   'input',
												   { defaultValue:"",
												   placeholder:"Start",
												   id:"schoolStart"+this.state.education_id,
												   type: 'year',
												   className: 'date-picker form-control',
												   onChange: this.handleChange.bind(this, 'newschoolStart'),
												   pattern: "[1-9][0-9]*|0",
												   minLength: 4,
												   maxLength: 4,
												   required:"required",
												   defaultValue:this.state.schoolStart  }
											   ),
 											   React.createElement('span', { className: 'fa fa-calendar form-control-feedback' })
 										  ),
 										  React.createElement(
 											  "label",
 											  {className:"to col-md-1 col-sm-1 col-xs-12 control-label font-14"},
 											  "to"
 										  ),
 										  React.createElement(
 											 'div',
 											 { className: 'form_education col-md-3 col-sm-3 col-xs-12 form-group has-feedback' },
 											 React.createElement(
												 'input',
												 { placeholder:"End",
												 id:"schoolEnd"+this.state.education_id,
												 type: 'text',
												 className: 'date-picker form-control',
												 onChange: this.handleChange.bind(this, 'newschoolEnd'),
												 pattern: "[1-9][0-9]*|0",
												 minLength: 4,
												 maxLength: 4,
												 required:"required",
												 defaultValue:this.state.schoolEnd }
											 ),
 											 React.createElement('span', { className: 'fa fa-calendar form-control-feedback' })
 										 )
 									 ),
 									 React.createElement(
 									   'div',
 									   { className: 'error-year-attended'},
 										  React.createElement(
 											'ul',
 											{ className: 'parsley-errors-list error-year-attended-edit col-md-offset-4 col-sm-8 col-xs-12'},
 											React.createElement (
 												'li',
 												{ className: 'parsley-required'},
 												this.state.error_schoolend
 											)
 										)
 									 )
 								   )
 								 )
 							   ),
 							   React.createElement(
 								   "div",
 								   {className: "modal-footer"},
 								   React.createElement(
 									   "div",
 									   { className:"x_footer x_modal_foot" },
 									   React.createElement(
 										 'div',
 										 { 'className': 'form-group has-feedback' },
 										 React.createElement(
 											  'button',
 											  {type:"submit", className:"btn next-arrow-onboard pull-right btn-edit-education"},
 											   React.createElement("strong",{ className:"font-14"}, "Save Changes")
 										),
 										 React.createElement(
 											   'a',
 											   {className:"btn prev-btn-onboard pull-left", "data-dismiss": "modal", "aria-hidden": true},
 											   React.createElement("strong",{ className:"font-14"}, "Cancel")
 										 )
 									)
 							   )
 						   )
 					   )
 				   )
 			    )
			  )
			)
		  )
	  );
    }
});

var Education_list = React.createClass({
    displayName: "Education_list",
    render: function render() {
        var educationOpt = function educationOpt(result) {
            return React.createElement(Educations,
                {key: result.id,
                data: result
            });
        };
        return React.createElement(
            "div",
            null,
			this.props.dataEducation.map(educationOpt)
        );
    }
});

var Educations = React.createClass({
    displayName: "Educations",
    getInitialState: function(){
		var school_pic = "/dist/img/avatar-default-school.png";
		var degree_name = "";

		if(this.props.data.degree != null){
			degree_name = this.props.data.degree.name;
		}

		if(this.props.data.school.image != null) {
			school_pic = "/img/profilepics/"+this.props.data.school.image;
		}

		return{
			education_id: this.props.data.id,
			school_pic: school_pic,
			school_name: this.props.data.school.name,
			degree_name: degree_name,
			schoolStart: this.props.data.edu_start,
			schoolEnd: this.props.data.edu_end,
			attainment: this.props.data.educational_attainment,
			newschool_name: this.props.data.school.name,
			newdegree_name: degree_name,
			newschoolStart: this.props.data.edu_start,
			newschoolEnd: this.props.data.edu_end,
			newattainment: this.props.data.educational_attainment,
			dataDegrees: [],
			dataSchools: [],
			error_schoolid_edu: "",
			error_degreeid_edu: "",
			error_attainment: "",
			error_schoolstart: "",
			error_schoolend: "",
		};
    },
	handleEditDegree(e){
		this.setState({
			newdegree_name: e
		});
	},
	handleEditSchool(e){
		this.setState({
			newschool_name: e
		});
	},
	handleChange(field, e){
        var state = {};
        state[field] = e.target.value;
        this.setState(state);
    },
	handleCollege(e){
		$('#showDegree'+this.state.education_id).slideDown('fast');
		this.setState({
			newattainment: "College"
		});
	},
	handleHighschool(e){
		$('#showDegree'+this.state.education_id).slideUp('fast');
		this.setState({
			newattainment: "Highschool",
		});
	},
	handleElementary(e){
		$('#showDegree'+this.state.education_id).slideUp('fast');
		this.setState({
			newattainment: "Elementary",
		});
	},
	showEdit(e){
		e.preventDefault();
		this.checkAttainment(this.state.attainment);
		$.ajax({
			type: "GET",
			url: "/api/v1/degrees",
			success: function(resultDegrees){
				this.setState({
					dataDegrees: resultDegrees
				});
			}.bind(this),
			error: function(){
				window.location.reload();
			}
		});

		$.ajax({
			type: "GET",
			url: "/api/v1/schools",
			success: function(resultSchools){
				this.setState({
					dataSchools: resultSchools
				});
			}.bind(this),
			error: function(){
				window.location.reload();
			}
		});

		$("#editEducationModal"+this.state.education_id).modal('show');
	},
	checkAttainment(attainment){
		if(attainment == "College"){
			$("#"+attainment+this.state.education_id).addClass('active');
			$("#Highschool"+this.state.education_id).removeClass('active');
			$("#Elementary"+this.state.education_id).removeClass('active');
		}
		if(attainment == "Highschool"){
			$("#"+attainment+this.state.education_id).addClass('active');
			$("#College"+this.state.education_id).removeClass('active');
			$("#Elementary"+this.state.education_id).removeClass('active');
			$('#showDegree'+this.state.education_id).slideUp('fast');
		}
		if(attainment == "Elementary"){
			$("#"+attainment+this.state.education_id).addClass('active');
			$("#Highschool"+this.state.education_id).removeClass('active');
			$("#College"+this.state.education_id).removeClass('active');
			$('#showDegree'+this.state.education_id).slideUp('fast');
		}
	},
	handleSave(e) {
		e.preventDefault();
		var id = this.state.education_id;
		var saveData = new FormData();

		if(this.state.newattainment == "Highschool" || this.state.newattainment == "Elementary"){
			saveData.append('degree_id', "");
		}else{
			saveData.append('degree_id', this.state.newdegree_name);
		}

		saveData.append('edu_start', this.state.newschoolStart);
		saveData.append('edu_end', this.state.newschoolEnd);
		saveData.append('educational_attainment', this.state.newattainment);
		saveData.append('school_id', this.state.newschool_name);

		// console.log(this.state.newdegree_name);
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
				   var eduEndMessage = errors['edu_end'];
				   var attainmentMessage = errors['educational_attainment'];

				   console.log(errors);

				   this.setState({
					   error_schoolid_edu: schoolIdMessage,
                       error_degreeid_edu: degreeIdMessage,
                       error_schoolstart: eduStartMessage,
					   error_schoolend: eduEndMessage,
					   error_attainment: attainmentMessage,
					   submitted: false,
				   });

				   if("edu_start" in errors || "edu_end" in errors) {
					   $('#schoolStart'+this.state.education_id).addClass('parsley-error').focus();
					   $('#schoolEnd'+this.state.education_id).addClass('parsley-error');
				   } else {
					   $('#schoolStart'+this.state.education_id).removeClass('parsley-error');
					   $('#schoolEnd'+this.state.education_id).removeClass('parsley-error');
				   }
			    }
				$(".btn-edit-education").html('<b>Save Changes</b>');

			}.bind(this),
			beforeSend: function(){
				$(".btn-edit-education").html('<b>Saving </b><i class="fa fa-circle-o-notch fa-spin"></i>');
			},
			success: function(data) {
				$(".btn-edit-education").html('<b>Save Changes</b>');
				if(data.degree == null){
					this.setState({
						school_name: data.school,
						degree_name: "",
						schoolStart: data.edu_start,
						schoolEnd: data.edu_end,
						attainment: data.educational_attainment
					})
				}
				else{
					this.setState({
						school_name: data.school,
						degree_name: data.degree.name,
						schoolStart: data.edu_start,
						schoolEnd: data.edu_end,
						attainment: data.educational_attainment
					})
				}
				$("#editEducationModal"+this.state.education_id).fadeOut('fast').modal('hide');
			}.bind(this)
		});
	},
	confirmDelete(e) {
		e.preventDefault();
		$("#deleteEducationModal"+this.state.education_id).modal('show');
	},
	deleteEducation(){
		var id = this.state.education_id;
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
				$(".delete_"+this.state.education_id).parent('div').remove();
				$('.nav-md').css("padding-right","0");
				$(".modal-backdrop").removeClass('modal-backdrop');
				$(".modal-open").removeClass('modal-open');
            }.bind(this)
        });
    },
    render: function render() {
        return React.createElement(
		  'div',
		  { className: 'col-md-4 col-sm-4 col-xs-12' },
		  React.createElement(
			'div',
			{ className: 'well profile_view school_info delete_'+this.state.education_id },
			React.createElement(
		        'ul',
		        { className: 'nav navbar-right panel_toolbox edit_delete' },
		        React.createElement(
		          'li',
		          null,
		          React.createElement(
		            'a',
		            { role: 'button', 'data-tooltip': 'Edit Education', onClick: this.showEdit },
		            React.createElement('i', { className: 'fa fa-pencil font-large' })
		          )
		        ),
		        React.createElement(
		          'li',
		          null,
		          React.createElement(
		            'a',
		            { role: 'button', 'data-tooltip': 'Delete Education', onClick: this.confirmDelete },
		            React.createElement('i', { className: 'fa fa-trash font-large' })
		          )
		       	)
		    ),
			React.createElement(
			  'h4',
			  { className: 'brief' },
			  React.createElement('img', { src: this.state.school_pic, alt: 'School Image', className: 'center-margin img-responsive school_image' })
			),
			React.createElement(
			  'div',
			  { className: 'title_center col-xs-12 margin_top' },
			  React.createElement(
				'h2',
				{ className:"font-18" },
				this.state.school_name
			  ),
			  React.createElement(
				'p',
				{ className:"no_margin_bottom margin_top" },
				React.createElement(
				  'strong',
				  null,
				  this.state.degree_name
				)
			  ),
			  React.createElement(
				'ul',
				{ className: 'list-unstyled' },
				React.createElement(
				  'li',
				  null,
				  this.state.schoolStart+" - "+this.state.schoolEnd
				),
				React.createElement(
				  'li',
				  null,
				  this.state.attainment
			    ),
				React.createElement(
				   "div",
				   {id: "deleteEducationModal"+this.state.education_id, className: "modal fade", role: "dialog", "aria-hidden": true},
				   React.createElement(
					   "div",
					   {className: "modal-dialog"},
					   React.createElement(
						   "div",
						   {className: "modal-content"},
						   React.createElement(
							   "div",
							   {className: "modal-header"},
							   React.createElement(
								   "button",
								   {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": true}, "×"
							   ),
							   React.createElement(
								   "h3",
								   {className:"left"},
								   "Delete Education"
							   )
						   ),
						   React.createElement(
							   "div",
							   {className: "modal-body"},
							   React.createElement(
									   "div",
									   {className:"container"},
								   React.createElement(
									   "div",
									   {className: "form col-md-12 form-horizontal title_center font-18"},
									   "Are you sure you want to delete this Education?"
								   )
								 )
							   ),
							   React.createElement(
								   "div",
								   {className: "modal-footer"},
								   React.createElement(
									   "div",
									   { className:"x_footer x_modal_foot" },
									   React.createElement(
										 'div',
										 { 'className': 'form-group has-feedback' },
										 React.createElement(
											  'a',
											  {className:"btn next-arrow-onboard pull-left btn-delete-education", "data-dismiss": "modal", "aria-hidden": true, onClick: this.deleteEducation},
											   React.createElement("strong",{ className:"font-14"}, "Delete")
										),
										 React.createElement(
											   'a',
											   {className:"btn prev-btn-onboard pull-right", "data-dismiss": "modal", "aria-hidden": true},
											   React.createElement("strong",{ className:"font-14"}, "Cancel")
										 )
									)
							   )
						   )
					   )
				   )
			    ),
				React.createElement(
				   "div",
				   {id: "editEducationModal"+this.state.education_id, className: "modal fade", role: "dialog", "aria-hidden": true},
				   React.createElement(
					   "form",
					   {className: "modal-dialog", onSubmit: this.handleSave},
					   React.createElement(
						   "div",
						   {className: "modal-content"},
						   React.createElement(
							   "div",
							   {className: "modal-header"},
							   React.createElement(
								   "button",
								   {type: "button", className: "close", "data-dismiss": "modal", "aria-hidden": true}, "×"
							   ),
							   React.createElement(
								   "h3",
								   {className:"left"},
								   "Edit Education"
							   )
						   ),React.createElement(
							   "div",
							   {className: "modal-body"},
							   React.createElement(
									   "div",
									   {className:"container"},
								   React.createElement(
									   "div",
									   {className: "form col-md-12 form-horizontal form-label-left"},
									   React.createElement(
										   "div",
										   {className:"row"},
										   React.createElement(
											   "label",
											   {className:"control-label col-md-4 col-sm-4 col-xs-12 font-14"},
											   "Name of School"
										   ),
										   React.createElement(
											   "div",
											   {className:"form_education col-md-8 col-sm-8 col-xs-12"},
											   React.createElement(
												 SchoolSelectEducation,
												 { data: this.state.dataSchools, updateSchool: this.handleEditSchool, school: this.state.school_name}
											 ),
											 React.createElement(
											   'ul',
											   { className: 'parsley-errors-list'},
											   React.createElement (
												   'li',
												   { className: 'parsley-required'},
												   this.state.error_schoolid_edu
											   )
											 )
										   )
									   ),
									   React.createElement(
										   "div",
										   {className:"row"},
										   React.createElement(
											   "label",
											   {className:"control-label col-md-4 col-sm-4 col-xs-12 font-14"},
											   "Educational Attainment"
										   ),
										   React.createElement(
											   'div',
											   { id:"gender", className: 'form_education btn-group col-md-8 col-sm-8 col-xs-12', 'data-toggle': 'buttons' },
											   React.createElement(
												 'label',
												 { className: 'btn btn-edu btn-default', 'data-toggle-class': 'btn-primary', 'data-toggle-passive-class': 'btn-default', onClick: this.handleCollege, id:"College"+this.state.education_id },
												 React.createElement('input', { type:"radio", 'data-parsley-multiple': 'attainment'}),
												 "College"
											   ),
											   React.createElement(
												 'label',
												 { className: 'btn btn-edu btn-default', 'data-toggle-class': 'btn-primary', 'data-toggle-passive-class': 'btn-default', onClick: this.handleHighschool, id:"Highschool"+this.state.education_id },
												 React.createElement('input', { type:"radio", 'data-parsley-multiple': 'attainment'}),
												 'Highschool'
											 ),
											   React.createElement(
												 'label',
												 { className: 'btn btn-edu btn-default', 'data-toggle-class': 'btn-primary', 'data-toggle-passive-class': 'btn-default', onClick: this.handleElementary, id:"Elementary"+this.state.education_id },
												 React.createElement('input', { type:"radio", 'data-parsley-multiple': 'attainment'}),
												 'Elementary'
											   )
										   )
									   ),React.createElement(
										 "div",
										 {className:"row", id:"showDegree"+this.state.education_id},
										 React.createElement(
											 "label",
											 {className:"control-label col-md-4 col-sm-4 col-xs-12 font-14"},
											 "Course"
										 ),
										 React.createElement(
											 "div",
											 {className:"form_education col-md-8 col-sm-8 col-xs-12"},
											 React.createElement(
											  DegreeSelectEducation,
											  {data: this.state.dataDegrees, updateDegree: this.handleEditDegree, degree: this.state.degree_name}
										  	),
											React.createElement(
												 'ul',
												 { className: 'parsley-errors-list'},
												 React.createElement (
													 'li',
													 { className: 'parsley-required'},
													 this.state.error_degreeid_edu
												 )
											 )
										 )
									 ),
									   React.createElement(
										   "div",
										   {className:"row"},
										   React.createElement(
											   "label",
											   {className:"control-label col-md-4 col-sm-4 col-xs-12 font-14"},
											   "Year Attended"
										   ),
										   React.createElement(
											   'div',
											   { className: 'form_education col-md-3 col-sm-3 col-xs-12 form-group has-feedback' },
											   React.createElement('input', { defaultValue:"", placeholder:"Start", id:"schoolStart"+this.state.education_id, type: 'year', className: 'date-picker form-control', onChange: this.handleChange.bind(this, 'newschoolStart'), pattern: "[1-9][0-9]*|0", minLength: 4, maxLength: 4, required:"required", defaultValue:this.state.schoolStart  }),
											   React.createElement('span', { className: 'fa fa-calendar form-control-feedback' })
										  ),
										  React.createElement(
											  "label",
											  {className:"to col-md-1 col-sm-1 col-xs-12 control-label font-14"},
											  "to"
										  ),
										  React.createElement(
											 'div',
											 { className: 'form_education col-md-3 col-sm-3 col-xs-12 form-group has-feedback' },
											 React.createElement('input', { placeholder:"End", id:"schoolEnd"+this.state.education_id, type: 'text', className: 'date-picker form-control', onChange: this.handleChange.bind(this, 'newschoolEnd'), pattern: "[1-9][0-9]*|0", minLength: 4, maxLength: 4, required:"required", defaultValue:this.state.schoolEnd }),
											 React.createElement('span', { className: 'fa fa-calendar form-control-feedback' })
										 )
									 ),
									 React.createElement(
									   'div',
									   { className: 'error-year-attended'},
										  React.createElement(
											'ul',
											{ className: 'parsley-errors-list error-year-attended-edit col-md-offset-4 col-sm-8 col-xs-12'},
											React.createElement (
												'li',
												{ className: 'parsley-required'},
												this.state.error_schoolend
											)
										)
									 )
								   )
								 )
							   ),
							   React.createElement(
								   "div",
								   {className: "modal-footer"},
								   React.createElement(
									   "div",
									   { className:"x_footer x_modal_foot" },
									   React.createElement(
										 'div',
										 { 'className': 'form-group has-feedback' },
										 React.createElement(
											  'button',
											  {type:"submit", className:"btn next-arrow-onboard pull-right btn-edit-education"},
											   React.createElement("strong",{ className:"font-14"}, "Save Changes")
										),
										 React.createElement(
											   'a',
											   {className:"btn prev-btn-onboard pull-left", "data-dismiss": "modal", "aria-hidden": true},
											   React.createElement("strong",{ className:"font-14"}, "Cancel")
										 )
									)
							   )
						   )
					   )
				   )
			    )
			  )
		  	)
		 )
	  );
    }
});

var SchoolSelect = React.createClass({
    displayName: "SchoolSelect",
    getInitialState: function(){
        return {
            schoolid: this.props.schoolid
        };
    },
	componentDidMount: function(){
		$("#school").select2({
		  placeholder: "Enter your School",
		  tags: true
		});

        $('#school').on("change", this.handleChange);
	},
	handleChange(e) {
		this.setState({
			schoolid : e.target.value
		})
		this.props.updateSchool(e.target.value);
	},
    render: function render() {
        var schoolOpt = function schoolOpt(result) {
            return React.createElement(SchoolOptions,
                {key: result.id,
                data: result
            });
        };
        return	React.createElement(
			  "select",
              {
              className:"select2_single form-control",
			  id:"school",
			  style: {width: '288px'}
              },
			  React.createElement(
				 "option",
				 {value: ""}
			  ),
              this.props.data.map(schoolOpt)
		);
    }
});

var SchoolOptions = React.createClass({
    displayName: "SchoolOptions",

    render: function render() {
        return React.createElement(
            "option",
            {
               value: this.props.data.name
            },
            this.props.data.name
        )
    }
});

var DegreeSelect = React.createClass({
    displayName: "DegreeSelect",
    getInitialState: function(){
        return {
            degreeid: this.props.degreeid
        };
    },
	componentDidMount: function(){
		$("#degree").select2({
		  placeholder: "Enter your Course",
		  tags:true
		});

		$('#degree').on("change", this.handleChange);
	},
	handleChange(e) {
		this.setState({
			degreeid : e.target.value
		})

		this.props.updateDegree(e.target.value);
	},
    render: function render() {
        var degreeOpt = function degreeOpt(result) {
            return React.createElement(DegreeOptions,
                {key: result.id,
                data: result
            });
        };
        return	React.createElement(
			  "select",
              {
              className:"select2_single form-control",
			  id:"degree",
			  style: {width: '288px'}
              },
			  React.createElement(
				 "option",
				 {value: ""}
			  ),
              this.props.data.map(degreeOpt)
		);
    }
});

var DegreeOptions = React.createClass({
    displayName: "DegreeOptions",

    render: function render() {
        return React.createElement(
            "option",
            {
               value: this.props.data.name
            },
            this.props.data.name
        )
    }
});

var SchoolSelectProf = React.createClass({
    displayName: "SchoolSelectProf",
    getInitialState: function(){
        return {
            schoolid: this.props.schoolid
        };
    },
	componentDidMount: function(){
		$("#school").select2({
		  placeholder: "Enter your School",
		  tags: true
		});

        $('#school').on("change", this.handleChange);
	},
	handleChange(e) {
		this.setState({
			schoolid : e.target.value
		})
		this.props.updateSchool(e.target.value);
	},
    render: function render() {
        var schoolOpt = function schoolOpt(result) {
            return React.createElement(SchoolOptions,
                {key: result.id,
                data: result
            });
        };
        return	React.createElement(
			  "select",
              {
              className:"select2_single form-control",
			  id:"school",
			  style: {width: '100%'}
              },
			  React.createElement(
				 "option",
				 {value: ""}
			  ),
              this.props.data.map(schoolOpt)
		);
    }
});

var DegreeSelectProf = React.createClass({
    displayName: "DegreeSelectProf",
    getInitialState: function(){
        return {
            degreeid: this.props.degreeid
        };
    },
	componentDidMount: function(){
		$("#degree").select2({
		  placeholder: "Enter your Course",
		  tags:true
		});

		$('#degree').on("change", this.handleChange);
	},
	handleChange(e) {
		this.setState({
			degreeid : e.target.value
		})

		this.props.updateDegree(e.target.value);
	},
    render: function render() {
        var degreeOpt = function degreeOpt(result) {
            return React.createElement(DegreeOptions,
                {key: result.id,
                data: result
            });
        };
        return	React.createElement(
			  "select",
              {
              className:"select2_single form-control",
			  id:"degree",
			  style: {width: '100%'}
              },
			  React.createElement(
				 "option",
				 {value: ""}
			  ),
              this.props.data.map(degreeOpt)
		);
    }
});

var DegreeSelectEducation = React.createClass({
    displayName: "DegreeSelectEducation",
    getInitialState: function(){
        return {
            degree: this.props.degree
        };
    },
	componentDidMount: function(){
		$(".degree").select2({
		  placeholder:"Enter your course",
		  tags:true
	    });

		$('.degree').on("change", this.handleChange);
	},
	handleChange(e) {
		this.setState({
			degreeid : e.target.value
		})

		this.props.updateDegree(e.target.value);
	},
    render: function render() {
		var degree = this.state.degree;
        var degreeOpt = function degreeOpt(result) {
            return React.createElement(DegreeOptionsEducation,
                {key: result.id,
                data: result
            });
        };
		if(degree == "undefined" || degree == null){
			degree == "";
		}
		return	React.createElement(
			  "select",
			  {
			  className:"select2_single form-control degree",
			  style: {width: '288px'}
			  },
			  React.createElement(
				  "option",
				  {value: degree},
				  degree
			  ),
			  this.props.data.map(degreeOpt)
		);
    }
});

var DegreeOptionsEducation = React.createClass({
    displayName: "DegreeOptionsEducation",

    render: function render() {
        return React.createElement(
            "option",
            {
               value: this.props.data.name
            },
            this.props.data.name
        )
    }
});

var SchoolSelectEducation = React.createClass({
    displayName: "SchoolSelectEducation",
    getInitialState: function(){
        return {
            school: this.props.school
        };
    },
	componentDidMount: function(){
		$(".school").select2({
		  placeholder: "Enter your school",
		  tags: true
		});

        $('.school').on("change", this.handleChange);
	},
	handleChange(e) {
		this.setState({
			schoolid : e.target.value
		})
		this.props.updateSchool(e.target.value);
	},
    render: function render() {
		var school = this.state.school;
        var schoolOpt = function schoolOpt(result) {
            return React.createElement(SchoolOptionsEducation,
                {key: result.id,
                data: result
            });
        };
		if(school == "undefined" || school == null){
			school == "";
		}
        return	React.createElement(
			  "select",
              {
              className:"select2_single form-control school",
			  tabIndex:"-1",
			  style: {width: '288px'}
              },
			  React.createElement(
				 "option",
				 { value: school},
				 school
			  ),
              this.props.data.map(schoolOpt)
		);
    }
});

var SchoolOptionsEducation = React.createClass({
    displayName: "SchoolOptionsEducation",

    render: function render() {
        return React.createElement(
            "option",
            {
               value: this.props.data.name
            },
            this.props.data.name
        )
    }
});

ReactDOM.render(React.createElement(
   "div",
   null,
   React.createElement(StudentSteps, null)),
   document.getElementById('student-steps')
);
