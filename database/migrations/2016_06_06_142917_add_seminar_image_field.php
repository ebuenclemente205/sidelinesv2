<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSeminarImageField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_seminars', function (Blueprint $table) {
            $table->string('seminar_image')->after('seminar_title');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_seminars', function (Blueprint $table) {
            $table->dropColumn('seminar_image');
        });
    }
}
