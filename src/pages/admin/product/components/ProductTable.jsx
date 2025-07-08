import { Table, Button } from 'react-bootstrap';
import { EditIcon, DeleteIcon } from '../../../../assets/icons/Icons.jsx';
import { truncateText } from '../../../../assets/utils/helpers.js';




const ProductTable = ({ products, onEdit, onDelete }) => {

    return (
        <Table striped bordered hover className="mt-4">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            {/* Ici on utilise directement product.category.name */}
                            <td>{product.category?.name || 'N/A'}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => onEdit('update', product)}
                                    className="me-2"
                                >
                                    <EditIcon />
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => onDelete(product._id)}
                                >
                                    <DeleteIcon />
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="text-center">No Product found.</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default ProductTable;