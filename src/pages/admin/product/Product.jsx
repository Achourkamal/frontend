import { useEffect } from 'react';
import { Button, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import useProduct from '../../../hooks/useProduct.js';
import { CreateIcon } from '../../../assets/icons/Icons.jsx';
import Loader from '../../../components/loader/Loader.jsx';
import ProductModal from './components/ProductModal.jsx';
import ProductTable from './components/ProductTable.jsx';
import useCategory from '../../../hooks/useCategory.js';


const Product = () => {
    const {
        
    products,
    productData,
    isLoading,
    error,
    showModal,
    modalAction,
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    handleShowModal,
    handleCloseModal,
    handleInputChange,
    handleSubmitForm,
    handleDeleteProduct
} = useProduct()

    useEffect(() => {
        getAllProducts()
    }, [])
    const {
        categories, 
        getAllCategories 
    } = useCategory();

    useEffect(() => {
        getAllProducts();
        getAllCategories(); 
    }, []);

    return (
        <div className="container mt-4">
            {error && <Alert variant="danger">{error}</Alert>}

            <div className='d-flex justify-content-between'>
                <h1>products List</h1>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="create-tooltip">  Create a new Category </Tooltip>}  // Display "Create a new Example" when hovered
                >
                    <Button
                        variant="primary"
                        onClick={() => handleShowModal('create')}
                        disabled={isLoading}
                    >
                        <CreateIcon />
                    </Button>
                </OverlayTrigger>

            </div>

            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <ProductTable
                        products={products}
                        categories={categories} 
                        onEdit={handleShowModal}
                        onDelete={handleDeleteProduct}
                    />

                    {/* Render the Modal component */}
                    <ProductModal
                        show={showModal}
                        onHide={handleCloseModal}
                        action={modalAction}
                        productData={productData}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmitForm}
                        isLoading={isLoading} // Pass loading state to disable form during submission if needed
                    />
                </>
            )}

        </div>
    )
}

export default Product