<?php

namespace App\Controllers;

use mysqli;

class Model
{
    public static function connectToDB(): mysqli
    {
        $hostname = "localhost";
        $username = "root";
        $password = "";
        $databasename = "final_project_22";

        $con = new mysqli($hostname, $username, $password, $databasename);

        return $con;
    }
}