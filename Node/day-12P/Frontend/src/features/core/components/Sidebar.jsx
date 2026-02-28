import React from 'react';
import { useLocation } from 'react-router';
import { NavItem } from './NavItem';
import { Home, Search, PlusSquare, PlaySquare, User } from 'lucide-react';
import '../style/appShell.scss';

const Sidebar = () => {
    const location = useLocation();

    // Check paths to determine active state.
    const isActive = (path) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    }

    const navLinks = [
        { icon: <Home size={28} />, label: 'Home', to: '/' },
        { icon: <Search size={28} />, label: 'Search', to: '/search' },
        { icon: <PlusSquare size={28} />, label: 'Create', to: '/create-post' },
        { icon: <PlaySquare size={28} />, label: 'Reels', to: '/reels' },
        { icon: <User size={28} />, label: 'Profile', to: '/profile' }
    ];

    return (
        <aside className="app-sidebar">
            <div className="sidebar-header">
                {/* Placeholder Logo */}
                <h1 className="app-logo">Connect</h1>
            </div>

            <nav className="sidebar-nav">
                {navLinks.map((link) => (
                    <NavItem
                        key={link.to}
                        icon={link.icon}
                        label={link.label}
                        to={link.to}
                        active={isActive(link.to)}
                    />
                ))}
            </nav>

            <div className="sidebar-footer">
                <NavItem
                    icon={<div className="avatar-placeholder"></div>}
                    label="More"
                    to="/more"
                    active={false}
                />
            </div>
        </aside>
    );
};

export default Sidebar;
