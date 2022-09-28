<?php

include("product.php");

// $basket =  $request->basket;


// $basket = $input->basket;
// echo $productsInput;

$input = json_decode(file_get_contents('php://input'));

$products = $input->products;

$productsArr = [];

foreach ($products as $product) :
    $productObj = Product::convertFromJSONToProduct($product);
    array_push($productsArr, $productObj);

    Product::updateProducts($productsArr);
endforeach;

// Product::updateProducts($productsArr);

// echo json_encode($products);

echo json_encode("The products sucessfully updated!");