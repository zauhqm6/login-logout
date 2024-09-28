import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useEffect } from 'react';


const Navbar = () => {

    const { isLoggedIn, user } = useAuth();
    let didLog = false;


    useEffect(() => {
        if (!didLog) {
            console.log('Navbar isLoggedIn:', isLoggedIn);
            didLog = true;
        }
    }, [isLoggedIn]);


    return (
        <div className="container">
            <div className="row justify-content-between p-4">
                <div className="col-3">
                    <div className="logo">
                        <NavLink to="/">
                            <img className="w-100" src={logo} alt="logo" />
                        </NavLink>
                    </div>
                </div>

                <div className="col-8 d-flex align-items-center justify-content-end">
                    <ul style={{ listStyleType: 'none', margin: "0 !important" }} className="main-menu d-flex gap-5">
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/service">Service</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>

                        {isLoggedIn ? (
                            <li>
                                <NavLink to="/logout">Logout</NavLink>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/register">Register</NavLink>
                                </li>
                            </>
                        )}
                        {user?.isAdmin && (
                            <li>
                                <NavLink to="/admin">Admin Panel</NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
