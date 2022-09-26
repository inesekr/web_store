<?php
include("product.php");

$productsInput = json_decode(file_get_contents('php://input'));
$products = [];
foreach ($productsInput as $productInput) :
    $productObj = Product::convertFromJSONToProduct($productInput);
    array_push($products, $productObj);
endforeach;
Product::updateProducts($products);
echo json_encode("The products sucessfully updated!");
