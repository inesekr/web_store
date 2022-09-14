<?php

namespace App\Controllers;

require_once __DIR__ . "/../Models/Product.php";

use App\Models\Product;

class ProductController
{
    public function display(int $id)
    {
        $products = Product::selectProducts(null, $id);
        if (count($products) > 0)
            $product = $products[0];
        else
            echo "Product not found";
        require_once __DIR__ . '/../Views/productView.php';
    }
    public function insert(array $product)
    {
        Product::createProduct(new Product(
            $product["brand"],
            $product["model"],
            $product["price"]
        ));
    }
}