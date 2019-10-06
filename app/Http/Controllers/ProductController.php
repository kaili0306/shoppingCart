<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Product;

class ProductController extends Controller
{
    public function index()
    {
        return Product::all();
    }

    public function show($id)
    {
        $product = Product::find($id);

        if(!$product) {
            return response()->json([
                'error' => 404,
                'message' => 'Not found'
            ], 404);
        }

        return $product;
    }

    public function store(Request $request)
    {
        $product = Product::create($request->all());

        return response()->json([
            'id' => $product->id,
            'created_at' => $product->created_at,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if(!$product) {
            return response()->json([
                'error' => 404,
                'message' => 'Not found'
            ], 404);
        }

        $product->update($request->all());

        return response()->json(null, 204);
    }

    public function destroy(Request $request, $id)
    {
        $product = Product::find($id);

        if(!$product) {
            return response()->json([
                'error' => 404,
                'message' => 'Not found'
            ], 404);
        }

        $product->delete();

        return response()->json(null, 204);
    }
}
