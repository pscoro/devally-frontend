import React from 'react';

import MainNavBar from '../MainNavBar';

import './MainLayout.css';

type PropsMainLayout = {
    title?: string;
}

const MainLayout: React.FC<PropsMainLayout> = (props) => {
    return (
        <div className="layout">
            <MainNavBar />
            <main className="main">{props.children}</main>
        </div>
    );
};

export default MainLayout;