<?php

// use Product as GlobalProduct;
include("utils.php");

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
        $this->con = connectToDB();
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
            $con = connectToDB();
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
            $con = connectToDB();
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
            $con = connectToDB();
        endif;

        foreach ($products as $product) {
            $product->updateProduct($con);
        }
    }

    public function updateProduct(mysqli $con = null)
    {
        $prepStament = $con->prepare("UPDATE products SET brand=?,
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
            $con = connectToDB();
        foreach ($products as $product) :
            Product::createProduct(
                $product,
                $con
            );
        endforeach;
    }

    public static function generateProductsTableHTML($products): string
    {
        $productsTable =
            "<b>
        <div class='row'>
            <div class='col'>
                Brand
            </div>
            <div class='col'>
                Model
            </div>
            <div class='col'>
               Price
            </div>
        </div>
    </b>";

        foreach ($products as $product) :
            $productsTable .= $product->getProductRow();
        endforeach;
        return $productsTable;
    }

    public function getProductRow()
    {
        return "<div class='row'>
                <div class='col'>" . $this->brand .
            "</div>
                <div class='col'>" . $this->model .
            "</div>
                <div class='col'>" . $this->price .
            "</div>
            </div>";
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

    public function convertToJSON()
    {
        $product = new stdClass();
        $product->brand = $this->brand;
        $product->model = $this->model;
        $product->price = $this->price;
        return $product;
    }

    public static function convertProductArrToJSON(array $products): array
    {
        $productsJSON = [];
        foreach ($products as $product)
            array_push($productsJSON, $product->convertToJSON());

        return $productsJSON;
    }

    public static function saveProductsJSON(string $filename, array $products)
    {
        $json = json_encode(array("products" => $products), JSON_PRETTY_PRINT);
        file_put_contents($filename, $json);
    }

    public static function getProductsFromJSON(string $filename): string
    {
        $filecontent = file_get_contents($filename);
        return $filecontent;
    }

    public static function getProductsFromXML(string $filename): string
    {
        $xmlDoc = new DOMDocument();
        $xmlDoc->load($filename);

        $productsArr = [];
        $products = $xmlDoc->documentElement->getElementsByTagName("product"); //root element
        foreach ($products as $product) :
            $brand =  $product->getElementsByTagName("brand")->item(0)->nodeValue;
            $model = $product->getElementsByTagName("model")->item(0)->nodeValue;
            $price = $product->getElementsByTagName("price")->item(0)->nodeValue;
            $productObj = new Product($brand, $model, $price);
            array_push($productsArr, $productObj);
        endforeach;
        return json_encode(array("products"
        => Product::convertProductArrToJSON($productsArr)));
    }

    public static function getProductsFromCSV(string $filename): string
    {
        $productsArr = [];
        $file = fopen($filename, "r");
        if ($file == false) {
            exit();
        }

        //We skip the heder line
        $csvContentLineArr = fgetcsv($file, filesize($filename), ";");

        while ($csvContentLineArr = fgetcsv($file, filesize($filename), ";")) :
            $brand = $csvContentLineArr[0];
            $model = $csvContentLineArr[1];
            $price = $csvContentLineArr[2];
            $productObj = new Product($brand, $model, $price);
            array_push($productsArr, $productObj);
        endwhile;
        return json_encode(array("products"
        => Product::convertProductArrToJSON($productsArr)));
    }
}