<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use sidelines\User;
use sidelines\School;

class MoveAllImageToSchools extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       $users = User::where('user_type', 'sa')->get();

        Schema::table('schools', function (Blueprint $table) {
            $table->string('image')->nullable()->after('name');
        });

        foreach($users as $user)
        {
            $school = School::find($user->userable_id);

            $school->image = $user->image;
            $school->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('schools', function (Blueprint $table) {
            $table->dropColumn('image');
        });
    }
}
