<?php

include("product.php");

$input = json_decode(file_get_contents('php://input'));

$products = $input->products;

$productsArr = [];

foreach ($products as $product) :
    $productObj = Product::convertFromJSONToProduct($product);
    array_push($productsArr, $productObj);

    Product::updateProducts($productsArr);
endforeach;

echo json_encode("Order completed sucessfully!");