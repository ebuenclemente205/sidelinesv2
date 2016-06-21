<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use sidelines\Student;
use sidelines\UserAchievement;

class CreateUserAchievementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $students  = Student::all();

       Schema::create('user_achievements', function (Blueprint $table) {
            $table->increments('id');
            $table->string('achieve_title')->nullable();
            $table->date('achieve_date')->nullable();
            $table->string('achieve_image')->nullable();
            $table->text('achieve_description')->nullable();
            $table->integer('student_id')->unsigned()->nullable();
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->timestamps();
       });

       foreach($students as $student)
       {
           $user_achievements = UserAchievement::create([
               'achieve_description' => $student->achievements,
           ]);

           $student->user_achievements()->save($user_achievements);
       }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('user_achievements');
    }
}
