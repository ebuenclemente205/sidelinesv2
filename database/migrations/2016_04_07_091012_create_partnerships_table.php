<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePartnershipsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('partnerships', function (Blueprint $table) {
            $table->integer('company_id')->unsigned()->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            $table->integer('school_id')->unsigned()->nullable();
            $table->foreign('school_id')->references('id')->on('schools')->onDelete('cascade');
            $table->tinyInteger('status')->default(0);
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
        Schema::drop('partnerships');
    }
}
