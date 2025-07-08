import { Table, Button } from 'react-bootstrap';
import { EditIcon, DeleteIcon } from '../../../../assets/icons/Icons.jsx';

const OrderTable = ({ orders, onEdit, onDelete, users }) => {
  return (
    <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th>User</th>
          <th>Products</th>
          <th>Total</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 ? (
          orders.map((order) => {
            let productCount = 0
            order.products.map((product) => {
              productCount = productCount + product.quantity
            })
            let userName = ''

            users.map((user) => {
              if (user._id === order.user) {
                userName = user.name
              }
            })
            
            const dateFormatted = new Date(order.createdAt).toLocaleDateString();

            return (
              <tr key={order._id}>
                <td>{userName}</td>
                <td>{productCount} produit(s)</td>
                <td>{order.totalPrice} €</td>
                <td>{order.status}</td>
                <td>{dateFormatted}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => onEdit('update', order)}
                    className="me-2"
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onDelete(order._id)}
                  >
                    <DeleteIcon />
                  </Button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="6" className="text-center">No orders found.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default OrderTable;
