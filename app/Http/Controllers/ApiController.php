<?php

namespace sidelines\Http\Controllers;

use Illuminate\Http\Request;

use sidelines\Http\Requests;
use sidelines\Http\Requests\StudentStepOneRequest;
use sidelines\Http\Requests\StudentStepTwoRequest;
use sidelines\Http\Requests\StudentEditProfileRequest;
use sidelines\Http\Requests\StudentOverviewRequest;
use sidelines\Http\Requests\StudentWorkRequest;
use sidelines\Http\Requests\StudentExperienceRequest;
use sidelines\Http\Requests\StudentAchievementRequest;
use sidelines\Http\Requests\StudentSeminarRequest;
use sidelines\Http\Requests\StudentOrganizationRequest;
use sidelines\Http\Controllers\Controller;

use sidelines\Student;
use sidelines\User;
use sidelines\School;
use sidelines\Skill;
use sidelines\Degree;
use sidelines\DeanFaculty;
use sidelines\UserWork;
use sidelines\UserSeminar;
use sidelines\UserQualification;
use sidelines\UserOrganization;
use sidelines\UserObjective;
use sidelines\UserExperience;
use sidelines\UserEducation;
use sidelines\UserAchievement;
use sidelines\StudentRecommendation;

class ApiController extends Controller
{
    /*
        STUDENT API
    */
    // api/v1/students
    public function getAllStudents()
    {
        $students = Student::all();

        return response()->json($students, 200);
    }

    // api/v1/students/{id}
    public function getStudentById($id)
    {
        $user = User::find($id);
        $student = Student::with('user', 'school', 'degree')->find($user->userable_id);

        return response()->json($student, 200);
    }

    // POST = api/v1/students/{id}
    public function updateByStudentId(StudentEditProfileRequest $request, $id)
    {
        $user = User::find($id);
        $student = Student::with('user', 'school', 'degree')->find($user->userable_id);

        /*image save*/
        if($request->file('file'))
        {
            $file = $request->file('file');
            $filename  = time() . rand(1, 9999) . '.' . $file->getClientOriginalExtension();

            if(!empty($student->user->image) || $user->image != null)
            {
                \File::delete(public_path('img/profilepics/' . $student->user->image));
            }

            $request->file('file')->move(
                base_path() . '/public/img/profilepics', $filename //pass to file field
            );

            $student->user->update([
                'image' => $filename,
            ]);
        }

        /*===================== more save ===================*/
        /*save student*/

        $student->fname = $request['fname'];
        $student->lname = $request['lname'];
        $student->contact_no = $request['contact_no'];
        $student->save();

        /*save school*/
        $school = School::firstOrCreate(['name' => $request['school_id']]);
        $school->students()->save($student);

        /*save degree*/
        $degree = Degree::firstOrCreate(['name' => $request['degree_id']]);
        $degree->students()->save($student);

        return response()->json($student, 200);
    }

    /* API  = api/v1/register/student/{id}/details */
    public function getStudentOnBoardingProfile($id)
    {
        $user = User::find($id);
        $student = Student::with('school', 'degree')->find($user->userable_id);

        return response()->json([
            'user' => $user,
            'student' => $student,
        ], 200);
    }

