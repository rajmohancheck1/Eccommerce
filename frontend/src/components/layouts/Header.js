import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { logout } from '../../actions/userActions';
//import './Header.css'; // Add custom styles

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout);
  };

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/">
          <img alt="PlantHub Logo" src="/images/logo.png" className="navbar__logo" />
        </Link>
      </div>

      <nav className="navbar__menu">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div className="navbar__search">
        <Search placeholder="Search plants, pots, tools..." />
      </div>

      <div className="navbar__actions">
        {isAuthenticated ? (
          <DropdownButton
            id="dropdown-basic-button"
            title={<span>{user.name}</span>}
            variant="light"
            className="navbar__user"
          >
            {user.role === 'admin' && (
              <Dropdown.Item onClick={() => navigate('/admin/dashboard')}>
                Dashboard
              </Dropdown.Item>
            )}
            <Dropdown.Item onClick={() => navigate('/myprofile')}>
              Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate('/orders')}>
              Orders
            </Dropdown.Item>
            <Dropdown.Item onClick={logoutHandler} className="text-danger">
              Logout
            </Dropdown.Item>
          </DropdownButton>
        ) : (
          <Link to="/login" className="btn navbar__login">
            Account
          </Link>
        )}
        <Link to="/cart" className="navbar__cart">
          <span>Cart</span>
          <span className="navbar__cart-count">{cartItems.length}</span>
        </Link>
      </div>
    </header>
  );
}
