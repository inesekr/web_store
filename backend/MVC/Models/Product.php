<?php

namespace App\Models;

use App\Controllers\Model;
use DOMDocument;
use mysqli;
use stdClass;

class Product
{
    protected string $brand, $model, $price;
    protected int $id;
    protected mysqli $con;

    public function __construct($brand, $model, $price, $id = 0)
    {
        $this->brand = $brand;
        $this->model = $model;
        $this->price = $price;
        $this->id = $id;
        $this->con = Model::connectToDB();
    }

    public function getProduct(): array
    {
        return [
            "id" => $this->id,
            "brand" => $this->brand,
            "model" => $this->model,
            "price" => $this->price
        ];
    }

    public function getId()
    {
        return $this->id;
    }

    public function getBrand(): string
    {
        return $this->brand;
    }

    public function getModel(): string
    {
        return $this->model;
    }

    public function getPrice(): string
    {
        return $this->price;
    }

    public static function selectProducts(mysqli $con = null, int $id = null): array
    {
        if ($con === null) :
            $con = Model::connectToDB();
        endif;

        if ($id === null || $id === 0)
            $query = "SELECT * FROM products";
        else
            $query = "SELECT * FROM products WHERE id = $id";

        $result = $con->query($query);
        $products = [];

        while ($entry = $result->fetch_assoc()) :
            $product = new Product(
                $entry["brand"],
                $entry["model"],
                $entry["price"],
                $entry["id"]
            );
            array_push($products, $product);
        endwhile;

        return $products;
    }

    public static function convertProductsToTextArray(array $products): array
    {
        $productsArray = [];
        foreach ($products as $productObj)
            array_push($productsArray, $productObj->getProduct());
        return $productsArray;
    }

    public static function createProduct(Product $product, mysqli $con = null)
    {
        if ($con === null) :
            $con = Model::connectToDB();
        endif;

        $prepStament = $con->prepare("INSERT INTO products(brand,model,price) VALUES
        (?,?,?)");
        $prepStament->bind_param(
            "sss",
            $product->brand,
            $product->model,
            $product->price
        );
        $prepStament->execute();
    }

    public static function updateProducts(array $products, mysqli $con = null)
    {
        if ($con === null) :
            $con = Model::connectToDB();
        endif;

        foreach ($products as $product) {
            $product->updateProduct($con);
        }
    }

    public function updateProduct(mysqli $con = null)
    {
        $prepStament = $con->prepare("UPDATE product SET brand=?,
        model=?, 
        price=? WHERE id=?");
        $prepStament->bind_param(
            "ssss",
            $this->brand,
            $this->model,
            $this->price,
            $this->id
        );
        $prepStament->execute();
    }

    public static function createProducts(array $products, mysqli $con = null)
    {
        if ($con === null)
            $con = Model::connectToDB();
        foreach ($products as $product) :
            Product::createProduct(
                $product,
                $con
            );
        endforeach;
    }
    public static function insertFromJSONFile(string $filename, mysqli $con)
    {
        $filecontent = file_get_contents($filename);
        $productsObj = json_decode($filecontent);
        foreach ($productsObj->products as $product) :
            Product::createProduct(
                Product::convertFromJSONToProduct($product),
                $con
            );
        endforeach;
    }
    public static function convertFromJSONToProduct($product): Product
    {
        return new Product(
            $product->brand,
            $product->model,
            $product->price,
            $product->id
        );
    }
    public static function getProductsFromJSON(string $filename): string
    {
        $filecontent = file_get_contents($filename);
        return $filecontent;
    }
}