    /* API POST  = api/v1/register/student/{id}/details */
    public function postStudentOnBoardingProfile(StudentStepOneRequest $request, $id)
    {
        $user = User::find($id);

        /*image save*/
        if($request->file('file'))
        {
            $file = $request->file('file');
            $filename  = time() . rand(1, 9999) . '.' . $file->getClientOriginalExtension();

            if(!empty($user->image) || $user->image != null)
            {
                \File::delete(public_path('img/profilepics/' . $user->image));
            }

            $request->file('file')->move(
                base_path() . '/public/img/profilepics', $filename //pass to file field
            );

            //getClientSize();

            $user->update([
                'image' => $filename,
            ]);
        }

        if( ! $user->user_type )
        {
            //save all student details
            $student = new Student();
            $student->fname         =  $request['fname'];
            $student->lname         =  $request['lname'];
            $student->date_of_birth =  $request['date_of_birth'];
            $student->gender        =  $request['gender'];
            $student->yr_lvl        =  $request['yr_lvl'];
            $student->contact_no    =  $request['contact_no'];

            $student->save();

            /*save school*/
                $school = School::firstOrCreate(['name' => $request['school_id']]);
                $school->students()->save($student);

            /*save degree*/
                $degree = Degree::firstOrCreate(['name' => $request['degree_id']]);
                $degree->students()->save($student);

            /*save user*/
            $user->user_type = 's';
            $user->registration_status = '1';
            $student->user()->save($user);
        }
        else
        {
            $student = Student::find($user->userable_id);

            /*save school*/
                $school = School::firstOrCreate(['name' => $request['school_id']]);
                $school->students()->save($student);

            /*save degree*/
                $degree = Degree::firstOrCreate(['name' => $request['degree_id']]);
                $degree->students()->save($student);

            $student->update($request->all());
        }

        return response()->json([
            'user' => $user,
            'student' => $student,
            'school' => $school,
            'school_image' => $school->image,
            'degree' => $degree,
        ], 200);
    } //end postStudentOnBoardingProfile

    public function getStudentVerification($id)
    {
        $user = User::find($id);

        return response()->json($user, 200);
    }

    public function postStudentResendVerification(Request $request, $id)
    {
        $user = User::find($id);

        $new_confirmation_code = str_random(30);
        $user->confirmation_code = $new_confirmation_code;
        $user->save();

        return response()->json(['message' => 'New confirmation code has been sent.']);
    }

    /*
        Student Recommendation API
    */
    // post = /api/v1/recommendation/{id}/{recommendation_code}
    public function postStudentRecommendation(Request $request, $id, $code)
    {
        $user = User::find($id);
        $student = Student::with('student_recommendations')->find($user->userable_id);

        $student_recommendation = StudentRecommendation::where('student_id', $user->userable_id)->whereRecommendationCode($code)->first();

        if( ! $student_recommendation)
        {
            return response()->json(['error' => 'no user and token found.'], 200);
        }

        $student_recommendation->character_rating = $request['character_rating'];
        $student_recommendation->skill_rating = $request['skill_rating'];
        $student_recommendation->status = '1';
        $student_recommendation->recommendation_code = null;
        $student_recommendation->save();

        return response()->json($student_recommendation, 200);
    }

    /*
        SCHOOLS API
    */
    // api/v1/schools
    public function getAllSchools()
    {
        $schools = School::all();

        return response()->json($schools, 200);
    }

    // api/v1/schools/name
    public function getAllSchoolNames()
    {
        $schools = School::lists('name', 'id');

        return response()->json($schools, 200);
    }

    /*
        DEGREE API
    */
    // api/v1/degrees
    public function getAllDegrees()
    {
        $degress = Degree::all();

        return response()->json($degress, 200);
    }

    // api/v1/degrees/name
    public function getAllSchoolDegree()
    {
        $degree = Degree::lists('name', 'id');

        return response()->json($degree, 200);
    }


    /*
        Education API
    */
    // api/v1/educations/student/{id}
    public function getStudentEducations($id)
    {
        $user = User::find($id);
        $user_education = UserEducation::with('school', 'degree')->where('student_id', $user->userable_id)->get();

        return response()->json($user_education, 200);
    }

