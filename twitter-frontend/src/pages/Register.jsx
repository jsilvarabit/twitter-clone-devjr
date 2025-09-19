import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';


export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Erro ao registrar');
    }
  };

  return (
    <div className="bg-green-950 text-white min-h-screen flex items-center justify-center">
      <div className="bg-green-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Crie sua conta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Nome completo" className="w-full p-3 rounded bg-green-800 text-white border border-green-700" onChange={handleChange} />
          <input name="email" placeholder="Email" className="w-full p-3 rounded bg-green-800 text-white border border-green-700" onChange={handleChange} />
          <input name="password" type="password" placeholder="Senha" className="w-full p-3 rounded bg-green-800 text-white border border-green-700" onChange={handleChange} />
          <input name="password_confirmation" type="password" placeholder="Confirmação de senha" className="w-full p-3 rounded bg-green-800 text-white border border-green-700" onChange={handleChange} />
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold">Cadastrar</button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          Já tem uma conta? <a href="/login" className="underline text-green-400">Faça login</a>
        </p>
      </div>
    </div>
  );
}
