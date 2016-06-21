<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->increments('id');
            $table->string('lname');
            $table->string('mname')->nullable();
            $table->string('fname');
            $table->char('gender', 1);
            $table->date('date_of_birth');
            $table->string('address');
            $table->tinyInteger('yr_lvl');
            $table->string('contact_no');
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
        Schema::drop('students');
    }
}
