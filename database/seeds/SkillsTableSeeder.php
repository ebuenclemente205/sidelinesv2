<?php

use sidelines\Skill;
use Illuminate\Database\Seeder;

class SkillsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Skill::create([
            'name' => 'java',
        ]);

        Skill::create([
            'name' => 'php',
        ]);

        Skill::create([
            'name' => 'css',
        ]);

        Skill::create([
            'name' => 'javascript',
        ]);

        Skill::create([
            'name' => 'html',
        ]);

        Skill::create([
            'name' => 'android',
        ]);

        Skill::create([
            'name' => 'ios',
        ]);

        Skill::create([
            'name' => 'laravel',
        ]);

        Skill::create([
            'name' => 'wordpress',
        ]);

        Skill::create([
            'name' => 'drupal',
        ]);

        Skill::create([
            'name' => 'ruby',
        ]);

        Skill::create([
            'name' => 'python',
        ]);

        Skill::create([
            'name' => 'c++',
        ]);

        Skill::create([
            'name' => 'visual basic',
        ]);

        Skill::create([
            'name' => 'asp',
        ]);
    }
}
