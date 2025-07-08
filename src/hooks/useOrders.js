import { useState } from 'react';
import axios from 'axios';

const BASEURL = process.env.REACT_APP_BASEURL;

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [orderSelected, setOrderSelected] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState('create');

  const [orderData, setOrderData] = useState({
    id: '',
    user: '',
    products: [],
    status: 'pending',
    totalPrice: 0
  });

  const getAllOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASEURL}/orders`);

      const cleaned = response.data.map(order => ({
        ...order,
        user: order.user, // object or ID, depending on API
        products: order.products.filter(p => p.product !== null)
      }));

      setOrders(cleaned);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching orders');
      console.error("Error getting all orders", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async (data) => {
    try {
      setIsLoading(true);
      await axios.post(`${BASEURL}/orders`, data);
      await getAllOrders();
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating order');
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrder = async (id, data) => {
    try {
      setIsLoading(true);
      await axios.put(`${BASEURL}/orders/${id}`, data);
      await getAllOrders();
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating order');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(`${BASEURL}/orders/${id}`);
      await getAllOrders();
    } catch (error) {
      setError(error.response?.data?.message || 'Error deleting order');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowModal = (action, order = null) => {
    setModalAction(action);
    if (action === 'update' && order) {
      const cleanProducts = order.products.map(p => ({
        product: p.product._id || p.product,
        quantity: p.quantity
      }));

      setOrderData({
        id: order._id,
        user: order.user?._id || order.user,
        products: cleanProducts,
        status: order.status,
        totalPrice: order.totalPrice
      });
    } else {
      setOrderData({
        id: '',
        user: '',
        products: [],
        status: 'pending',
        totalPrice: 0
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setOrderData({
      id: '',
      user: '',
      products: [],
      status: 'pending',
      totalPrice: 0
    });
    setOrderSelected(null);
    setError(null);
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    if (name === 'products') {
      const updated = { ...orderData, products: value };
      setOrderData(updated);
      await recalculateTotalPrice(value);
    } else {
      setOrderData(prev => ({ ...prev, [name]: value }));
    }
  };

  const recalculateTotalPrice = async (products) => {
    try {
      const productIds = products.map(p => p.product);
      const response = await axios.post(`${BASEURL}/products/batch`, { ids: productIds });
      const productDetails = response.data;

      let total = 0;
      for (const item of products) {
        const detail = productDetails.find(p => p._id === item.product);
        if (detail) {
          total += item.quantity * detail.price;
        }
      }
      setOrderData(prev => ({ ...prev, totalPrice: total }));
    } catch (error) {
      console.error("Erreur lors du calcul du total", error);
    }
  };

  const handleSubmitForm = async () => {
    if (modalAction === 'create') {
      await createOrder(orderData);
    } else if (modalAction === 'update') {
      await updateOrder(orderData.id, orderData);
    }
    handleCloseModal();
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      await deleteOrder(id);
    }
  };

  return {
    orders,
    orderData,
    isLoading,
    error,
    showModal,
    modalAction,
    handleShowModal,
    handleCloseModal,
    handleInputChange,
    handleSubmitForm,
    handleDeleteOrder,
    getAllOrders
  };
};

export default useOrders;
