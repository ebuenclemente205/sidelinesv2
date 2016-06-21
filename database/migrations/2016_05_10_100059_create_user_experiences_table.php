<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use sidelines\Student;
use sidelines\UserExperience;

class CreateUserExperiencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $students  = Student::all();

        Schema::create('user_experiences', function (Blueprint $table) {
            $table->increments('id');
            $table->string('exp_title')->nullable();
            $table->string('exp_location')->nullable();
            $table->date('exp_start')->nullable();
            $table->date('exp_end')->nullable();
            $table->text('exp_description')->nullable();
            $table->integer('student_id')->unsigned()->nullable();
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->timestamps();
        });

        foreach($students as $student)
        {
            $user_experiences = UserExperience::create([
                'exp_description' => $student->experience,
            ]);

            $student->user_experiences()->save($user_experiences);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('user_experiences');
    }
}
