<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use sidelines\Student;
use sidelines\UserWork;

class CreateUserWorksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $students  = Student::all();

        Schema::create('user_works', function (Blueprint $table) {
            $table->increments('id');
            $table->string('work_title')->nullable();
            $table->string('work_position')->nullable();
            $table->date('work_start')->nullable();
            $table->date('work_end')->nullable();
            $table->string('work_url')->nullable();
            $table->string('work_image')->nullable();
            $table->integer('student_id')->unsigned()->nullable();
            $table->text('work_description')->nullable();
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->timestamps();
        });

        foreach($students as $student)
        {
            $user_work = UserWork::create([
                'work_description' => $student->sample_works,
            ]);

            $student->user_works()->save($user_work);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('user_works');
    }
}
