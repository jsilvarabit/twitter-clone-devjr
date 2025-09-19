import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';

export default function PublicFeed() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    api.get('/tweets/public')
      .then(res => setTweets(res.data))
      .catch(err => console.error('Erro ao carregar tweets públicos:', err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-green-950 text-white min-h-screen px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Feed Público</h1>

          {tweets.length === 0 ? (
            <p className="text-center text-gray-400">Nenhum tweet público disponível.</p>
          ) : (
            tweets.map(tweet => (
              <div key={tweet.id} className="mb-4 p-4 bg-white text-black rounded-lg shadow transition-all hover:scale-[1.01]">
                <div className="flex items-center mb-2">
                  <img
                    src={tweet.user.avatar_url}
                    alt="avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="font-semibold">{tweet.user.name}</span>
                </div>
                <p className="text-gray-800">{tweet.content}</p>
                <span className="text-xs text-gray-500 block mt-2">
                  Visibilidade: {tweet.visibility}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
