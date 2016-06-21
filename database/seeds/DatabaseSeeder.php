<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;


class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        // $this->call(UserTableSeeder::class);
        // $this->call(StudentsTableSeeder::class);
        $this->call(SkillsTableSeeder::class);
        // $this->call(SchoolsTableSeeder::class);
        $this->call(DegreesTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);

        Model::reguard();
    }
}
