<?php

use Illuminate\Database\Seeder;
use sidelines\School;

class SchoolsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        School::create([
            'name' => 'University of Cebu',
            'description' => $faker->paragraph(6),
            'address' => $faker->address,
            'country' => $faker->country,
            'zipcode' => $faker->postcode,
            'tel_no' => $faker->phoneNumber,
            'website' => $faker->domainName,
            'key_code' => 'uc',
        ]);

        School::create([
            'name' => 'University of San Carlos',
            'description' => $faker->paragraph(6),
            'address' => $faker->address,
            'country' => $faker->country,
            'zipcode' => $faker->postcode,
            'tel_no' => $faker->phoneNumber,
            'website' => $faker->domainName,
            'key_code' => 'usc',
        ]);

        School::create([
            'name' => 'Cebu Normal University',
            'description' => $faker->paragraph(6),
            'address' => $faker->address,
            'country' => $faker->country,
            'zipcode' => $faker->postcode,
            'tel_no' => $faker->phoneNumber,
            'website' => $faker->domainName,
            'key_code' => 'cnu',
        ]);

        School::create([
            'name' => 'University of the Philippines',
            'description' => $faker->paragraph(6),
            'address' => $faker->address,
            'country' => $faker->country,
            'zipcode' => $faker->postcode,
            'tel_no' => $faker->phoneNumber,
            'website' => $faker->domainName,
            'key_code' => 'up',
        ]);

        School::create([
            'name' => 'Asian College of Technology',
            'description' => $faker->paragraph(6),
            'address' => $faker->address,
            'country' => $faker->country,
            'zipcode' => $faker->postcode,
            'tel_no' => $faker->phoneNumber,
            'website' => $faker->domainName,
            'key_code' => 'act',
        ]);

        School::create([
            'name' => 'University of San Jose Recoletos',
            'description' => $faker->paragraph(6),
            'address' => $faker->address,
            'country' => $faker->country,
            'zipcode' => $faker->postcode,
            'tel_no' => $faker->phoneNumber,
            'website' => $faker->domainName,
            'key_code' => 'usjr',
        ]);

        School::create([
            'name' => 'University of Southern Philippines Foundation',
            'description' => $faker->paragraph(6),
            'address' => $faker->address,
            'country' => $faker->country,
            'zipcode' => $faker->postcode,
            'tel_no' => $faker->phoneNumber,
            'website' => $faker->domainName,
            'key_code' => 'uspf',
        ]);

        School::create([
            'name' => 'University of the Visayas',
            'description' => $faker->paragraph(6),
            'address' => $faker->address,
            'country' => $faker->country,
            'zipcode' => $faker->postcode,
            'tel_no' => $faker->phoneNumber,
            'website' => $faker->domainName,
            'key_code' => 'uv',
        ]);
    }
}
