import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/Logo.svg'
import './Header.css'

const Header = () => {
    return (
        <div>
           <nav className='header'>
               <img src={logo} alt="" />
               <div>
                   <Link to="/shop">shop</Link>
                   <Link to="/orders">orders</Link>
                   <Link to="/inventory">inventory</Link>
                   <Link to="/about">about</Link>
                   <Link to="/login">Login</Link>
               </div>
           </nav>
        </div>
    );
};

export default Header;