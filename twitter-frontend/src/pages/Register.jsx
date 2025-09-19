import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import api from '../api/axios';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
  try {
    // 1. Obter o cookie CSRF
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true,
    });

    // 2. Enviar os dados de registro
    await axios.post('http://localhost:8000/register', {
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation,
    }, {
      withCredentials: true,
    });

    // 3. Redirecionar ou buscar usuário
    console.log('Registro bem-sucedido!');
    navigate('/dashboard');
  } catch (err) {
    console.error('Erro no registro:', err);
    alert('Não foi possível registrar. Verifique os dados.');
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
          <h2 className="text-3xl font-bold mb-6 text-center">Crie sua conta</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              name="name"
              placeholder="Nome completo"
              className="w-full p-3 rounded bg-green-950 border border-green-700 text-white placeholder-gray-400"
              onChange={handleChange}
            />
            <input
              name="email"
              placeholder="Email"
              className="w-full p-3 rounded bg-green-950 border border-green-700 text-white placeholder-gray-400"
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Senha"
              className="w-full p-3 rounded bg-green-950 border border-green-700 text-white placeholder-gray-400"
              onChange={handleChange}
            />
            <input
              name="password_confirmation"
              type="password"
              placeholder="Confirmação de senha"
              className="w-full p-3 rounded bg-green-950 border border-green-700 text-white placeholder-gray-400"
              onChange={handleChange}
            />
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded font-semibold">
              Cadastrar
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-300">
            Já tem uma conta?{" "}
            <a href="/login" className="font-semibold hover:underline">
              Faça login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
