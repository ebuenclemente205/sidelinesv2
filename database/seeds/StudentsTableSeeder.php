<?php

use Illuminate\Database\Seeder;
use sidelines\Student;

class StudentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        $faker = \Faker\Factory::create();

        // if(Student::count() > 0)
        // {
        //     Student::truncate();
        // }
        //
        // foreach(range(1,50) as $index)
        // {
        //     Student::create([
        //         'address' => $faker->address,
        //         'yr_lvl' => $faker->randomElement(array('1','2','3','4')),
        //         'contact_no' => $faker->phoneNumber,
        //     ]);
        // }

        foreach(Student::all() as $student)
        {
            $student->address = $faker->address;
            $student->yr_lvl = $faker->randomElement(array('1','2','3','4'));
            $student->contact_no = $faker->phoneNumber;
            $student->save();
        }
    }
}
