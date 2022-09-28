<?php

include("product.php");

$products = Product::convertProductsToTextArray(Product::selectProducts());
echo json_encode($products);