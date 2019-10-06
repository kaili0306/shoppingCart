<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Checkout extends Model
{
    protected $fillable=[
        'id',
        'productID',
        'quantity'

    ];

    public function products(){
        return $this->belongsToMany(Product::class);
    }

}
