<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable=[
        'id',
        'name'

    ];

    public function checkout(){
        return $this->belongsToOne(Checkout::class);
    }

}
