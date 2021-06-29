import React from 'react';
import { Link } from 'react-router-dom';
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
                        <Link to='/pro' className='badge'>Go Pro</Link>
                    </li>
                    <li>
                        <Link to='/explore'>Explore</Link>
                    </li>
                    <li>
                        <Link to='/sign-up'>Sign Up</Link>
                    </li>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavBar;