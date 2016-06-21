<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->increments('id');
            $table->string('payer_id');
            $table->decimal('amount', 7, 2);
            $table->string('payer_name');
            $table->string('email');
            $table->string('phone');
            $table->string('paypal_id');
            $table->string('payment_method');
            $table->string('token');
            $table->integer('student_id')->unsigned()->nullable();
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->integer('company_id')->unsigned()->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
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
        Schema::drop('payments');
    }
}
