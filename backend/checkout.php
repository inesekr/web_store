<?php

// include("utils.php");
include("product.php");

// $basket =  $request->basket;


$input = json_decode(file_get_contents('php://input'));

$basket = $input->basket;

foreach ($basket as $product) :
// Product::updateProducts($product);


endforeach;
echo json_encode($basket);

// $productsToCheckout = (array)$productsToCheckout;
// $products = [];
// foreach ($productsToCheckout as $productsToCheckout) :
//     $productObj = Product::convertFromJSONToProduct($productsToCheckout);
//     $productObj = Product::$productsToCheckout;
//     array_push($products, $productObj);
//     array_push($products, $productsToCheckout);
//     Product::updateProducts($productsToCheckout);
// Product::where("id", $product->id)->update(["quantity" => $product->quantity]);
// endforeach;

echo json_encode("The products sucessfully updated!");

    // public function updateProduct(mysqli $con = null)
    // {
    //     $prepStament = $con->prepare("UPDATE products SET item=?,
    //     price=?,
    //     quantity=?,
    //     picturefile=? WHERE id=?");
    //     $prepStament->bind_param(
    //         "sssss",
    //         $this->item,
    //         $this->price,
    //         $this->quantity,
    //         $this->picturefile,
    //         $this->id
    //     );
    //     $prepStament->execute();
    // }