    // api/v1/educations/student/{id}
    public function postStudentEducation(StudentStepTwoRequest $request, $id)
    {
        $user = User::find($id);

        $educations = UserEducation::where('student_id', $user->userable_id)->get();
        $total_user_education = count($educations);

        if($total_user_education < 10)
        {
            $student = Student::find($user->userable_id);

            $school = School::firstOrCreate(['name' => $request['school_id']]);

            $education = new UserEducation();
            $education->edu_start              = $request['edu_start'];
            $education->edu_end                = $request['edu_end'];
            $education->educational_attainment = $request['educational_attainment'];

            $education->save();
            $degree = null;

            if($request['educational_attainment'] == 'College')
            {
                $degree = Degree::firstOrCreate(['name' => $request['degree_id']]);
                $degree->educations()->save($education);
            }

            $school->educations()->save($education);
            $student->user_educations()->save($education);

            return response()->json([
                'school' => $school,
                'degree' => $degree,
                'education' => $education,
                'school_image' => $school->image,
                //'student_education' => $student,
            ], 200);
        }
        else
        {
            return response()->json([
                'error_message' => 'Educatitional background may not be greater than 9'
            ], 200);
        }
    }

    // API POST Route = api/v1/educations/student/{id}/edit
    public function updateStudentEducationById(StudentStepTwoRequest $request, $id)
    {
        $degree = '';

        $education = UserEducation::find($id);

        $education->edu_start = $request['edu_start'];
        $education->edu_end = $request['edu_end'];
        $education->educational_attainment = $request['educational_attainment'];

        if($request['educational_attainment'] == 'College')
        {
            $degree = Degree::firstOrCreate(['name' => $request['degree_id']]);
            $education->degree_id = $degree->id;
        }
        else
        {
            $education->degree_id = null;
        }

        $school = School::firstOrCreate(['name' => $request['school_id']]);
        $education->school_id = $school->id;
        $education->save();

        return response()->json([
            'edu_start' => $education->edu_start,
            'edu_end' => $education->edu_end,
            'educational_attainment' => $education->educational_attainment,
            'school' => $education->school->name,
            'degree' => $education->degree
        ], 200);
    }

    // api/v1/educations/delete/{id}
    public function destroyStudentEducationById($id)
    {
        UserEducation::destroy($id);

        return response()->json($id, 200);
    }

    // api/v1/educations/student/next/{id}
    public function postNextStudentEducation(Request $request, $id)
    {
        $user = User::find($id);
        $student = Student::find($user->userable_id);

        if($user->registration_status == 1)
        {
            $user_education_ctr = count($student->user_educations);

            if($user_education_ctr < 1)
            {
                return response()->json([
                    'error_message' => 'Educational background should have at least 1 item',
                    'edu_count' => $user_education_ctr
                ], 200);
            }
            elseif($user_education_ctr > 0 && $user_education_ctr < 9)
            {
                $user->registration_status = $request['step']; //$request['step'];
                $user->save();

                return response()->json($user, 200);
            }
        }
        elseif($user->registration_status == 2)
        {
            $user_skills_ctr = count($student->skills);

            if($user_skills_ctr <= 0)
            {
                return response()->json([
                    'error_message' => 'Skills should have at least 1 item',
                    'skill_count' => $user_skills_ctr
                ], 200);
            }
            elseif($user_skills_ctr < 50 && $user_skills_ctr > 0)
            {
                $user->registration_status = $request['step']; //$request['step'];
                $user->save();

                $student->profile_strength = 40;
                $student->save();

                return \Redirect::route('users.show', $student->id);
            }
        }
        elseif($user->registration_status == 3){
            $user->registration_status = $request['step']; //$request['step'];
            $user->save();
            return response()->json($user->registration_status, 200);
        }
    }

    /*
        Qualification API
    */
    // api/v1/qualifications/student
    public function getAllQualifications()
    {
        $qualifications = UserQualification::all();

        return response()->json($qualifications, 200);
    }

    // api/v1/qualifications/student/{id}
    public function  getStudentQualificationsById($id)
    {
        $user = User::find($id);
        $student = Student::with('user_qualifications')->find($user->userable_id);

        return response()->json($student->user_qualifications, 200);
    }

    // post = api/v1/qualifications/student/create/{id}
    public function createStudentQualificationsById(StudentOverviewRequest $request, $id)
    {
        $user = User::find($id);
        $student = Student::find($user->userable_id);

        $user_qualification = new UserQualification();
        $user_qualification->qual_description = $request['qual_description'];
        $student->user_qualifications()->save($user_qualification);

        return response()->json($user_qualification, 200);
    }

