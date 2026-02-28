import React from 'react';
import { useLocation } from 'react-router';
import { NavItem } from './NavItem';
import { Home, Search, PlusSquare, PlaySquare, User } from 'lucide-react';
import '../style/appShell.scss';

const BottomNav = () => {
    const location = useLocation();

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
        <nav className="bottom-nav">
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
    );
};

export default BottomNav;
