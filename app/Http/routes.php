<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// Index
//Route::get('/landing', 'PagesController@landingPage');
Route::get('/', 'PagesController@index');
Route::get('/recommendation', 'PagesController@userRecommend');
//Route::get('/choose', 'PagesController@userChoose');
//Route::get('/studentSteps', 'PagesController@userSteps');
//Route::get('/signup', 'PagesController@signUp');

Route::get('signup', 'Auth\AuthController@getRegister');
Route::post('register', 'Auth\AuthController@postRegister');
Route::get('login', 'Auth\AuthController@getLogin');
Route::post('login', 'Auth\AuthController@postLogin');
Route::get('logout', 'Auth\AuthController@getLogout');
Route::get('/{id}', ['as' => 'users.show', 'uses' => 'UserController@show']);
Route::get('/{id}/verify', 'UserController@getEmailVerification');
Route::post('/{id}/verify', 'UserController@postResendEmailVerification');
Route::get('/{id}/pickuser', ['as' => 'users.pickuser', 'uses' => 'UserController@getTypeOnBoarding']);
Route::get('/{id}/pickuser/student', ['as' => 'users.pickstudent', 'uses' => 'UserController@getStudentOnBoarding']);
Route::get('/recommendation/{id}/{recommendation_code}', 'StudentRecommendationController@getStudentRecommendation');

/*unused routes*/
Route::get('/{id}/pickuser/company', ['as' => 'users.pickcompany', 'uses' => 'UserController@getOnBoardingType']);
Route::get('/{id}/pickuser/faculty', ['as' => 'users.pickfaculty', 'uses' => 'UserController@getOnBoardingType']);

/*================== API START ==================*/
/*Verification API*/
Route::get('api/v1/{id}/verify', 'ApiController@getStudentVerification');
Route::post('api/v1/{id}/verify', 'ApiController@postStudentResendVerification');

/* Student API */
Route::get('register/verify/{id}/{confirmation_code}', 'Auth\AuthController@confirm');
Route::get('api/v1/register/student/{id}/details', 'ApiController@getStudentOnBoardingProfile');
Route::post('api/v1/register/student/{id}/details', 'ApiController@postStudentOnBoardingProfile');

/* Student Recommendation API */
Route::post('/api/v1/recommendation/{id}/{recommendation_code}', 'ApiController@postStudentRecommendation');

/* School API */
Route::get('api/v1/schools', 'ApiController@getAllSchools');
Route::get('api/v1/schools/name', 'ApiController@getAllSchoolNames');

/* Degree API */
Route::get('api/v1/degrees', 'ApiController@getAllDegrees');
Route::get('api/v1/degrees/name', 'ApiController@getAllSchoolDegree');

/* Education Api */
Route::get('api/v1/educations/student/{id}', 'ApiController@getStudentEducations');
Route::post('api/v1/educations/student/{id}', 'ApiController@postStudentEducation');
Route::post('api/v1/educations/student/{id}/edit', 'ApiController@updateStudentEducationById');
Route::delete('api/v1/educations/delete/{id}', 'ApiController@destroyStudentEducationById');
Route::post('api/v1/educations/student/next/{id}', 'ApiController@postNextStudentEducation');

/* Qualification API */
Route::get('api/v1/qualifications/student', 'ApiController@getAllQualifications');
Route::get('api/v1/qualifications/student/{id}', 'ApiController@getStudentQualificationsById');
Route::post('api/v1/qualifications/student/{id}', 'ApiController@updateStudentQualificationsById');
Route::post('api/v1/qualifications/student/create/{id}', 'ApiController@createStudentQualificationsById');
Route::delete('api/v1/qualifications/delete/{id}', 'ApiController@destroyQualificationByStudentId');

/*Skills API*/
Route::get('api/v1/skills/', 'ApiController@getAllSkills');
// Route::get('api/v1/skills/{name}', 'ApiController@getAllSkillsByName');
Route::post('api/v1/skills/student/create/{id}', 'ApiController@createSkillsByStudentId');
Route::get('api/v1/skills/student/{id}', 'ApiController@getAllSkillsByStudentId');
// Route::post('api/v1/skills/student/{id}', 'ApiController@updateSkillsByStudentId');
Route::delete('api/v1/skills/student/delete/{id}', 'ApiController@destroySkillsByStudentId');

