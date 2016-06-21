<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use sidelines\Student;
use sidelines\UserSeminar;

class CreateUserSeminarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $students  = Student::all();

        Schema::create('user_seminars', function (Blueprint $table) {
            $table->increments('id');
            $table->string('seminar_title')->nullable();
            $table->string('seminar_place')->nullable();
            $table->date('seminar_date')->nullable();
            $table->integer('student_id')->unsigned()->nullable();
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('user_seminars');
    }
}
