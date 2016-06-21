<?php

use Illuminate\Database\Seeder;
use sidelines\Category;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create([
            'name' => 'Accounting/Finance',
        ]);

        Category::create([
            'name' => 'Admin/Office/Clerical',
        ]);

        Category::create([
            'name' => 'Arts/Media/Design',
        ]);

        Category::create([
            'name' => 'Education/Schools',
        ]);

        Category::create([
            'name' => 'Engineering/Architecture',
        ]);

        Category::create([
            'name' => 'Food/Restaurant',
        ]);

        Category::create([
            'name' => 'Health/Medical',
        ]);

        Category::create([
            'name' => 'Hotel/Spa/Salon',
        ]);

        Category::create([
            'name' => 'HR/Recruitment/Training',
        ]);

        Category::create([
            'name' => 'IT/Computers',
        ]);

        Category::create([
            'name' => 'Logistics/Warehousing',
        ]);

        Category::create([
            'name' => 'Sales/Marketing/Retail',
        ]);

    }
}
