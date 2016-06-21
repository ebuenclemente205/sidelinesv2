<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSkillStudentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('skill_student', function (Blueprint $table) {
            $table->integer('student_id')->unsigned()->nullable();
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->integer('skill_id')->unsigned()->nullable();
            $table->foreign('skill_id')->references('id')->on('skills')->onDelete('cascade');
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
        Schema::drop('skill_student');
    }
}