    // post = api/v1/qualifications/student/{id}
    public function updateStudentQualificationsById(StudentOverviewRequest $request, $id)
    {
        $user_qualification = UserQualification::find($id);

        $user_qualification->qual_description = $request['qual_description'];
        $user_qualification->save();

        return response()->json($user_qualification, 200);
    }

    // api/v1/qualifications/delete/{id}
    public function destroyQualificationByStudentId($id)
    {
        UserQualification::destroy($id);

        return response()->json([
            'successfully' => 'successfully deleted',
        ], 200);
    }

    /*
        Skills API
    */
    // API Route = api/v1/skills/
    public function getAllSkills()
    {
        $skills = Skill::all();

        return response()->json($skills, 200);
    }

    // API Route = api/v1/skills/{name}
    public function getAllSkillsByName($name)
    {
        $skill = Skill::with('students')->where('name', $name)->first();
        $student_skills = $skill->students;

        return response()->json($student_skills, 200);
    }

    // API Route = api/v1/skills/student/{id}
    public function getAllSkillsByStudentId($id)
    {
        $user = User::find($id);
        $student = Student::find($user->userable_id);

        return response()->json($student->skills, 200);
    }

    // API Post Route = api/v1/skills/student/create/{id}
    public function createSkillsByStudentId(Request $request, $id)
    {
        $user = User::find($id);
        $student = Student::find($user->userable_id);

        $skills = array();
        // find a skill based on their name and if it doesn't exist create it in the Database
        // store all ids in the skills array , existing skills or new created skills

        $skill = Skill::firstOrCreate(array('name' => $request['new_skill']));
        $skills[] = $skill->id;

        $student->skills()->sync($skills, false);

        return response()->json($skill, 200);
    }

    // API Route = api/v1/skills/student/delete/{id}
    public function destroySkillsByStudentId(Request $request, $id)
    {
        $user = User::find($id);
        $student = Student::find($user->userable_id);

        $student->skills()->detach($request['skill']);

        return response()->json($request['skill'], 200);
    }

    /*
        Works API
    */
    // api/v1/works/student/
    public function getAllStudentWorks()
    {
        $user_works = UserWork::all();

        return response()->json($user_works, 200);
    }

    // api/v1/works/student/{id}
    public function getStudentWorksById($id)
    {
        $user = User::find($id);
        $student = Student::with('user_works')->find($user->userable_id);


        return response()->json($student->user_works, 200);
    }

    // api/v1/works/student/create/{id}
    public function createStudentWorksById(StudentWorkRequest $request,$id)
    {
        $user = User::find($id);
        $student = Student::find($user->userable_id);
        $student_work_ctr = UserWork::where('student_id', $id)->get();

        if(count($student_work_ctr) < 20)
        {
            $user_work = new UserWork();

            if($request->file('file'))
            {
                $file = $request->file('file');
                $filename  = time() . rand(1, 9999) . '.' . $file->getClientOriginalExtension();

                if(!empty($user_work->work_image) || $user_work->work_image != null)
                {
                    \File::delete(public_path('img/works/' . $user_work->work_image));
                }

                $request->file('file')->move(
                    base_path() . '/public/img/works', $filename //pass to file field
                );

                $user_work->work_image = $filename;
            }

            $work_end = date("Y-m-d", strtotime($request['work_end']));
            $work_start = date("Y-m-d", strtotime($request['work_start']));

            $user_work->work_title       = $request['work_title'];
            $user_work->work_position    = $request['work_position'];
            $user_work->work_start       = $work_start;
            $user_work->work_end         = $work_end;
            $user_work->work_url         = $request['work_url'];
            $user_work->work_description = $request['work_description'];
            $user_work->save();
            $student->user_works()->save($user_work);

            return response()->json($user_work, 200);
        }
        else
        {
            return response()->json([
                'error_message' => 'Maximum user works reached',
            ], 200);
        }
    }

