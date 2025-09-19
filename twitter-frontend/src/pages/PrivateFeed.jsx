import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function PrivateFeed() {
  const [tweets, setTweets] = useState([]);
  const [form, setForm] = useState({ content: '', visibility: 'public' });
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/tweets/private')
      .then(res => setTweets(res.data))
      .catch(() => {
        alert('Você precisa estar logado para acessar o feed privado.');
        navigate('/login');
      });
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/tweets', form);
      setTweets([res.data, ...tweets]);
      setForm({ content: '', visibility: 'public' });
    } catch (err) {
      alert('Erro ao criar tweet.');
    }
  };

  const handleDelete = async id => {
    try {
      await api.delete(`/tweets/${id}`);
      setTweets(tweets.filter(t => t.id !== id));
    } catch (err) {
      alert('Erro ao excluir tweet.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-green-950 text-white min-h-screen px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Início</h1>

          {/* Formulário de postagem */}
          <form onSubmit={handleSubmit} className="mb-8 bg-green-900 p-6 rounded-lg shadow space-y-4">
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              maxLength={280}
              placeholder="O que está acontecendo?"
              className="w-full p-3 rounded bg-green-800 text-white border border-green-700 resize-none"
            />
            <select
              name="visibility"
              value={form.visibility}
              onChange={handleChange}
              className="w-full p-3 rounded bg-green-800 text-white border border-green-700"
            >
              <option value="public">Público</option>
              <option value="private">Privado</option>
            </select>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold">
              Postar
            </button>
          </form>

          {/* Lista de tweets */}
          {tweets.length === 0 ? (
            <p className="text-center text-gray-400">Você ainda não postou nada.</p>
          ) : (
            tweets.map(tweet => (
              <div key={tweet.id} className="mb-4 p-4 bg-white text-black rounded-lg shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img
                      src={tweet.user.avatar_url}
                      alt="avatar"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="font-semibold">{tweet.user.name}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(tweet.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Excluir
                  </button>
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
