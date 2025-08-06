import React, { useState, useEffect } from 'react';
import { User, Mail, Key, Trash2, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user, logout, updateUser } = useStore();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    if (!user) {
      navigate('/home');
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, navigate]);

  const handleSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser({ name, email });
    // In a real app, you might show a success toast here.
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      logout();
      navigate('/home');
    }
  };

  const handleAvatarChange = () => {
    // This simulates changing the avatar. In a real app, this would open a file picker.
    const newSeed = Math.random().toString(36).substring(7);
    updateUser({ avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${newSeed}` });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (!user) {
    return null; // Or a loading indicator, as useEffect will redirect.
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Manage Profile</h1>
        <p className="text-muted-foreground mb-8">Update your profile details and manage your account settings.</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Profile Details */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-surface p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-6">Profile Information</h2>
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <img src={user.avatar} alt="User Avatar" className="w-24 h-24 rounded-full bg-primary/20 object-cover" />
              <button onClick={handleAvatarChange} className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{user.name}</h3>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <form onSubmit={handleSaveChanges} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-11 rounded-md border bg-background pl-10 pr-4 text-sm" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-11 rounded-md border bg-background pl-10 pr-4 text-sm" />
              </div>
            </div>
            <button type="submit" className="w-full sm:w-auto bg-primary text-primary-foreground h-11 px-6 rounded-md font-semibold hover:bg-primary/90 transition-colors">
              Save Changes
            </button>
          </form>
        </motion.div>

        {/* Side Cards */}
        <div className="space-y-8">
          <motion.div variants={itemVariants} className="bg-surface p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-6">Change Password</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium mb-1">Current Password</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input type="password" id="current-password" placeholder="••••••••" className="w-full h-11 rounded-md border bg-background pl-10 pr-4 text-sm" />
                </div>
              </div>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium mb-1">New Password</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input type="password" id="new-password" placeholder="••••••••" className="w-full h-11 rounded-md border bg-background pl-10 pr-4 text-sm" />
                </div>
              </div>
              <button type="submit" className="w-full bg-primary/10 text-primary h-11 rounded-md font-semibold hover:bg-primary/20 transition-colors">
                Update Password
              </button>
            </form>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-destructive/10 border border-destructive/30 p-8 rounded-lg">
            <h2 className="text-xl font-bold text-destructive mb-4">Danger Zone</h2>
            <p className="text-destructive/80 text-sm mb-6">
              Deleting your account will permanently remove all your data, including order history and saved items. This action cannot be undone.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="w-full bg-destructive text-destructive-foreground h-11 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-destructive/90 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Delete My Account
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
