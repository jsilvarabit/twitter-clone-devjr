import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PublicFeed from './pages/PublicFeed';
import PrivateFeed from './pages/PrivateFeed';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicFeed />} />
        <Route path="/dashboard" element={<PrivateFeed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
