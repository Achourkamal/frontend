import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Navbar, Nav, Container, Alert, Button,
  OverlayTrigger, Tooltip, Badge, Modal
} from 'react-bootstrap';
import { LogoutIcon, ProfileIcon, ShopIcon } from "../../assets/icons/Icons.jsx";
import { truncateText } from '../../assets/utils/helpers.js';
import { logout } from '../../redux/auth/auth.slice.js';

const Menu = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleLogout = async () => {
    try {
      dispatch(logout())
      // navigate("/login");
    } catch {
      setError("Logout failed. Please try again.");
    }
  };

  const isAdmin = currentUser?.isAdmin;

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#">E-commerce</Navbar.Brand>

          <Nav>
            {isAdmin ? (
              <>
                <Nav.Link onClick={() => navigate('/admin/examples')}>Examples</Nav.Link>
                <Nav.Link onClick={() => navigate('/admin/categories')}>Categories</Nav.Link>
                <Nav.Link onClick={() => navigate('/admin/products')}>Products</Nav.Link>
                <Nav.Link onClick={() => navigate('/admin/users')}>Users</Nav.Link>
                <Nav.Link onClick={() => navigate('/admin/orders')}>Orders</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={() => navigate('/examples')}>Examples</Nav.Link>
                <Nav.Link onClick={() => navigate('/categories')}>Categories</Nav.Link>
                <Nav.Link onClick={() => navigate('/products')}>Products</Nav.Link>
                <Nav.Link onClick={() => navigate('/users')}>Users</Nav.Link>
                <Nav.Link onClick={() => navigate('/orders')}>Orders</Nav.Link>
              </>
            )}
          </Nav>

          <Nav>
            <Nav.Link onClick={() => navigate('/profile')} className="d-flex align-items-center">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>{currentUser?.name || "Utilisateur"}</Tooltip>}
              >
                <div>
                  <span className="text-white me-2">
                    {currentUser?.name || "User"}
                  </span>
                  <ProfileIcon />
                </div>
              </OverlayTrigger>
            </Nav.Link>

            {!isAdmin && (
              <Nav.Link onClick={() => navigate('/shop')} className="d-flex align-items-center">
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Shop</Tooltip>}>
                  <div>
                    <ShopIcon />
                    <Badge bg="success">{cart?.items?.length || 0}</Badge>
                  </div>
                </OverlayTrigger>
              </Nav.Link>
            )}
          </Nav>

          <Nav>
            <Nav.Link onClick={handleShow}>
              <OverlayTrigger placement="bottom" overlay={<Tooltip>Logout</Tooltip>}>
                <Button
                  variant="outline-light"
                  style={{ width: '35px', height: '40px' }}
                >
                  <LogoutIcon />
                </Button>
              </OverlayTrigger>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {error && <Alert variant="danger">{error}</Alert>}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to log out ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Cancel
          </Button>
          <Button variant="danger" onClick={()=>handleLogout()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Menu;
