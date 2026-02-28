import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import '../style/appShell.scss';

const AppShell = () => {
    return (
        <div className="app-shell">
            {/* Desktop and Tablet Sidebar */}
            <div className="shell-sidebar-container">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <main className="shell-main-content">
                <div className="content-wrapper">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="shell-bottom-nav-container">
                <BottomNav />
            </div>
        </div>
    );
};

export default AppShell;