/*Works API*/
Route::get('api/v1/works/student', 'ApiController@getAllStudentWorks');
Route::get('api/v1/works/student/{id}', 'ApiController@getStudentWorksById');
Route::post('api/v1/works/student/{id}', 'ApiController@updateWorksByStudentId');
Route::post('api/v1/works/student/create/{id}', 'ApiController@createStudentWorksById');
Route::delete('api/v1/works/delete/{id}', 'ApiController@destroyWorksByStudentId');

/*Experiences API*/
Route::get('api/v1/experiences/student', 'ApiController@getAllStudentExperiences');
Route::get('api/v1/experiences/student/{id}', 'ApiController@getStudentExperiencesById');
Route::post('api/v1/experiences/student/{id}', 'ApiController@updateStudentExperiencesById');
Route::post('api/v1/experiences/student/create/{id}', 'ApiController@createStudentExperiencesById');
Route::delete('api/v1/experiences/delete/{id}', 'ApiController@destroyExperienceByStudentId');

/*Achievements API*/
Route::get('api/v1/achievements/student', 'ApiController@getAllStudentAchievements');
Route::get('api/v1/achievements/student/{id}', 'ApiController@getStudentAchievementsById');
Route::post('api/v1/achievements/student/{id}', 'ApiController@updateAchievementsByStudentId');
Route::post('api/v1/achievements/student/create/{id}', 'ApiController@createAchievementsByStudentId');
Route::delete('api/v1/achievements/delete/{id}', 'ApiController@destroyAchievementsByStudentId');

/*Seminars API*/
Route::get('api/v1/seminars/student', 'ApiController@getAllStudentSeminars');
Route::get('api/v1/seminars/student/{id}', 'ApiController@getStudentSeminarsById');
Route::post('api/v1/seminars/student/{id}', 'ApiController@updateSeminarByStudentId');
Route::post('api/v1/seminars/student/create/{id}', 'ApiController@createSeminarByStudentId');
Route::delete('api/v1/seminars/delete/{id}', 'ApiController@destroySeminarByStudentId');

/*Organizations API*/
Route::get('api/v1/organizations/student', 'ApiController@getAllStudentOrganizations');
Route::get('api/v1/organizations/student/{id}', 'ApiController@getStudentOrganizationsById');
Route::post('api/v1/organizations/student/{id}', 'ApiController@updateOrganizationByStudentId');
Route::post('api/v1/organizations/student/create/{id}', 'ApiController@createOrganizationByStudentId');
Route::delete('api/v1/organizations/delete/{id}', 'ApiController@destroyOrganizationByStudentId');

/*unused API*/
Route::get('api/v1/students', 'ApiController@getAllStudents');
Route::get('api/v1/students/{id}', 'ApiController@getStudentById');
Route::post('api/v1/students/{id}', 'ApiController@updateByStudentId');

/*Recommendation API*/
Route::post('api/v1/recommendations/student/create/{id}', 'ApiController@createStudentRecommendation');
Route::get('api/v1/recommendations/student/{id}', 'ApiController@getRecommendationsOfStudent');

Route::get('api/v1/recommendations', 'ApiController@getAllRecommendations');
Route::get('api/v1/recommendations/{id}', 'ApiController@getRecommendationById');
Route::get('api/v1/recommendations/type/company', 'ApiController@getAllRecommendationsTypeCompany');
Route::get('api/v1/recommendations/type/student', 'ApiController@getAllRecommendationsTypeStudent');
Route::get('api/v1/recommendations/type/deanfaculty', 'ApiController@getAllRecommendationsTypeDeanFaculty');
Route::get('api/v1/recommendations/type/schooladmin', 'ApiController@getAllRecommendationsTypeSchoolAdmin');

/*================== API END ==================*/


