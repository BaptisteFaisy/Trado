import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const AuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (type === 'register' && formData.password !== formData.confirmPassword) {
      return setError('Les mots de passe ne correspondent pas');
    }

    try {
      const endpoint = type === 'login' ? '/api/login' : '/api/register';
      await axios.post(endpoint, formData);
      // Redirection ou gestion de la connexion réussie
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
    }
  };

  return (
    <div className="auth-container">
      <h2>{type === 'login' ? 'SE CONNECTER' : 'INSCRIPTION'}</h2>
      <form onSubmit={handleSubmit}>
        {type === 'register' && (
          <input
            type="text"
            placeholder="Nom"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        {type === 'register' && (
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
        )}
        {error && <div className="error-message">{error}</div>}
        <button type="submit">{type === 'login' ? 'Se connecter' : 'S\'inscrire'}</button>
      </form>
      <div className="auth-switch">
        {type === 'login' ? (
          <>
            Nouveau ici ? <Link to="/register">S'inscrire</Link>
          </>
        ) : (
          <>
            Déjà un compte ? <Link to="/">Se connecter</Link>
          </>
        )}
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="hero-section">
      <h1>Trado</h1>
      <div className="promo-banner">
        <h2>Gagnons de l'argent ensemble</h2>
        <p>15% d'intérêt annuel net.</p>
        <p>Sans rien faire. Sans conditions.</p>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Accueil</Link>
        <div className="auth-links">
          <Link to="/login">Se connecter</Link>
          <Link to="/register">S'inscrire</Link>
        </div>
      </nav>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthForm type="login" />} />
        <Route path="/register" element={<AuthForm type="register" />} />
      </Routes>
    </Router>
  );
}