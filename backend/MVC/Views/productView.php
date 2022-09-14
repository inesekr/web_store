<?php
require_once __DIR__ . "/../header.php";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product</title>
</head>

<body>
    <section>
        <h1>Product</h1>
        <ul>
            <li>ID : <?= $product->getId() ?></li>
            <li>Brand : <?= $product->getBrand() ?></li>
            <li>Model : <?= $product->getModel() ?></li>
            <li>Price : <?= $product->getPrice() ?></li>
        </ul>
    </section>
</body>

</html>