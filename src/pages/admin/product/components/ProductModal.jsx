import React, { useEffect } from 'react'; 
import { Modal, Button, Form, ButtonGroup } from 'react-bootstrap';
import useCategory from '../../../../hooks/useCategory';


const ProductModal = ({ show, onHide, action, productData, onInputChange, onSubmit, isLoading }) => {
    const modalTitle = action === 'create' ? 'Create Product' : 'Update Product';
    const submitButtonText = action === 'create' ? 'Create' : 'Update';

    const { categories, getAllCategories } = useCategory();

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    <Form.Group controlId="formProductName" className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter product name"
                            value={productData?.name}
                            onChange={onInputChange}
                            required
                            disabled={isLoading}
                        />
                    </Form.Group>

                    <Form.Group controlId="formProductDescription" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            placeholder="Enter description"
                            value={productData?.description}
                            onChange={onInputChange}
                            required
                            disabled={isLoading}
                        />
                    </Form.Group>

                    <Form.Group controlId="formProductPrice" className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            name="price"
                            placeholder="Enter price"
                            value={productData?.price}
                            onChange={onInputChange}
                            min="0.01" 
                            required
                            disabled={isLoading}
                        />
                    </Form.Group>

                    <Form.Group controlId="formProductStock" className="mb-3">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            name="stock"
                            placeholder="Enter stock quantity"
                            value={productData?.stock}
                            onChange={onInputChange}
                            min="0"
                            required
                            disabled={isLoading}
                        />
                    </Form.Group>

                    {/* ✅ Liste déroulante pour la catégorie */}
                    <Form.Group controlId="formProductCategory" className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            name="category"
                            value={productData?.category._id}
                            onChange={onInputChange}
                            required
                            disabled={isLoading}
                        >
                            <option value="">-- Select Category --</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <ButtonGroup className="my-2 d-flex justify-content-end">
                        <Button variant="danger" onClick={onHide} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" disabled={isLoading}>
                            {submitButtonText}
                        </Button>
                    </ButtonGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProductModal;
