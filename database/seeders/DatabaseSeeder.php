<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
       User::create([
        'name' => 'Karina Putri',
        'email' => 'karin@gmail.com',
        'password' => bcrypt('password'),
        'isrole' => '1',
        'namerole' => 'administrator',
       ]);
    }
}
