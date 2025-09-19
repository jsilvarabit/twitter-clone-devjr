import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
  e.preventDefault();

  try {
    // 1. Obter o cookie CSRF
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true,
    });

   const token = decodeURIComponent(document.cookie.split('XSRF-TOKEN=')[1].split(';')[0]);

    const res = await axios.post('http://localhost:8000/login', {
      email: form.email,
      password: form.password,
    }, {
      withCredentials: true,
      headers: {
        'X-XSRF-TOKEN': token,
      },
    });

    // 3. Redirecionar ou salvar estado
    console.log('Login bem-sucedido');
    navigate('/dashboard');
  } catch (err) {
    console.error('Erro no login:', err);
    alert('Credenciais inválidas');
  }
  };

  return (
    <div className="bg-green-950 text-white min-h-screen flex flex-col">
      {/* Navbar simples */}
      <div className="p-4 border-b border-green-800">
        <h1 className="text-lg font-bold">Microblog</h1>
      </div>

      {/* Container central */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Log in</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              placeholder="Username or email"
              className="w-full p-3 rounded bg-green-950 border border-green-700 text-white placeholder-gray-400"
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-green-950 border border-green-700 text-white placeholder-gray-400"
              onChange={handleChange}
            />
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded font-semibold">
              Log in
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-300">
            Não possui uma conta?{" "}
            <a href="/register" className="font-semibold hover:underline">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
