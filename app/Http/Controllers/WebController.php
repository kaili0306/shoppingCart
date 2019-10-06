<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WebController extends Controller
{
    public function products()
    {
        return view('product.index');
    }

    public function updateProduct()
    {
        return view('product.update');
    }


    public function checkout()
    {
        return view('checkout.index');
    }
}