// Route::post('/', ['as' => 'search.index', 'uses' => 'SearchController@index']);
//
// /****START API****/
//
// /*Student API*/
// Route::get('api/v1/students', 'ApiController@getAllStudents');
// Route::get('api/v1/students/{id}', 'ApiController@getStudentById');
// Route::post('api/v1/students/{id}', 'ApiController@updateByStudentId');
// Route::get('api/v1/students/desc', 'ApiController@getAllStudentsBySchool');
//
// /*Works API*/
// Route::get('api/v1/works/student/{id}', 'ApiController@getStudentWorks');
// Route::post('api/v1/works/student/{id}', 'ApiController@updateWorksByStudentId');
// Route::post('api/v1/works/student/create/{id}', 'ApiController@createWorksByStudentId');
// Route::delete('api/v1/works/delete/{id}', 'ApiController@destroyWorksByStudentId');
//
// /*QualificationS API*/
// Route::get('api/v1/qualifications/student/{id}', 'ApiController@getStudentQualifications');
// Route::post('api/v1/qualifications/student/{id}', 'ApiController@updateQualificationByStudentId');
// Route::post('api/v1/qualifications/student/create/{id}', 'ApiController@createQualificationByStudentId');
// Route::delete('api/v1/qualifications/delete/{id}', 'ApiController@destroyQualificationsByStudentId');
//
// /*Seminars APIA*/
// Route::get('api/v1/seminars/student/{id}', 'ApiController@getStudentSeminars');
// Route::post('api/v1/seminars/student/{id}', 'ApiController@updateSeminarByStudentId');
// Route::post('api/v1/seminars/student/create/{id}', 'ApiController@createSeminarByStudentId');
// Route::delete('api/v1/seminars/delete/{id}', 'ApiController@destroySeminarByStudentId');
//
// /*Organizations API*/
// Route::get('api/v1/organizations/student/{id}', 'ApiController@getStudentOrganizations');
// Route::post('api/v1/organizations/student/{id}', 'ApiController@updateOrganizationByStudentId');
// Route::post('api/v1/organizations/student/create/{id}', 'ApiController@createOrganizationByStudentId');
// Route::delete('api/v1/organizations/delete/{id}', 'ApiController@destroyOrganizationByStudentId');
//
// /*Ojbecives API*/
// Route::get('api/v1/objectives/student/{id}', 'ApiController@getStudentObjectives');
// Route::post('api/v1/objectives/student/{id}', 'ApiController@updateObjectiveByStudentId');
// Route::post('api/v1/objectives/student/create/{id}', 'ApiController@createObjectiveByStudentId');
// Route::delete('api/v1/objectives/delete/{id}', 'ApiController@destroyObjectiveByStudentId');
//
// /*ExperienceS API*/
// Route::get('api/v1/experiences/student/{id}', 'ApiController@getStudentExperiences');
// Route::post('api/v1/experiences/student/{id}', 'ApiController@updateExperienceByStudentId');
// Route::post('api/v1/experiences/student/create/{id}', 'ApiController@createExperienceByStudentId');
// Route::delete('api/v1/experiences/delete/{id}', 'ApiController@destroyExperienceByStudentId');
//
// /*Educations API*/
// Route::get('api/v1/educations/student/{id}', 'ApiController@getStudentEducations');
// Route::post('api/v1/educations/student/{id}', 'ApiController@updateEducationByStudentId');
// Route::post('api/v1/educations/student/create/{id}', 'ApiController@createEducationByStudentId');
// Route::delete('api/v1/educations/delete/{id}', 'ApiController@destroyEducationByStudentId');
//
// /*Achievements API*/
// Route::get('api/v1/achievements/student/{id}', 'ApiController@getUserAchievements');
// Route::post('api/v1/achievements/student/{id}', 'ApiController@updateAchievementsByStudentId');
// Route::post('api/v1/achievements/student/create/{id}', 'ApiController@createAchievementsByStudentId');
// Route::delete('api/v1/achievements/delete/{id}', 'ApiController@destroyAchievementsByStudentId');
//

