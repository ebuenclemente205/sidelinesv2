<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStudentRecommendationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('student_recommendations', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email_to');
            $table->string('message')->nullable();
            $table->smallInteger('character_rating')->nullable();
            $table->smallInteger('skill_rating')->nullable();
            $table->smallInteger('status')->default(0);
            $table->string('recommendation_code')->nullable();
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
        Schema::drop('student_recommendations');
    }
}
