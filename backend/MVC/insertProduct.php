<?php
require("Controllers/ProductController.php");

use App\Controllers\ProductController;

if (count($_POST) > 0) :
    $productController = new ProductController();
    $productController->insert($_POST);
    require("Views/sucessInsertion.php");
else :
    require("Views/productInsertView.php");
endif;