//
// /*Schools API*/
// Route::get('api/v1/schools', 'ApiController@getAllSchools');
// Route::get('api/v1/schools-edit', 'ApiController@getAllSchoolsForEdit');
// /*Courses API*/
// Route::get('api/v1/degrees', 'ApiController@getAllDegrees');
// /*Recommendation API*/
// Route::get('api/v1/recommendations', 'ApiController@getAllRecommendations');
// Route::get('api/v1/recommendations/{id}', 'ApiController@getRecommendationById');
// Route::get('api/v1/recommendations/student/{id}', 'ApiController@getRecommendationsOfStudent');
// Route::get('api/v1/recommendations/type/company', 'ApiController@getAllRecommendationsCompany');
// Route::get('api/v1/recommendations/type/student', 'ApiController@getAllRecommendationsStudent');
// Route::get('api/v1/recommendations/type/deanfaculty', 'ApiController@getAllRecommendationsDeanFaculty');
// Route::get('api/v1/recommendations/type/schooladmin', 'ApiController@getAllRecommendationsSchoolAdmin');
//
// /****END API****/
//
// // PagesController
// // Route::get('company/show', 'PagesController@companyShow');
// // Route::get('dean/show', 'PagesController@deanShow');
// // Route::get('company/edit', 'PagesController@companyEdit');
// // Route::get('students/joblists', 'PagesController@jobLists');
// // Route::get('students/companylists', 'PagesController@companyLists');
// // Route::get('students/schoollists', 'PagesController@SchoolLists');
// // Route::get('schools/show','PagesController@schoolShow');
// // Route::get('schools/edit','PagesController@schoolEdit');
//
// // Authentication
// Route::get('about', 'PagesController@about');
//
// // Route::get('signup', 'Auth\AuthController@getRegister');
// // Route::post('signup', 'Auth\AuthController@registerByUserType');
//
//
// Route::get('signup/student', 'Auth\AuthController@getStudentRegister');
// Route::post('signup/student', 'Auth\AuthController@signUpAsStudent');
// Route::get('signup/company', 'Auth\AuthController@getCompanyRegister');
// Route::post('signup/company', 'Auth\AuthController@signUpAsCompany');
// Route::get('signup/schooladmin', 'Auth\AuthController@getSchoolAdminRegister');
// Route::post('signup/schooladmin', 'Auth\AuthController@signUpAsSchoolAdmin');
// Route::get('signup/faculty', 'Auth\AuthController@getDeanFacultyRegister');
// Route::post('signup/faculty', 'Auth\AuthController@signUpAsDeanFaculty');
//
// Route::get('register/admin', 'Auth\AuthController@registerAsAdmin');
// Route::get('register/verify/{confirmation_code}', 'Auth\AuthController@confirm');
// // Route::get('register', 'Auth\AuthController@getRegister');
// // Route::post('register', 'Auth\AuthController@postRegister');
// // Route::get('login', 'Auth\AuthController@getLogin');
// // Route::post('login', 'Auth\AuthController@postLogin');
// Route::get('logout', 'Auth\AuthController@getLogout');
//
// // Admin Routes
// Route::group(['namespace' => 'Admin', 'middleware' => 'admin'], function() {
//     Route::resource('categories', 'CategoriesController');
//     Route::get('admin/students', 'StudentsController@index');
//     Route::get('admin/submitted-reviews', 'ReviewsController@submittedReviews');
//     Route::get('admin/accepted-reviews', 'ReviewsController@acceptedReviews');
//     Route::post('admin/reviews/accept/{id}', array('as' => 'reviews.accept', 'uses' => 'ReviewsController@acceptReview'));
//     Route::post('admin/reviews/deny/{id}', array('as' => 'reviews.deny', 'uses' => 'ReviewsController@denyReview'));
//     Route::get('admin/schools', 'SchoolsController@index');
//     Route::get('admin/faculties', 'FacultiesController@index');
//     Route::get('admin/companies', 'CompaniesController@index');
//     Route::get('admin/applications', 'ApplicationsController@index');
//     Route::get('admin/pending-applications', 'ApplicationsController@showPendingApplications');
//     Route::get('admin/successful-applications', 'ApplicationsController@showSuccessfulApplications');
//     Route::get('admin/declined-applications', 'ApplicationsController@declinedApplications');
//     Route::get('admin/recommendations', 'RecommendationsController@index');
//     Route::get('admin/jobs', 'JobsController@index');
//     Route::get('admin/active-jobs', 'JobsController@activeJobs');
//     Route::get('admin/expired-jobs', 'JobsController@expiredJobs');
//     Route::post('admin/jobs/retrieve/{id}', array('as' => 'jobs.retrieve', 'uses' => 'JobsController@retrieve'));
//     Route::delete('admin/jobs/destroy/{id}', array('as' => 'jobs.forcedelete', 'uses' => 'JobsController@destroy'));
//     Route::delete('admin/jobs/delete/{id}', array('as' => 'jobs.delete', 'uses' => 'JobsController@setJobAsExpired'));
//     Route::delete('admin/users/delete/{id}', array('as' => 'admin.delete', 'uses' => 'UsersController@destroy'));
//     Route::post('admin/users/retrieve/{id}', array('as' => 'admin.retrieve', 'uses' => 'UsersController@retrieve'));
//     Route::delete('admin/users/force-delete/{id}', array('as' => 'admin.forcedelete', 'uses' => 'UsersController@forceDelete'));
// });
//
// // Payment Routes
// Route::get('payments/status', ['as' => 'payments.status', 'uses' => 'PaymentsController@getPaymentStatus']);
// Route::post('payments/create', ['as' => 'payments.create', 'uses' => 'PaymentsController@postCreate']);
// Route::resource('payments', 'PaymentsController');
//
//
// // NOTE: Resource routes must be at the top of User Routes to avoid being overridden
// // Job Posts Routes
// Route::post('jobs/apply', ['as' => 'jobs.apply', 'uses' => 'JobsController@apply']);
// Route::post('jobs/cancel', ['as' => 'jobs.cancel', 'uses' => 'JobsController@cancelApplication']);
// Route::get('jobs/category/{id}', ['as' => 'jobs.category', 'uses' => 'JobsController@getJobsByCategory']);
// Route::resource('jobs', 'JobsController');
//
// // Faculty Routes
// Route::resource('faculties', 'FacultiesController');
//
// // Student Routes
// Route::get('students/skills/{name}', 'StudentsController@studentsBySkill');
// Route::post('students/review', ['as' => 'students.submit', 'uses' => 'StudentsController@submitForReview']);
// Route::resource('students', 'StudentsController');
//
// // Companies Routes
// Route::post('companies/partner', ['as' => 'companies.partner', 'uses' => 'CompaniesController@requestPartnership']);
// Route::post('companies/accept', ['as' => 'companies.accept', 'uses' => 'CompaniesController@acceptPartnership']);
// Route::post('companies/cancel', ['as' => 'companies.cancel', 'uses' => 'CompaniesController@cancelPartnership']);
// Route::get('companies/{id}/jobs', ['as' => 'companies.posts', 'uses' => 'CompaniesController@getJobsPosted']);
// Route::resource('companies', 'CompaniesController');
//
// // Schools Routes
// Route::post('schools/partner', ['as' => 'schools.partner', 'uses' => 'SchoolsController@requestPartnership']);
// Route::post('schools/accept', ['as' => 'schools.accept', 'uses' => 'SchoolsController@acceptPartnership']);
// Route::post('schools/cancel', ['as' => 'schools.cancel', 'uses' => 'SchoolsController@cancelPartnership']);
// Route::resource('schools', 'SchoolsController');
//
// // Application Routes
// Route::get('/applications', ['as' => 'application.index', 'uses' => 'ApplicationsController@index']);
//
// // Recommendation Routes
// Route::post('recommendations/students', 'RecommendationsController@recommendStudent');
// Route::get('recommendations/students', 'RecommendationsController@getStudents');
// Route::get('recommendations/student/{id}', 'RecommendationsController@viewRecommendationsOfStudent');
// Route::resource('recommendations', 'RecommendationsController');
//
// // Partnership Routes
// Route::resource('partnerships', 'PartnershipsController');
//
// // Notifications
// Route::resource('notifications', 'NotificationsController');
//
// // User Routes
// Route::get('/{id}', ['as' => 'users.show', 'uses' => 'UserController@show']);
// Route::get('/{id}/edit', ['as' => 'users.edit', 'uses' => 'UserController@edit']);
// Route::get('/{id}/print', ['as' => 'users.print', 'uses' => 'UserController@printTemplate1']);
// Route::get('/{id}/print2', ['as' => 'users.print2', 'uses' => 'UserController@printTemplate2']);
// Route::get('/{id}/print3', ['as' => 'users.print3', 'uses' => 'UserController@printTemplate3']);
// Route::put('/{id}', 'UserController@update');
//
// // Route::post('/api/v1/student/{id}', )
//
// // Report Routes
// Route::post('report/partners', ['as' => 'report.partners', 'uses' => 'ReportsController@getPartnerships']);
// Route::post('report/print-jobs', ['as' => 'report.jobs', 'uses' => 'ReportsController@getJobs']);
// Route::post('report/students', ['as' => 'report.students', 'uses' => 'ReportsController@getStudents']);
// Route::post('report/payments', ['as' => 'report.payments', 'uses' => 'ReportsController@getPayments']);
// Route::get('report/partners', 'ReportsController@sortPartnerships');
// Route::get('report/jobs', 'ReportsController@sortJobs');
// Route::get('report/students', 'ReportsController@sortStudents');
// Route::get('report/payments', 'ReportsController@sortPayments');
//
// // Route::get('payments/create', 'PagesController@paymentsCreate');
// //testin login
// // Route::get('login','PagesController@login');
// // Route::get('register','PagesController@register');
// // Route::get('preregister','PagesController@preregister');
// // Route::post('preregister', 'PagesController@userType');
