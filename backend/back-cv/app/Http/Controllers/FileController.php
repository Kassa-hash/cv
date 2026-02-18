<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FileController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);

        $path = $request->file('file')->store('uploads', 'public');
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $document = $user->user_cvs()->create(['path' => $path]);

        return response()->json([
            'message' => 'Fichier uploadé avec succès',
            'path' => $path,
            'url' => asset('storage/' . $path)
        ]);
    }
}
