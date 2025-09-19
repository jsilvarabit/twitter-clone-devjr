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
    .catch(err => {
      if (err.response?.status === 401) {
        alert('Você precisa estar logado para acessar o feed privado.');
        navigate('/login');
      } else {
        console.error('Erro inesperado:', err);
      }
    });
}, []);


  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    const res = await api.post('/tweets', form, {
      withCredentials: true,
    });
    setTweets([res.data, ...tweets]);
    setForm({ content: '', visibility: 'public' });
  } catch (err) {
    console.error('Erro ao criar tweet:', err);
    alert('Erro ao criar tweet. Verifique se está logado.');
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
          <h1 className="text-3xl font-bold mb-6">Início</h1>

          {/* Formulário de postagem */}
          <form
            onSubmit={handleSubmit}
            className="mb-8 bg-green-900 p-6 rounded-lg shadow space-y-4"
          >
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              maxLength={280}
              placeholder="O que está acontecendo?"
              className="w-full p-3 rounded bg-green-950 text-white border border-green-700 resize-none"
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-gray-300">
                <span>Postagem pública</span>
                <input
                  type="checkbox"
                  checked={form.visibility === 'public'}
                  onChange={() =>
                    setForm({ ...form, visibility: form.visibility === 'public' ? 'private' : 'public' })
                  }
                  className="toggle-checkbox cursor-pointer"
                />
              </label>
              <span className="text-sm text-gray-400">
                {form.content.length}/280
              </span>
            </div>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded font-semibold">
              Postar
            </button>
          </form>

          {/* Lista de tweets */}
          {tweets.length === 0 ? (
            <p className="text-center text-gray-400">Você ainda não postou nada.</p>
          ) : (
            tweets.map(tweet => (
              <div
                key={tweet.id}
                className="mb-4 p-4 bg-green-900 text-white rounded-lg shadow border border-green-800"
              >
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
                    className="text-red-400 text-sm hover:underline"
                  >
                    Excluir
                  </button>
                </div>
                <p className="text-gray-200">{tweet.content}</p>
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
