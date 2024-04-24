<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\WordModel;

class WordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = WordModel::where(['deleted_at'=>null])->get();
        return $data;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      if($request){
        WordModel::insert([
            'word'=> $request->input('word'),
            'answer'=> $request->input('answer'),
            'status'=>false
        ]);
      }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id,Request $request)
    {
        $data = WordModel::where(['id'=>$request->input('id')])->get();
        return $data;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
