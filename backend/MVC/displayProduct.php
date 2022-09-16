<?php
// require(__DIR__ . "\..\utils.php");
require("Controllers/ProductController.php");

use App\Controllers\ProductController;

$productController = new ProductController();
$productController->display($_GET["id"]);