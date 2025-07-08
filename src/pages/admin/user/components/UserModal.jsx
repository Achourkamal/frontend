import React from 'react';
import { Modal, Button, Form, ButtonGroup } from 'react-bootstrap';

const UserModal = ({ show, onHide, action, userData, onInputChange, onSubmit, isLoading }) => {
    const modalTitle = action === 'create' ? 'Create User' : 'Update User';
    const submitButtonText = action === 'create' ? 'Create' : 'Update';

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    <Form.Group controlId="formUserName" className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter user name"
                            value={userData?.name || ''}
                            onChange={onInputChange}
                            required
                            disabled={isLoading}
                        />
                    </Form.Group>

                    <Form.Group controlId="formUserEmail" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={userData?.email || ''}
                            onChange={onInputChange}
                            required
                            disabled={isLoading}
                        />
                    </Form.Group>

                    {/* <Form.Group controlId="formUserPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={userData?.password || ''}
                            onChange={onInputChange}
                            required={action === 'create'}
                            disabled={isLoading}
                        />
                        {action === 'update' && (
                            <Form.Text muted>
                                Leave blank to keep existing password
                            </Form.Text>
                        )}
                    </Form.Group> */}

                    <Form.Group controlId="formUserIsAdmin" className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Is Admin"
                            name="isAdmin"
                            checked={userData?.isAdmin || false}
                            onChange={onInputChange}
                            disabled={isLoading}
                        />
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

export default UserModal;
