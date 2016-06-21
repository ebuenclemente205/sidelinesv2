<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SetOrganizationYear extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_organizations', function (Blueprint $table) {
            $table->integer('org_start')->change();
            $table->integer('org_end')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_organizations', function (Blueprint $table) {
            $table->date('org_start')->change();
            $table->date('org_end')->change();
        });
    }
}
