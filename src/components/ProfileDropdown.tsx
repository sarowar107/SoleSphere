import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { AnimatePresence, motion } from 'framer-motion';
import { User, LogOut } from 'lucide-react';

const ProfileDropdown: React.FC = () => {
  const { user, logout } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/home');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="rounded-full h-8 w-8 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
        <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-surface shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="py-1">
              <div className="px-4 py-2 border-b border-border">
                <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground w-full"
              >
                <User className="h-4 w-4" />
                <span>Manage Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-muted hover:text-red-400 w-full"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
