import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { X, Footprints } from 'lucide-react';

const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login } = useStore();
  const [isLoginView, setIsLoginView] = useState(true);

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string || 'Alex Rider';
    const email = formData.get('email') as string;
    
    // In a real app, you'd get user data from your auth provider
    login({
      name: name,
      email: email,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${name.split(' ')[0]}`,
    });
    closeAuthModal();
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-secondary w-full max-w-md rounded-2xl p-8 relative"
          >
            <button onClick={closeAuthModal} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X />
            </button>
            
            <div className="text-center mb-6">
              <Footprints className="h-10 w-10 text-primary mx-auto mb-2" />
              <h2 className="text-2xl font-bold text-foreground">
                {isLoginView ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {isLoginView ? 'Sign in to continue your journey.' : 'Join SoleSphere to start shopping.'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              {!isLoginView && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full h-12 rounded-md border bg-background px-4 text-sm"
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full h-12 rounded-md border bg-background px-4 text-sm"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full h-12 rounded-md border bg-background px-4 text-sm"
                required
              />
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground h-12 rounded-md font-semibold text-base flex items-center justify-center hover:bg-primary/90 transition"
              >
                {isLoginView ? 'Log In' : 'Create Account'}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                {isLoginView ? "Don't have an account?" : "Already have an account?"}{' '}
                <button onClick={() => setIsLoginView(!isLoginView)} className="font-semibold text-primary hover:underline">
                  {isLoginView ? 'Sign Up' : 'Log In'}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
