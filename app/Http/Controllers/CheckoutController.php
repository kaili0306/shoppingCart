<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Checkout;

class CheckoutController extends Controller
{
    public function index()
    {
        return Checkout::all();
    }

    public function show($id)
    {
        $checkout = Checkout::find($id);

        if(!$checkout) {
            return response()->json([
                'error' => 404,
                'message' => 'Not found'
            ], 404);
        }

        return $checkout;
    }

    public function store(Request $request)
    {
        $checkout = Checkout::create($request->all());

        return response()->json([
            'id' => $checkout->id,
            'created_at' => $checkout->created_at,
        ], 201);
    }


}
