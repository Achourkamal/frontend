// hooks/useLogin.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASEURL = process.env.REACT_APP_BASEURL;

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASEURL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('userConnectedData', JSON.stringify(response.data));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleLogin,
  };
};
