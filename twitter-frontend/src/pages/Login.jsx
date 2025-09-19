import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';


export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
        await api.get('/sanctum/csrf-cookie'); // isso define o cookie XSRF-TOKEN
        const res = await api.post('/login', form); // agora o Laravel aceita

        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
    } catch (err) {
      alert('Credenciais inválidas');
    }
  };

  return (
    <div className="bg-green-950 text-white min-h-screen flex items-center justify-center">
      <div className="bg-green-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Log in</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="email" placeholder="Email" className="w-full p-3 rounded bg-green-800 text-white border border-green-700" onChange={handleChange} />
          <input name="password" type="password" placeholder="Senha" className="w-full p-3 rounded bg-green-800 text-white border border-green-700" onChange={handleChange} />
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold">Entrar</button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          Não possui uma conta? <a href="/register" className="underline text-green-400">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}
