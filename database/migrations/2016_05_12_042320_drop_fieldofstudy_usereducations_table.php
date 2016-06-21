<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropFieldofstudyUsereducationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_educations', function (Blueprint $table) {
            $table->dropColumn('field_of_study');
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
            $table->integer('field_of_study')->after('id');
        });
    }
}
