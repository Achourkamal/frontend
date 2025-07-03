import { useState } from 'react';
import axios from 'axios';

const BASEURL = process.env.REACT_APP_BASEURL;

const useUser = () => {
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState('create');

  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    isAdmin: '',
  });

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASEURL}/users`);
      setUsers(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching users');
    } finally {
      setIsLoading(false);
    }
  };

  const getUserById = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASEURL}/users/${id}`);
      setUserSelected(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching user by ID');
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (data) => {
    try {
      setIsLoading(true);
      await axios.post(`${BASEURL}/users`, data);
      getAllUsers();
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating user');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (id, data) => {
    try {
      setIsLoading(true);
      await axios.put(`${BASEURL}/users/${id}`, data);
      getAllUsers();
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating user');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`${BASEURL}/users/${id}`);
      getAllUsers();
    } catch (error) {
      setError(error.response?.data?.message || 'Error deleting user');
    } finally {
      setIsLoading(false);
    }
  };

  // Modal handling
  const handleShowModal = (action, user = null) => {
    setModalAction(action);
    if (action === 'update' && user) {
      setUserData({
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
      });
      setUserSelected(user);
    } else {
      setUserData({
        id: '',
        name: '',
        email: '',
        password: '',
        isAdmin: '',
      });
      setUserSelected(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUserData({
      id: '',
      name: '',
      email: '',
      password: '',
      isAdmin: '',
    });
    setUserSelected(null);
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmitForm = async () => {
    try {
      if (modalAction === 'create') {
        await createUser(userData);
      } else if (modalAction === 'update') {
        await updateUser(userData.id, userData);
      }
      handleCloseModal();
      getAllUsers();
    } catch (err) {
      alert('Error submitting user');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
    }
  };

  return {
    users,
    userData,
    isLoading,
    error,
    showModal,
    modalAction,
    getAllUsers,
    getUserById,
    handleSubmitForm,
    handleShowModal,
    handleCloseModal,
    handleDeleteUser,
    handleInputChange,
  };
};

export default useUser;
