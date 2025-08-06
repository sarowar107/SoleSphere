import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Footprints, Search, ShoppingBag, Heart, Sun, Moon, X, Menu, User, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTheme } from '../hooks/useTheme';
import { cn } from '../lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import ProfileDropdown from './ProfileDropdown';

const Header: React.FC = () => {
  const { cart, wishlist, isAuthenticated, user, logout, openAuthModal } = useStore();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement search logic or navigation
  };

  const navLinks = [
    { href: '/home', label: 'Home' },
    { href: '/products', label: 'All Products' },
    { href: '/new-arrivals', label: 'New Arrivals' },
    { href: '/best-sellers', label: 'Best Sellers' },
  ];

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-300',
          isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border' : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between gap-4">
            {/* Left Side: Logo & Nav */}
            <div className="flex items-center gap-8">
              <Link to="/home" className="flex items-center gap-2 shrink-0">
                <motion.div whileHover={{ rotate: [0, 20, -15, 10, 0], scale: 1.15 }} transition={{ duration: 0.5 }}>
                  <Footprints className="h-8 w-8 text-primary" />
                </motion.div>
                <span className="text-2xl font-bold text-foreground hidden sm:inline">SoleSphere</span>
              </Link>
              <nav className="hidden lg:flex items-center gap-6">
                {navLinks.map(link => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    className={({ isActive }) =>
                      cn(
                        "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                        isActive && "text-primary"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Right Side: Actions */}
            <div className="flex items-center justify-end gap-2 sm:gap-3">
              <form onSubmit={handleSearch} className="hidden md:block relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="h-10 w-full max-w-xs rounded-md border bg-muted pl-4 pr-10 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Search className="h-5 w-5" />
                </button>
              </form>
              
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted shrink-0">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-muted shrink-0">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative p-2 rounded-full hover:bg-muted shrink-0">
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <ProfileDropdown />
              ) : (
                <button onClick={openAuthModal} className="p-2 rounded-full hover:bg-muted shrink-0 hidden sm:inline-flex">
                  <User className="h-5 w-5" />
                </button>
              )}
              
              <button
                className="lg:hidden p-2 rounded-full hover:bg-muted shrink-0"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-background p-6 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <Link to="/home" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Footprints className="h-7 w-7 text-primary" />
                  <span className="text-xl font-bold">SoleSphere</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-6 flex-grow">
                {navLinks.map(link => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "text-lg font-medium text-muted-foreground transition-colors hover:text-primary",
                        isActive && "text-primary"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
              <div className="mt-auto border-t border-border pt-6">
                {isAuthenticated && user ? (
                  <div className="flex flex-col gap-4">
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                      <span>Manage Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 text-lg font-medium text-red-400 hover:text-red-500"
                    >
                      <LogOut className="h-6 w-6" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      openAuthModal();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-primary text-primary-foreground h-12 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    Login / Sign Up
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
