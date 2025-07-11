import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASEURL = process.env.REACT_APP_BASEURL;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmitForm = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setError(null); // Reset error state

    try {
      const response = await axios.post(`${BASEURL}/auth/login`, { email, password });
      localStorage.setItem('userConnectedData', JSON.stringify(response.data));
      navigate('/admin/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de la connexion');
    }
  };

  return (
    <Form onSubmit={handleSubmitForm} className="w-50 mx-auto mt-5">
      <h2 className="mb-4">Connexion</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Se connecter
      </Button>
    </Form>
  );
}

export default Login;
