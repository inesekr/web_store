<?php
include("product.php");

$filename = json_decode(file_get_contents('php://input'));
$filename = 'files\\' . $filename;
$fileExtension = pathinfo($filename, PATHINFO_EXTENSION);

switch ($fileExtension) {
    case "json":
        echo Product::getProductsFromJSON($filename);
        break;
    case "xml":
        echo Product::getProductsFromXML($filename);
        break;
    case "csv":
        echo Product::getProductsFromCSV($filename);
        break;
}