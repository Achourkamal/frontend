import React from 'react';
import { Modal, Button, Form, ButtonGroup } from 'react-bootstrap';

const OrderModal = ({
  show,
  onHide,
  action,
  orderData,
  onInputChange,
  onSubmit,
  isLoading,
  users = [],
  products = []
}) => {
  const modalTitle = action === 'create' ? 'Create Order' : 'Update Order';
  const submitButtonText = action === 'create' ? 'Create' : 'Update';

  const handleAddProduct = () => {
    const newProducts = [...(orderData.products || [])];
    newProducts.push({ product: '', quantity: 1 });
    onInputChange({ target: { name: 'products', value: newProducts } });
  };

  const handleRemoveProduct = (index) => {
    const newProducts = [...orderData.products];
    newProducts.splice(index, 1);
    onInputChange({ target: { name: 'products', value: newProducts } });
  };

  const getFilteredProducts = (index) => {
    const selectedIds = orderData.products
      .map((p, i) => (i !== index ? p.product : null))
      .filter(Boolean);

    const currentProduct = orderData.products[index]?.product;
    return products.filter(p => !selectedIds.includes(p._id) || p._id === currentProduct);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <Form.Group controlId="formOrderUser" className="mb-3">
            <Form.Label>User</Form.Label>
            <Form.Select
              name="user"
              value={orderData.user || ''}
              onChange={onInputChange}
              disabled={isLoading}
              required
            >
              <option value="">-- Sélectionner un utilisateur --</option>
              {users.map(u => (
                <option key={u._id} value={u._id}>{u.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formOrderStatus" className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={orderData.status || 'pending'}
              onChange={onInputChange}
              disabled={isLoading}
              required
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Total Price</Form.Label>
            <Form.Control type="number" value={orderData.totalPrice || 0} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Produits</Form.Label>
            {orderData.products.map((item, index) => (
              <div key={index} className="d-flex gap-2 mb-2">
                <Form.Select
                  value={item.product}
                  onChange={e => {
                    const newProducts = [...orderData.products];
                    newProducts[index].product = e.target.value;
                    onInputChange({ target: { name: 'products', value: newProducts } });
                  }}
                  disabled={isLoading}
                  required
                >
                  <option value="">-- Sélectionner un produit --</option>
                  {getFilteredProducts(index).map(p => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                  ))}
                </Form.Select>
                <Form.Control
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={e => {
                    const newProducts = [...orderData.products];
                    newProducts[index].quantity = parseInt(e.target.value) || 1;
                    onInputChange({ target: { name: 'products', value: newProducts } });
                  }}
                  disabled={isLoading}
                />
                <Button variant="danger" onClick={() => handleRemoveProduct(index)} disabled={isLoading} size="sm">✕</Button>
              </div>
            ))}
            <Button variant="outline-primary" onClick={handleAddProduct} disabled={isLoading} size="sm">
              + Ajouter un produit
            </Button>
          </Form.Group>

          <ButtonGroup className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onHide} disabled={isLoading}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={isLoading}>{submitButtonText}</Button>
          </ButtonGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OrderModal;
