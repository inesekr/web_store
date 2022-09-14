<?php
include("product.php");

$productInput = json_decode(file_get_contents('php://input'));
$productInput->id = 0;
$productObj = Product::convertFromJSONToProduct($productInput);
Product::createProduct($productObj);
echo json_encode("The product is created sucessfully");