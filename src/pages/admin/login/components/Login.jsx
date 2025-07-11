import { useEffect } from 'react';
import { Button, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CreateIcon } from '../../../assets/icons/Icons.jsx';
import Loader from '../../../components/loader/Loader.jsx';
import OrderModal from './components/OrderModal.jsx';
import useOrder from '../../../hooks/useOrders.js';
import useUsers from '../../../hooks/useUser.js';
import useProduct from '../../../hooks/useProduct.js';
import OrderTable from './components/OrderTable.jsx';

const Order = () => {
  const {
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
  } = useOrder();

  const { users, getAllUsers } = useUsers();
  const { products, getAllProducts } = useProduct();

  useEffect(() => {
    getAllOrders();
    getAllUsers?.();
    getAllProducts?.();
  }, []);

  return (
    <div className="container mt-4">
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Orders List</h1>
        <OverlayTrigger placement="top" overlay={<Tooltip id="create-tooltip">Créer une commande</Tooltip>}>
          <Button variant="primary" onClick={() => handleShowModal('create')} disabled={isLoading}>
            <CreateIcon />
          </Button>
        </OverlayTrigger>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <OrderTable orders={orders} onEdit={handleShowModal} onDelete={handleDeleteOrder} users={users} />
          <OrderModal
            key={orderData.id + modalAction}
            show={showModal}
            onHide={handleCloseModal}
            action={modalAction}
            orderData={orderData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmitForm}
            isLoading={isLoading}
            users={users}
            products={products}
          />
        </>
      )}
    </div>
  );
};

export default Order;
