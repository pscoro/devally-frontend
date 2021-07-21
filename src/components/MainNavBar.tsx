import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../util/auth';
// import { isLoggedIn } from '../util/auth';
import './MainNavBar.css'

function MainNavBar() {

    const loginContext = useContext(LoginContext);

    return (
        <header className="header">
            <div className="logo">
                <Link to='/'>
                    <img src="/devally.svg" width="auto" height="100%" alt="logo"/>
                </Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to='/businesses' className='badge'><span className="business-span">Are You A Business?</span></Link>
                    </li>
                    <li>
                        <Link to='/explore'>Explore</Link>
                    </li>
                    {!loginContext.isLoggedIn && <li><Link to='/sign-up'>Sign Up</Link></li>}
                    {!loginContext.isLoggedIn && <li><Link to='/login'>Login</Link></li>}
                    {loginContext.isLoggedIn && <li><Link to='/logout'>Logout</Link></li>}

                    {/* REPLACE WITH LOG IN CHECK*/}
                </ul>
            </nav>
        </header>
    );
}

export default MainNavBar;