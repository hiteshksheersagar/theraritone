import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Edit, LogOut, ShoppingBag, Clock, Settings, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ToastContainer';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Profile = () => {
  const { user, logout, cart } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    stylePreference: '',
    gender: ''
  });

  const handleSave = () => {
    setIsEditing(false);
    showToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your profile has been updated successfully!'
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      showToast({
        type: 'success',
        title: 'Logged Out',
        message: 'You have been logged out successfully.'
      });
      navigate('/');
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Logout Failed',
        message: 'Failed to logout. Please try again.'
      });
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Profile"
        showBackButton={true}
      />
      
      <div className="pt-20 max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg shadow-sm p-8 border border-[#C0C0C0]/20"
              style={{ 
                backgroundColor: 'rgba(224, 224, 224, 0.05)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(176, 238, 255, 0.1)'
              }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[#E0E0E0]/10 rounded-full flex items-center justify-center border border-[#C0C0C0]/30">
                    {user?.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User size={24} className="text-[#FFFFFF]" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-[#FFFFFF]">{profile.name || 'User Profile'}</h2>
                    <p className="text-[#C0C0C0]">{profile.email}</p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  className="flex items-center space-x-2 border-[#C0C0C0]/30 text-[#FFFFFF] hover:bg-[#E0E0E0]/10 bg-transparent"
                >
                  <Edit size={16} />
                  <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-[rgb(236,223,204)]">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    disabled={!isEditing}
                    className="mt-1 bg-[#121212] border-[#C0C0C0]/30 text-[#FFFFFF] focus:border-[#B0EEFF] focus:ring-[#B0EEFF]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-[#FFFFFF]">Email</Label>
                  <Input
                    id="email"
                    value={profile.email}
                    disabled
                    className="mt-1 bg-[#121212] border-[#C0C0C0]/30 text-[#FFFFFF]"
                  />
                </div>

                <div>
                  <Label htmlFor="stylePreference" className="text-[#FFFFFF]">Style Preference</Label>
                  <select
                    id="stylePreference"
                    value={profile.stylePreference}
                    onChange={(e) => setProfile({...profile, stylePreference: e.target.value})}
                    disabled={!isEditing}
                    className="mt-1 w-full px-3 py-2 border border-[#C0C0C0]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B0EEFF] bg-[#121212] text-[#FFFFFF]"
                  >
                    <option value="">Select Style</option>
                    <option value="Minimalist">Minimalist</option>
                    <option value="Streetwear">Streetwear</option>
                    <option value="Classic">Classic</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="gender" className="text-[#FFFFFF]">Gender</Label>
                  <select
                    id="gender"
                    value={profile.gender}
                    onChange={(e) => setProfile({...profile, gender: e.target.value})}
                    disabled={!isEditing}
                    className="mt-1 w-full px-3 py-2 border border-[#C0C0C0]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B0EEFF] bg-[#121212] text-[#FFFFFF]"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex space-x-4">
                  <Button 
                    onClick={handleSave} 
                    className="bg-[#FFD700] text-[#121212] hover:bg-[#B0EEFF]"
                  >
                    Save Changes
                  </Button>
                  <Button 
                    onClick={() => setIsEditing(false)} 
                    variant="outline" 
                    className="border-[#C0C0C0]/30 text-[#FFFFFF] hover:bg-[#E0E0E0]/10 bg-transparent"
                  >
                    Cancel
                  </Button>
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-[#C0C0C0]/30">
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="flex items-center space-x-2 bg-[#FF7E79] text-[#FFFFFF] hover:bg-[#FF7E79]/80"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions & Cart Overview */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-lg shadow-sm p-6 border border-[#C0C0C0]/20"
              style={{ 
                backgroundColor: 'rgba(224, 224, 224, 0.05)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(176, 238, 255, 0.1)'
              }}
            >
              <h3 className="text-lg font-semibold text-[#FFFFFF] mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/orders')}
                  variant="outline"
                  className="w-full justify-start border-[#C0C0C0]/30 text-[#FFFFFF] hover:bg-[#E0E0E0]/10 bg-transparent"
                >
                  <Clock className="mr-2" size={16} />
                  Order History
                </Button>
                
                <Button
                  onClick={() => navigate('/wishlist')}
                  variant="outline"
                  className="w-full justify-start border-[#C0C0C0]/30 text-[#FFFFFF] hover:bg-[#E0E0E0]/10 bg-transparent"
                >
                  <Heart className="mr-2" size={16} />
                  Saved Collections
                </Button>
                
                <Button
                  onClick={() => navigate('/settings')}
                  variant="outline"
                  className="w-full justify-start border-[#C0C0C0]/30 text-[#FFFFFF] hover:bg-[#E0E0E0]/10 bg-transparent"
                >
                  <Settings className="mr-2" size={16} />
                  Settings
                </Button>
              </div>
            </motion.div>

            {/* Cart Overview */}
            {cart.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-lg shadow-sm p-6 border border-[#C0C0C0]/20"
                style={{ 
                  backgroundColor: 'rgba(224, 224, 224, 0.05)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(176, 238, 255, 0.1)'
                }}
              >
                <h3 className="text-lg font-semibold text-[#FFFFFF] mb-4 flex items-center">
                  <ShoppingBag className="mr-2" size={16} />
                  Cart Overview
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#C0C0C0]">Items:</span>
                    <span className="font-medium text-[#FFFFFF]">{cart.length}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-[#C0C0C0]">Total:</span>
                    <span className="font-medium text-[#FFFFFF]">₹{cartTotal}</span>
                  </div>
                  
                  <Button
                    onClick={() => navigate('/cart')}
                    className="w-full bg-[#FFD700] text-[#121212] hover:bg-[#B0EEFF]"
                  >
                    View Cart
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;