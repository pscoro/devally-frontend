import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MainNavBar.css'

function MainNavBar() {

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
                    {useLocation().pathname !== "/dashboard" && <li><Link to='/sign-up'>Sign Up</Link></li>}
                    {useLocation().pathname !== "/dashboard" && <li><Link to='/login'>Login</Link></li>}
                    {/* REPLACE WITH LOG IN CHECK*/}
                </ul>
            </nav>
        </header>
    );
}

export default MainNavBar;