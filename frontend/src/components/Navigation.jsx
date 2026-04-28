import React from 'react';
import { NavLink } from 'react-router-dom';
import { Map, Users, BarChart3, ShieldAlert } from 'lucide-react';
import clsx from 'clsx';

function Navigation() {
  const navItems = [
    { to: '/', icon: Map, label: 'Safety Map' },
    { to: '/community', icon: Users, label: 'Community Feed' },
    { to: '/dashboard', icon: BarChart3, label: 'Dashboard' },
  ];

  return (
    <nav className="bg-dark-800 border-t md:border-t-0 md:border-r border-dark-700 w-full md:w-20 lg:w-64 flex md:flex-col fixed bottom-0 md:relative z-50 transition-all">
      <div className="hidden md:flex items-center gap-3 p-6 border-b border-dark-700">
        <div className="bg-primary-500 p-2 rounded-lg">
          <ShieldAlert className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight hidden lg:block text-white">SHEild</span>
      </div>

      <div className="flex md:flex-col w-full md:w-auto md:flex-1 justify-around md:justify-start p-2 md:p-4 gap-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => clsx(
              'flex flex-col md:flex-row items-center gap-1 md:gap-3 p-3 rounded-xl transition-colors w-full',
              isActive ? 'bg-primary-500/10 text-primary-500' : 'text-slate-400 hover:bg-dark-700/50 hover:text-slate-200'
            )}
          >
            <Icon className="w-6 h-6 md:w-5 md:h-5" />
            <span className="text-[10px] md:text-sm font-medium hidden lg:block md:block md:hidden lg:inline">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
