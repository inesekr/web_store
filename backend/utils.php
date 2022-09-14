<?php

function connectToDB(string &$err = null)
{
    $hostname = "localhost";
    $username = "root";
    $password = "";
    $databasename = "final_project_22";

    $con = new mysqli($hostname, $username, $password, $databasename);

    if ($con->connect_error) {
        $err = $con->connect_error;
    }

    return $con;
}