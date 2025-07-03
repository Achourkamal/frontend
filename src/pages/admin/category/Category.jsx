import { useEffect } from 'react';
import { Button, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import useCategory from '../../../hooks/useCategory.js';
import { CreateIcon } from '../../../assets/icons/Icons.jsx';
import Loader from '../../../components/loader/Loader.jsx';
import CategoryModal from './components/CategoryModal.jsx';
import CategoryTable from './components/CategoryTable.jsx';


const Category = () => {
    const {
        categories,
        categoryData,
        isLoading,
        error,
        showModal,
        modalAction,
        getAllCategories,
        getCategoryById,
        createCategory,
        updateCategory,
        deleteCategory,
        handleShowModal,
        handleCloseModal,
        handleInputChange,
        handleSubmitForm,
        handleDeleteCategory
    } = useCategory()

    useEffect(() => {
        getAllCategories()
    }, [])

    return (
        <div className="container mt-4">
            {error && <Alert variant="danger">{error}</Alert>}

            <div className='d-flex justify-content-between'>
                <h1>Categories List</h1>
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
                    <CategoryTable
                        categories={categories}
                        onEdit={handleShowModal}
                        onDelete={handleDeleteCategory}
                    />

                    {/* Render the Modal component */}
                    <CategoryModal
                        show={showModal}
                        onHide={handleCloseModal}
                        action={modalAction}
                        categoryData={categoryData}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmitForm}
                        isLoading={isLoading} // Pass loading state to disable form during submission if needed
                    />
                </>
            )}

        </div>
    )
}

export default Category