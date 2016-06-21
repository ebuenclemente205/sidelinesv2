<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddExperienceColumnFaculties extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dean_faculties', function (Blueprint $table) {
            $table->text('experience')->after('about_me')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('dean_faculties', function (Blueprint $table) {
            $table->dropColumn('experience');
        });
    }
}
