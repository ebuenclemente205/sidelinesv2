<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserEducationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_educations', function (Blueprint $table) {
            $table->increments('id');        
            $table->string('field_of_study')->nullable();
            $table->date('edu_start')->nullable();
            $table->date('edu_end')->nullable();
            $table->string('educational_attainment')->nullable();
            $table->integer('degree_id')->unsigned()->nullable();
            $table->foreign('degree_id')->references('id')->on('degrees')->onDelete('cascade');
            $table->integer('school_id')->unsigned()->nullable();
            $table->foreign('school_id')->references('id')->on('schools')->onDelete('cascade');
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
        Schema::drop('user_educations');
    }
}
