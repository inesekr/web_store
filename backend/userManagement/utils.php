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

function getUserGroups(mysqli $con): array
{
    $prepStament = $con->prepare("SELECT * FROM usergroups");
    $prepStament->execute();
    $result = $prepStament->get_result();

    $usergroupsArr = [];
    while ($entry = $result->fetch_assoc()) {
        $userGroupEntry = (object) array(
            "id" => $entry["id"],
            "text" => $entry["name"]
        );
        array_push($usergroupsArr, $userGroupEntry);
    }

    return $usergroupsArr;
}