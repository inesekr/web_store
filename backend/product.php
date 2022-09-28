<?php

// use Product as GlobalProduct;
include("utils.php");

class Product
{
    protected string $item;
    protected int $price, $quantity;
    protected string $picturefile;
    protected int $id;
    protected mysqli $con;

    public function __construct($item, $price, $quantity, $picturefile, $id = 0)
    {
        $this->item = $item;
        $this->price = $price;
        $this->quantity = $quantity;
        $this->picturefile = $picturefile;
        $this->id = $id;
        $this->con = connectToDB();
    }

    public function getProduct(): array
    {
        return [
            "id" => $this->id,
            "item" => $this->item,
            "price" => $this->price,
            "quantity" => $this->quantity,
            "picturefile" => $this->picturefile
        ];
    }

    public function getId()
    {
        return $this->id;
    }

    public function getItem(): string
    {
        return $this->item;
    }

    public function getPrice(): string
    {
        return $this->price;
    }

    public function getQuantity(): string
    {
        return $this->quantity;
    }

    public function getPicturefile(): string
    {
        return $this->picturefile;
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
                $entry["item"],
                $entry["price"],
                $entry["quantity"],
                $entry["picturefile"],
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

        $prepStament = $con->prepare("INSERT INTO products(item,price,quantity,picturefile) VALUES
        (?,?,?,?)");
        $prepStament->bind_param(
            "ssss",
            $product->item,
            $product->price,
            $product->quantity,
            $product->picturefile
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
        $prepStament = $con->prepare("UPDATE products SET item=?,
        price=?,
        quantity=?,
        picturefile=? WHERE id=?");
        $prepStament->bind_param(
            "sssss",
            $this->item,
            $this->price,
            $this->quantity,
            $this->picturefile,
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
                Item
            </div>
            <div class='col'>
                Price
            </div>
            <div class='col'>
               Quantity
            </div>
            <div class='col'>
            Picturefile
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
                <div class='col'>" . $this->item .
            "</div>
                <div class='col'>" . $this->price .
            "</div>
                <div class='col'>" . $this->quantity .
            "</div>
                <div class='col'>" . $this->picturefile .
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
            $product->item,
            $product->price,
            $product->quantity,
            $product->picturefile,
            $product->id
        );
    }

    public static function convertBasketFromJSONToProduct($product): Product
    {
        return new Product(
            $product->item,
            $product->price,
            $product->quantity,
            $product->picturefile,
            $product->id
        );
    }

    public function convertToJSON()
    {
        $product = new stdClass();
        $product->item = $this->item;
        $product->price = $this->price;
        $product->quantity = $this->quantity;
        $product->picturefile = $this->picturefile;
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
            $item =  $product->getElementsByTagName("item")->item(0)->nodeValue;
            $price = $product->getElementsByTagName("price")->item(0)->nodeValue;
            $quantity = $product->getElementsByTagName("quantity")->item(0)->nodeValue;
            $picturefile = $product->getElementsByTagName("picturefile")->item(0)->nodeValue;
            $productObj = new Product($item, $price, $quantity, $picturefile);
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
            $item = $csvContentLineArr[0];
            $price = $csvContentLineArr[1];
            $quantity = $csvContentLineArr[2];
            $picturefile = $csvContentLineArr[3];
            $productObj = new Product($item, $price, $quantity, $picturefile);
            array_push($productsArr, $productObj);
        endwhile;
        return json_encode(array("products"
        => Product::convertProductArrToJSON($productsArr)));
    }
}