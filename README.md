# 🐦 PostService — Feed de "Tweets" com Autenticação

Este projeto é uma aplicação fullstack que simula um feed de postagens estilo Twitter, com autenticação de usuários, visibilidade pública/privada e persistência de dados. Foi desenvolvido com **Laravel + Sanctum** no backend e **React + Vite** no frontend.

---

## 🚀 Tecnologias Utilizadas

### Backend (Laravel)
- Laravel 12
- Laravel Sanctum (autenticação via sessão)
- PHP 8.2
- MySQL
- Composer

### Frontend (React)
- React 19.1.13
- Vite
- Axios
- React Router DOM
- Tailwind CSS

---

## 🧪 Credenciais de Teste

Você pode usar as seguintes credenciais para testar a aplicação:

```bash
Email: jvctrclh@outlook.com
Senha: Rurg5sye@
```
---

# Setup do Backend

1. Clone o repositório
```bash
git clone https://github.com/jsilvarabit/twitter-clone-devjr.git
cd twitter-backend
```
2. Instale as dependências
```bash
composer install
```
3. Configure o .env
```bash
cp .env.example .env
```
Edite o .env com suas configurações de banco de dados:
```bash
DB_DATABASE=postservice
DB_USERNAME=root
DB_PASSWORD=

SESSION_DOMAIN=localhost
SANCTUM_STATEFUL_DOMAINS=localhost:5173
```
4. Gere a chave da aplicação
```bash
php artisan key:generate
```
5. Rode as migrations
```bash
php artisan migrate
```
6. Inicie o servidor
```bash
php artisan serve
```
---

# 💻 Setup do Frontend
1. Volte para o diretório \twitter-clone-devjr
```bash
cd twitter-frontend
```
2. Instale as dependências
```bash
npm install
```
3. Inicie o servidor de desenvolvimento
```bash
npm run dev
```
O frontend estará disponível em http://localhost:5173

---

# 🔐 Fluxo de Autenticação

- O frontend usa Laravel Sanctum com autenticação via sessão e cookies
- Requisições protegidas usam withCredentials: true no Axios
- O backend valida CSRF via /sanctum/csrf-cookie antes de login ou registro

  # 📌 Funcionalidades

- Registro e login de usuários
- Feed público e privado
- Criação e exclusão de tweets
- Alternância de visibilidade (público/privado)
- Proteção de rotas privadas
- Validação de sessão com Laravel Sanctum