    // post = api/v1/works/student/{id}
    public function updateWorksByStudentId(StudentWorkRequest $request, $id)
    {
        $user_work = UserWork::find($id); // user work id

        if($request->file('file'))
        {
            $file = $request->file('file');
            $filename  = time() . rand(1, 9999) . '.' . $file->getClientOriginalExtension();

            if(!empty($user_work->work_image) || $user_work->work_image != null)
            {
                \File::delete(public_path('img/works/' . $user_work->work_image));
            }

            $request->file('file')->move(
                base_path() . '/public/img/works', $filename //pass to file field
            );

            $user_work->work_image = $filename;
        }

        $work_end = date("Y-m-d", strtotime($request['work_end']));
        $work_start = date("Y-m-d", strtotime($request['work_start']));

        $user_work->work_title       = $request['work_title'];
        $user_work->work_position    = $request['work_position'];
        $user_work->work_start       = $work_start;
        $user_work->work_end         = $work_end;
        $user_work->work_url         = $request['work_url'];
        $user_work->work_description = $request['work_description'];
        $user_work->save();

        return response()->json($user_work, 200);
    }

    // api/v1/works/delete/{id}
    public function destroyWorksByStudentId($id)
    {
        UserWork::destroy($id);

        return response()->json(['message' => 'Works successfully deleted.'], 200);
    }

    /*
        Experiences API
    */
    // api/v1/experiences/student
    public function getAllStudentExperiences()
    {
        $user_experiences = UserExperience::all();

        return response()->json($user_experiences, 200);
    }

    // api/v1/experiences/student/{id}
    public function getStudentExperiencesById($id)
    {
        $user = User::find($id);
        $student = Student::with('user_experiences')->find($user->userable_id);

        return response()->json($student->user_experiences, 200);
    }

    // api/v1/experiences/student/create/{id}
        public function createStudentExperiencesById(StudentExperienceRequest $request, $id)
    {
        $user = User::find($id);
        $student = Student::with('user_experiences')->find($user->userable_id);
        $student_experience_ctr = count($student->user_experiences);

        if($student_experience_ctr < 10)
        {
            $exp_end = date("Y-m-d", strtotime($request['exp_end']));
            $exp_start = date("Y-m-d", strtotime($request['exp_start']));

            $user_experience = new UserExperience();
            $user_experience->exp_title = $request['exp_title'];
            $user_experience->exp_name_of_company = $request['exp_name_of_company'];
            $user_experience->exp_location = $request['exp_location'];
            $user_experience->exp_start = $exp_start;
            $user_experience->exp_end = $exp_end;
            $user_experience->exp_description = $request['exp_description'];
            $user_experience->save();
            $student->user_experiences()->save($user_experience);

            return response()->json($user_experience, 200);
        }
        else
        {
            return response()->json(['error_message' => 'Maximum experiences reached'], 200);
        }
    }

    // Post = api/v1/experiences/student/{id}
    public function updateStudentExperiencesById(StudentExperienceRequest $request, $id)
    {
        $user_experience = UserExperience::find($id);

        $exp_end = date("Y-m-d", strtotime($request['exp_end']));
        $exp_start = date("Y-m-d", strtotime($request['exp_start']));

        $user_experience->exp_title = $request['exp_title'];
        $user_experience->exp_name_of_company = $request['exp_name_of_company'];
        $user_experience->exp_location = $request['exp_location'];
        $user_experience->exp_start = $exp_start;
        $user_experience->exp_end = $exp_end;
        $user_experience->exp_description = $request['exp_description'];
        $user_experience->save();

        return response()->json($user_experience, 200);
    }

    // api/v1/experiences/delete/{id}
    public function destroyExperienceByStudentId($id)
    {
        UserExperience::destroy($id);

        return response()->json(['message' => 'Successfully deleted']);
    }

