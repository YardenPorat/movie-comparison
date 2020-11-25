import logo from '../logo.svg';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NavBar = ({ mainLink, links }) => {
    const [auth, setAuth] = useState({ isLoggedIn: null });

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await axios.get('/auth/current_user');
            if (res.data.googleId) {
                setAuth({ ...res.data, isLoggedIn: true });
            } else {
                setAuth({ ...res.data, isLoggedIn: false });
            }
        } catch (err) {
            console.log(err);
        }
    };

    const renderAuth = () => {
        switch (auth.isLoggedIn) {
            case null:
                return;
            case false:
                return (
                    <a className='nav-link' href='/auth/google'>
                        Login With Google
                    </a>
                );
            default:
                return (
                    <a className='nav-link' href='/auth/logout'>
                        Logout
                    </a>
                );
        }
    };

    return (
        <nav className='navbar navbar-expand-sm navbar-light bg-light'>
            <a href='/' className='navbar-brand'>
                <img src={logo} alt='logo' width='30' height='30' />
            </a>
            <Link to={mainLink.to} className='navbar-brand'>
                {mainLink.text}
            </Link>
            <div className='collpase navbar-collapse'>
                <ul className='navbar-nav mr-auto'>
                    {links.map((link, i) => (
                        <li className='navbar-item' key={i}>
                            <Link to={link.to} className='nav-link'>
                                {link.text}
                            </Link>
                        </li>
                    ))}
                </ul>
                <ul className='navbar-nav ml-auto'>
                    <li className='navbar-item ml-auto'>{renderAuth()}</li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
