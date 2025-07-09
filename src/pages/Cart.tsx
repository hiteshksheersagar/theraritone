import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ToastContainer';
import { removeFromCart } from '@/lib/user';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Cart = () => {
  const { user, cart, refreshCart, removeFromLocalCart, updateLocalCartQuantity } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: ''
  });

  const updateQuantity = async (itemId: string, newQuantity: number, size?: string) => {
    if (newQuantity <= 0) {
      await removeItem(itemId, size);
      return;
    }

    if (user) {
      // Update in Firebase for authenticated users
      // Implementation would go here for Firebase update
      await refreshCart();
    } else {
      // Update localStorage for guest users
      updateLocalCartQuantity(itemId, newQuantity, size);
    }
  };

  const removeItem = async (itemId: string, size?: string) => {
    if (user) {
      await removeFromCart(user.uid, itemId, size);
      await refreshCart();
    } else {
      removeFromLocalCart(itemId, size);
    }
    
    showToast({
      type: 'success',
      title: 'Item Removed',
      message: 'Item has been removed from your cart.'
    });
  };

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 2000 ? 0 : 200;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handleCheckout = async () => {
    if (!user) {
      showToast({
        type: 'warning',
        title: 'Login Required',
        message: 'Please login to complete your purchase.'
      });
      return;
    }

    setLoading(true);
    // Simulate processing
    setTimeout(() => {
      setLoading(false);
      showToast({
        type: 'success',
        title: 'Order Placed!',
        message: 'Your order has been placed successfully.'
      });
      // Clear cart after successful order
      if (user) {
        refreshCart();
      } else {
        localStorage.removeItem('cart');
        window.location.reload();
      }
    }, 2000);
  };

  const EmptyCart = () => (
    <div className="min-h-screen" style={{ backgroundColor: '#121212' }}>
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Your cart"
        showBackButton={true}
      />
      <div className="pt-16 flex items-center justify-center min-h-[80vh] px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#E0E0E0]/10 border border-[#C0C0C0]/20 flex items-center justify-center">
            <svg className="w-12 h-12 text-[#C0C0C0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-[#FFFFFF] mb-4">Your cart is empty</h2>
          <p className="text-[#C0C0C0] mb-8 text-sm sm:text-base">Add some items to get started shopping</p>
          <Button 
            onClick={() => navigate('/catalog')} 
            className="bg-[#FFD700] text-[#121212] hover:bg-[#B0EEFF] rounded-lg px-8 py-3"
          >
            Continue shopping
          </Button>
        </div>
      </div>
    </div>
  );

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Your cart"
        showBackButton={true}
      />
      
      <div className="pt-16 max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-[#FFFFFF]">Your cart</h1>
          <button
            onClick={() => navigate('/catalog')}
            className="text-[#C0C0C0] hover:text-[#B0EEFF] underline"
          >
            Continue shopping
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[#C0C0C0]/30 text-sm font-medium text-[#C0C0C0] uppercase tracking-wide">
              <div className="col-span-6">PRODUCT</div>
              <div className="col-span-3 text-center">QUANTITY</div>
              <div className="col-span-3 text-right">TOTAL</div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mt-4">
              {cart.map((item) => (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b border-[#C0C0C0]/20"
                >
                  {/* Product Info */}
                  <div className="md:col-span-6 flex items-center space-x-4">
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg border border-[#C0C0C0]/20">
                      <img
                        src={item.imageURL}
                        alt={item.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[#FFFFFF] truncate">{item.name}</h3>
                      {item.size && <p className="text-sm text-[#C0C0C0]">Size: {item.size}</p>}
                      <p className="text-sm text-[#FFFFFF] font-medium">₹{item.price}</p>
                    </div>
                  </div>
                  
                  {/* Quantity Controls - FIXED ICON ALIGNMENT */}
                  <div className="md:col-span-3 flex items-center justify-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[#E0E0E0]/10 rounded-full transition-colors border border-[#C0C0C0]/30"
                    >
                      <Minus size={14} className="text-[#C0C0C0]" />
                    </button>
                    <span className="w-12 text-center text-[#FFFFFF] font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-[#E0E0E0]/10 rounded-full transition-colors border border-[#C0C0C0]/30"
                    >
                      <Plus size={14} className="text-[#C0C0C0]" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="w-8 h-8 flex items-center justify-center text-[#C0C0C0] hover:text-[#FF7E79] transition-colors ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  {/* Total */}
                  <div className="md:col-span-3 flex items-center justify-end">
                    <p className="font-medium text-[#FFFFFF]">
                      ₹{item.quantity * item.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-lg p-6 sticky top-24 border border-[#C0C0C0]/20"
                 style={{ 
                   backgroundColor: 'rgba(224, 224, 224, 0.05)',
                   backdropFilter: 'blur(20px)',
                   boxShadow: '0 8px 32px rgba(176, 238, 255, 0.1)'
                 }}>
              <h2 className="text-lg font-semibold text-[#FFFFFF] mb-6">Estimated total</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#C0C0C0]">Subtotal</span>
                  <span className="font-medium text-[#FFFFFF]">₹{subtotal}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-[#C0C0C0]">Shipping</span>
                  <span className="font-medium text-[#FFFFFF]">
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-[#C0C0C0]">Tax (18%)</span>
                  <span className="font-medium text-[#FFFFFF]">₹{tax}</span>
                </div>
                
                <div className="border-t border-[#C0C0C0]/30 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-[#FFFFFF]">Total</span>
                    <span className="text-lg font-semibold text-[#FFFFFF]">₹{total}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button 
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-[#FFD700] text-[#121212] hover:bg-[#B0EEFF] py-3"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#121212]"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    user ? 'Check out' : 'Login to Checkout'
                  )}
                </Button>
                
                {shipping > 0 && (
                  <p className="text-sm text-[#C0C0C0] text-center">
                    Taxes, discounts and shipping calculated at checkout
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;