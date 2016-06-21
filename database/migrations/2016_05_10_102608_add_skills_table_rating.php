<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSkillsTableRating extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('skill_student', function (Blueprint $table) {
            $table->integer('self_assesment')->after('skill_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('skill_student', function (Blueprint $table) {
            $table->dropColumn('self_assesment');
        });
    }
}
