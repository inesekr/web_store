<?php

// include("utils.php");

include("product.php");

// $con = connectToDB();

// if ($con !== null) :
//     $products = Product::selectProducts($con);
//     echo json_encode($products);
// endif;



$products = Product::convertProductsToTextArray(Product::selectProducts());
echo json_encode($products);