    /*
        Achievements API
    */
    // api/v1/achievements/student
    public function getAllStudentAchievements()
    {
        $user_achievements = UserAchievement::all();

        return response()->json($user_achievements, 200);
    }

    // api/v1/achievements/student/{id}
    public function getStudentAchievementsById($id)
    {
        $user = User::find($id);
        $student = Student::with('user_achievements')->find($user->userable_id);

        return response()->json($student->user_achievements, 200);
    }

    // post = api/v1/achievements/student/{id}
    public function updateAchievementsByStudentId(StudentAchievementRequest $request, $id)
    {
        $user_achievement = UserAchievement::find($id);

        if($request->file('file'))
        {
            $file = $request->file('file');
            $filename  = "img/achievements/achv_" . time() . rand(1, 9999) . '.' . $file->getClientOriginalExtension();

            if(!empty($user_achievement->achieve_image) || $user_achievement->achieve_image != null)
            {
                \File::delete(public_path('img/achievements/' . $user_achievement->achieve_image));
            }

            $request->file('file')->move(
                base_path() . '/public/img/achievements', $filename //pass to file field
            );

            $user_achievement->achieve_image = $filename;
        }

        $user_achievement->achieve_title = $request['achieve_title'];
        $user_achievement->achieve_date = $request['achieve_date'];
        $user_achievement->achieve_description = $request['achieve_description'];
        $user_achievement->save();

        return response()->json($user_achievement, 200);
    }

    // post = api/v1/achievements/student/create/{id}
    public function createAchievementsByStudentId(StudentAchievementRequest $request, $id)
    {
        $user = User::find($id);
        $student = Student::with('user_achievements')->find($user->userable_id);
        $student_achieve_ctr = count($student->user_achievements);

        if($student_achieve_ctr < 10)
        {
            $user_achievement = new UserAchievement();

            if($request->file('file'))
            {
                $file = $request->file('file');
                $filename  = "img/achievements/achv_" . time() . rand(1, 9999) . '.' . $file->getClientOriginalExtension();

                if(!empty($user_achievement->achieve_image) || $user_achievement->achieve_image != null)
                {
                    \File::delete(public_path('img/achievements/' . $user_achievement->achieve_image));
                }

                $request->file('file')->move(
                    base_path() . '/public/img/achievements', $filename //pass to file field
                );

                $user_achievement->achieve_image = $filename;
            }

            $user_achievement->achieve_title = $request['achieve_title'];
            $user_achievement->achieve_date = $request['achieve_date'];
            $user_achievement->achieve_description = $request['achieve_description'];
            $user_achievement->save();
            $student->user_achievements()->save($user_achievement);

            return response()->json($user_achievement, 200);
        }
        else
        {
            return response()->json(['error_message' => 'Maximum achievements reached.'], 200);
        }
    }

    // delete = api/v1/achievements/delete/{id}
    public function destroyAchievementsByStudentId($id)
    {
        UserAchievement::destroy($id);

        return response()->json(['message' => 'Successfully deleted'], 200);
    }

    /*
        Seminars API
    */
    // api/v1/seminars/student
    public function getAllStudentSeminars()
    {
        $user_seminars = UserSeminar::all();

        return response()->json($user_seminars, 200);
    }

    // api/v1/seminars/student/{id}
    public function getStudentSeminarsById($id)
    {
        $user = User::find($id);
        $student = Student::with('user_seminars')->find($user->userable_id);

        return response()->json($student->user_seminars, 200);
    }

