<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDeanFacultiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dean_faculties', function (Blueprint $table) {
            $table->increments('id');
            $table->string('lname');
            $table->string('mname')->nullable();
            $table->string('fname');
            $table->char('gender', 1);
            $table->date('date_of_birth');
            $table->string('address');
            $table->string('contact_no');
            $table->integer('school_id')->unsigned()->nullable();
            $table->foreign('school_id')->references('id')->on('schools');
            $table->text('about_me')->nullable();
            $table->text('education')->nullable();
            $table->text('achievements')->nullable();
            $table->text('seminars')->nullable();
            $table->text('organizations')->nullable();
            $table->tinyInteger('status')->default(1);
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
        Schema::drop('dean_faculties');
    }
}
