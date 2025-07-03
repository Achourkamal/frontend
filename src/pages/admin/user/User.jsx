import { useEffect } from 'react';
import { Button, Alert, OverlayTrigger, Tooltip } from 'react-bootstrap';
import useUser from '../../../hooks/useUser.js';
import { CreateIcon } from '../../../assets/icons/Icons.jsx';
import Loader from '../../../components/loader/Loader.jsx';
import UserModal from './components/UserModal.jsx';
import UserTable from './components/UserTable.jsx';

const User = () => {
    const {
        users,
        userData,
        isLoading,
        error,
        showModal,
        modalAction,
        getAllUsers,
        handleShowModal,
        handleCloseModal,
        handleInputChange,
        handleSubmitForm,
        handleDeleteUser
    } = useUser();

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div className="container mt-4">
            {error && <Alert variant="danger">{error}</Alert>}
            {console.log("Errror", error)}

            <div className="d-flex justify-content-between align-items-center">
                <h1>User List</h1>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="tooltip-create">Create a new User</Tooltip>}
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
                    <UserTable
                        users={users}
                        onEdit={handleShowModal}
                        onDelete={handleDeleteUser}
                    />

                    <UserModal
                        show={showModal}
                        onHide={handleCloseModal}
                        action={modalAction}
                        userData={userData}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmitForm}
                        isLoading={isLoading}
                    />
                </>
            )}
        </div>
    );
};

export default User;