    // post = api/v1/seminars/student/{id}
    public function updateSeminarByStudentId(StudentSeminarRequest $request, $id)
    {
        $user_seminar = UserSeminar::find($id);

        if($request->file('file'))
        {
            $file = $request->file('file');
            $filename  = "img/seminars/sem_" . time() . rand(1, 9999) . '.' . $file->getClientOriginalExtension();

            if(!empty($user_seminar->seminar_image) || $user_seminar->seminar_image != null)
            {
                \File::delete(public_path('img/seminars/' . $user_seminar->seminar_image));
            }

            $request->file('file')->move(
                base_path() . '/public/img/seminars', $filename //pass to file field
            );

            $user_seminar->seminar_image = $filename;
        }

        $user_seminar->seminar_title = $request['seminar_title'];
        $user_seminar->seminar_place = $request['seminar_place'];
        $user_seminar->seminar_date = $request['seminar_date'];
        $user_seminar->save();

        return response()->json($user_seminar, 200);
    }

    // post = api/v1/seminars/student/create/{id}
    public function createSeminarByStudentId(StudentSeminarRequest $request, $id)
    {
        $user = User::find($id);
        $student = Student::with('user_seminars')->find($user->userable_id);
        $student_seminars_ctr = count($student->user_seminars);

        if($student_seminars_ctr < 10)
        {
            $user_seminar = new UserSeminar();

            if($request->file('file'))
            {
                $file = $request->file('file');
                $filename  = "img/seminars/sem_" . time() . rand(1, 9999) . '.' . $file->getClientOriginalExtension();

                if(!empty($user_seminar->seminar_image) || $user_seminar->seminar_image != null)
                {
                    \File::delete(public_path('img/seminars/' . $user_seminar->seminar_image));
                }

                $request->file('file')->move(
                    base_path() . '/public/img/seminars', $filename //pass to file field
                );

                $user_seminar->seminar_image = $filename;
            }

            $user_seminar->seminar_title = $request['seminar_title'];
            $user_seminar->seminar_place = $request['seminar_place'];
            $user_seminar->seminar_date = $request['seminar_date'];
            $user_seminar->save();
            $student->user_seminars()->save($user_seminar);

            return response()->json($user_seminar, 200);
        }
        else
        {
            return response()->json(['error_message' => 'Maximum of 10 seminars only.'], 200);
        }
    }

    // delete = api/v1/seminar/delete/{id}
    public function destroySeminarByStudentId(Request $request, $id)
    {
        UserSeminar::destroy($id);

        return response()->json(['message' => 'Successfully deleted'], 200);
    }

    /*
        Organizations API
    */
    // api/v1/organizations/student
    public function getAllStudentOrganizations()
    {
        $usr_organizations = UserOrganization::all();

        return response()->json($usr_organizations, 200);
    }

    // api/v1/organizations/student/{id}
    public function getStudentOrganizationsById($id)
    {
        $user = User::find($id);
        $student = Student::with('user_organizations')->find($user->userable_id);

        return response()->json($student->user_organizations, 200);
    }

    // post = api/v1/organizations/student/{id}
    public function updateOrganizationByStudentId(StudentOrganizationRequest $request, $id)
    {
        $user_organization = UserOrganization::find($id);

        $user_organization->org_name = $request['org_name'];
        $user_organization->org_position = $request['org_position'];
        $user_organization->org_start = $request['org_start'];
        $user_organization->org_end = $request['org_end'];
        $user_organization->save();

        return response()->json($user_organization, 200);
    }

    // post = api/v1/organizations/student/create/{id}
    public function createOrganizationByStudentId(StudentOrganizationRequest $request, $id)
    {
        $user = User::find($id);
        $student = Student::with('user_organizations')->find($user->userable_id);
        $student_org_ctr = count($student->user_organizations);

        if($student_org_ctr < 10)
        {
            $user_organization = new UserOrganization();
            $user_organization->org_name = $request['org_name'];
            $user_organization->org_position = $request['org_position'];
            $user_organization->org_start = $request['org_start'];
            $user_organization->org_end = $request['org_end'];
            $user_organization->save();
            $student->user_organizations()->save($user_organization);

            return response()->json($user_organization, 200);
        }
        else
        {
            return response()->json(['error_message' => 'Maximum of 10 organizations only.'], 200);
        }
    }

