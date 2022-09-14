<?php
require_once __DIR__ . "/../header.php";
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Insert Product</title>
</head>

<body>

    <form method="POST">
        <div class="form-group">
            <label for="brand">Brand</label>
            <input id="brand" name="brand"></input>
            <label for="model">Model</label>
            <input id="model" name="model"></input>

            <label for="price">Price</label>
            <input id="price" name="rice"></input>
            <button class="btn btn-primary">Save</button>
        </div>
    </form>

</body>

</html>