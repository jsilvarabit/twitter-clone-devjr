<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tweet;
use Illuminate\Http\Request;

class TweetController extends Controller
{
    public function public()
    {
        return Tweet::where('visibility', 'public')->with('user')->latest()->get();
    }

    public function private(Request $request)
    {
        return Tweet::where('user_id', $request->user()->id)->with('user')->latest()->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|max:280',
            'visibility' => 'required|in:public,private',
        ]);

        return $request->user()->tweets()->create($request->only('content', 'visibility'));
    }

    public function update(Request $request, $id)
    {
        $tweet = Tweet::findOrFail($id);

        if ($tweet->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'content' => 'required|max:280',
            'visibility' => 'required|in:public,private',
        ]);

        $tweet->update($request->only('content', 'visibility'));
        return $tweet;
    }

    public function destroy(Request $request, $id)
    {
        $tweet = Tweet::findOrFail($id);

        if ($tweet->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $tweet->delete();
        return response()->noContent();
    }
}
