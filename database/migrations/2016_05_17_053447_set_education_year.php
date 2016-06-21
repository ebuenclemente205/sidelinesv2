<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SetEducationYear extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_educations', function (Blueprint $table) {
            $table->integer('edu_start')->change();
            $table->integer('edu_end')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_educations', function (Blueprint $table) {
            $table->date('edu_start')->change();
            $table->date('edu_end')->change();
        });
    }
}
