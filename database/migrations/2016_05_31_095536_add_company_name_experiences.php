<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCompanyNameExperiences extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_experiences', function (Blueprint $table) {
            $table->string('exp_name_of_company')->after('exp_title');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_experiences', function (Blueprint $table) {
            $table->dropColumn('exp_name_of_company');
        });
    }
}