    // delete = api/v1/organizations/delete/{id}
    public function destroyOrganizationByStudentId(Request $request, $id)
    {
        UserOrganization::destroy($id);

        return response()->json(['message' => 'Successfully deleted'], 200);
    }

    /*
        Recommendation API
    */
    // api/v1/recommendations/{id} -> recommendation id
    public function getRecommendationById($id)
    {
        $recommendation = \DB::table('recommendations')->where('id', $id)->get();

        $faculty = DeanFaculty::find($recommendation[0]->dean_faculty_id);
        $student = $faculty->recommendations()->where('student_id', $recommendation[0]->student_id)->first();

        return response()->json($student, 200);
    }

    // api/v1/recommendations/student/{id} -> student id
    public function getRecommendationsOfStudent($id)
    {
        $user = User::find($id);
        $student_recommendations = StudentRecommendation::where('status', 1)->get();

        return response()->json($student_recommendations, 200);
    }

    // api/v1/recommendations/type/student
    public function getAllRecommendationsTypeStudent()
    {
        $faculty_recommendation = \Auth::user()->userable->recommendations;

        return response()->json($faculty_recommendation, 200);
    }

    // api/v1/recommendations/type/deanfaculty
    public function getAllRecommendationsTypeDeanFaculty()
    {
        $students = \Auth::user()->userable->recommendations;

        return response()->json($students, 200);
    }

    // api/v1/recommendations/type/schooladmin
    public function getAllRecommendationsTypeSchoolAdmin()
    {
        $students = \DB::table('students')
                        ->join('recommendations', 'recommendations.student_id', '=', 'students.id')
                        ->join('degrees', 'degrees.id', '=', 'students.degree_id')
                        ->join('users', 'users.userable_id', '=', 'students.id')
                        ->select('users.id as user_id', 'students.id', 'students.lname', 'students.fname', 'students.yr_lvl', 'degrees.name as degree', \DB::raw('count(recommendations.student_id) as recommendations'))
                        ->where('users.user_type', '=', 's')
                        ->where('students.school_id', '=', \Auth::user()->userable->id)
                        ->groupBy('recommendations.student_id')
                        ->get();

        return response()->json($students, 200);
    }

    public function getAllRecommendationsTypeCompany()
    {
        $students = \DB::table('students')
                        ->join('recommendations', 'recommendations.student_id', '=', 'students.id')
                        ->join('degrees', 'degrees.id', '=', 'students.degree_id')
                        ->join('users', 'users.userable_id', '=', 'students.id')
                        ->select('users.id as user_id', 'students.id', 'students.lname', 'students.fname', 'students.yr_lvl', 'degrees.name as degree', \DB::raw('count(recommendations.student_id) as recommendations'))
                        ->where('users.user_type', '=', 's')
                        ->groupBy('recommendations.student_id')
                        ->get();

        return response()->json($students, 200);
    }

    /*
        Recommendation API
    */
    // api/v1/recommendations/student/create/{id}
    public function createStudentRecommendation(Request $request, $id)
    {
        $user = User::find($id);
        $student = Student::with('student_recommendations')->find($user->userable_id);

        if(count($student->student_recommendations) <= 10)
        {
            $recommendation_code = str_random(50);

            $student_recommendation = new StudentRecommendation();
            $student_recommendation->email_to = $request['email_to'];
            $student_recommendation->recommendation_code = $recommendation_code;
            $student_recommendation->save();
            $student->student_recommendations()->save($student_recommendation);

            \Mail::send('email.recommend', ['user' => $user, 'student' => $student, 'recommendation_code' => $recommendation_code], function($message) use ($student_recommendation) {
                $message->subject('Recommendation');
                $message->from(\Auth::user()->email);
                $message->to($student_recommendation->email_to);
            });

            return response()->json([
                'student_recommendation' => $student_recommendation,
                'message' => 'successfully sent',
            ], 200);
        }
        else
        {
            return response()->json(['error_message' => 'Maximum of 10 organizations only.'], 200);
        }
    }
}
