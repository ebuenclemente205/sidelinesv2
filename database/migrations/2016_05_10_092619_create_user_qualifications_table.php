<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use sidelines\Student;
use sidelines\UserQualification;

class CreateUserQualificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $students  = Student::all();

        Schema::create('user_qualifications', function (Blueprint $table) {
            $table->increments('id');
            $table->text('qual_description')->nullable();
            $table->integer('student_id')->unsigned()->nullable();
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->timestamps();
        });

        foreach($students as $student)
        {
            $user_qualifications = UserQualification::create([
                'qual_description' => $student->about_me,
            ]);

            $student->user_qualifications()->save($user_qualifications);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('user_qualifications');
    }
}
