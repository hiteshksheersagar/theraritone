import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ToastContainer';
import { addToCart } from '@/lib/user';
import Navbar from '@/components/Navbar';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  imageURL: string;
  category: string;
  description: string;
  stock: number;
  tags: string[];
  sizes?: string[];
  colors?: string[];
}

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const navigate = useNavigate();
  const { user, refreshCart, addToLocalCart } = useAuth();
  const { showToast } = useToast();

  // Enhanced mock wishlist data matching the catalog products
  const mockWishlistItems: WishlistItem[] = [
    {
      id: '1',
      name: 'Premium Cotton T-Shirt',
      price: 1999,
      imageURL: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop',
      category: 'Tops',
      description: 'Luxury cotton t-shirt with premium finish and exceptional comfort.',
      stock: 10,
      tags: ['cotton', 'premium', 'casual'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['White', 'Black', 'Navy']
    },
    {
      id: '3',
      name: 'Luxury Hoodie',
      price: 2999,
      imageURL: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=600&fit=crop',
      category: 'Outerwear',
      description: 'Comfortable luxury hoodie for casual wear.',
      stock: 8,
      tags: ['hoodie', 'luxury', 'comfort'],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Grey', 'Black', 'Navy']
    },
    {
      id: '2',
      name: 'Designer Jeans',
      price: 3999,
      imageURL: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop',
      category: 'Bottoms',
      description: 'Premium designer jeans with perfect fit and modern styling.',
      stock: 5,
      tags: ['jeans', 'designer', 'denim'],
      sizes: ['28', '30', '32', '34', '36'],
      colors: ['Blue', 'Black', 'Grey']
    },
    {
      id: '4',
      name: 'Silk Dress',
      price: 5999,
      imageURL: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop',
      category: 'Dresses',
      description: 'Elegant silk dress for special occasions.',
      stock: 0, // Out of stock
      tags: ['silk', 'elegant', 'formal'],
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Black', 'Navy', 'Burgundy']
    }
  ];

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const wishlistIds = JSON.parse(savedWishlist);
      // Filter mock items based on saved IDs
      const items = mockWishlistItems.filter(item => wishlistIds.includes(item.id));
      setWishlistItems(items);
    }
  };

  const removeFromWishlist = (itemId: string) => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updatedWishlist = savedWishlist.filter((id: string) => id !== itemId);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    
    // Dispatch custom event to update navbar count
    window.dispatchEvent(new Event('wishlistUpdated'));
    
    showToast({
      type: 'success',
      title: 'Removed from Wishlist',
      message: 'Item has been removed from your wishlist.'
    });
  };

  const addToCartFromWishlist = async (item: WishlistItem) => {
    if (item.stock === 0) {
      showToast({
        type: 'warning',
        title: 'Out of Stock',
        message: 'This item is currently out of stock.'
      });
      return;
    }

    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      imageURL: item.imageURL
    };

    if (user) {
      try {
        await addToCart(user.uid, cartItem);
        await refreshCart();
      } catch (error) {
        console.error('Error adding to cart:', error);
        showToast({
          type: 'error',
          title: 'Error',
          message: 'Failed to add item to cart. Please try again.'
        });
        return;
      }
    } else {
      // For non-authenticated users, add to localStorage
      addToLocalCart(cartItem);
    }

    showToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${item.name} has been added to your cart!`
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Wishlist"
        showBackButton={true}
      />
      
      <div className="pt-20 max-w-6xl mx-auto px-4 py-8">
        {/* Header - REMOVED "Save items you love to see them here" */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center mb-4"
          >
            <Heart size={32} className="text-red-500 mr-3 fill-current" />
            <h1 className="text-3xl font-light text-[#FFFFFF]">My Wishlist</h1>
          </motion.div>
          <p className="text-[#C0C0C0] max-w-2xl mx-auto">
            {wishlistItems.length > 0 
              ? `You have ${wishlistItems.length} item${wishlistItems.length > 1 ? 's' : ''} in your wishlist`
              : 'Your wishlist is currently empty'
            }
          </p>
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg overflow-hidden shadow-sm border border-[#C0C0C0]/20 group futuristic-card"
                style={{ 
                  backgroundColor: 'rgba(224, 224, 224, 0.05)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(176, 238, 255, 0.1)'
                }}
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={item.imageURL}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Out of Stock Overlay */}
                  {item.stock === 0 && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg bg-black/50 px-4 py-2 rounded-lg">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  {/* Remove Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-4 right-4 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X size={16} />
                  </motion.button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-[#FFFFFF] mb-1 text-sm sm:text-base">{item.name}</h3>
                  <p className="text-xs sm:text-sm text-[#C0C0C0] mb-2">{item.category}</p>
                  <p className="text-base sm:text-lg font-semibold text-[#FFFFFF] mb-3">₹{item.price}</p>
                  
                  {/* Stock Status */}
                  <div className="mb-3">
                    {item.stock > 0 ? (
                      <span className="text-xs text-[#B0EEFF] bg-[#B0EEFF]/20 px-2 py-1 rounded">
                        In Stock ({item.stock} left)
                      </span>
                    ) : (
                      <span className="text-xs text-[#FF7E79] bg-[#FF7E79]/20 px-2 py-1 rounded">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-[#E0E0E0]/10 text-[#C0C0C0] rounded border border-[#C0C0C0]/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Button
                      onClick={() => addToCartFromWishlist(item)}
                      disabled={item.stock === 0}
                      className="w-full bg-[#FFD700] text-[#121212] hover:bg-[#B0EEFF] flex items-center justify-center space-x-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingBag size={16} />
                      <span>{item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                    </Button>
                    
                    <Button
                      onClick={() => removeFromWishlist(item.id)}
                      variant="outline"
                      className="w-full border-[#FF7E79] text-[#FF7E79] hover:bg-[#FF7E79]/20 hover:border-[#FF7E79] flex items-center justify-center space-x-2 rounded-xl"
                    >
                      <Trash2 size={16} />
                      <span>Remove</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#E0E0E0]/10 border border-[#C0C0C0]/20 flex items-center justify-center">
              <Heart size={32} className="text-[#C0C0C0]" />
            </div>
            <h3 className="text-xl font-medium text-[#FFFFFF] mb-2">Your wishlist is empty</h3>
            <p className="text-[#C0C0C0] mb-8 max-w-md mx-auto">
              Start browsing our collection and save items you love by clicking the heart icon on any product.
            </p>
            <Button 
              onClick={() => navigate('/catalog')} 
              className="bg-[#FFD700] text-[#121212] hover:bg-[#B0EEFF] rounded-xl px-8 py-3"
            >
              Browse Collection
            </Button>
          </motion.div>
        )}

        {/* Quick Actions */}
        {wishlistItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => {
                  // Add all in-stock items to cart
                  const inStockItems = wishlistItems.filter(item => item.stock > 0);
                  inStockItems.forEach(item => addToCartFromWishlist(item));
                }}
                disabled={wishlistItems.every(item => item.stock === 0)}
                className="bg-[#FFD700] text-[#121212] hover:bg-[#B0EEFF] rounded-xl px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add All to Cart
              </Button>
              
              <Button
                onClick={() => {
                  // Clear entire wishlist
                  localStorage.removeItem('wishlist');
                  setWishlistItems([]);
                  window.dispatchEvent(new Event('wishlistUpdated'));
                  showToast({
                    type: 'success',
                    title: 'Wishlist Cleared',
                    message: 'All items have been removed from your wishlist.'
                  });
                }}
                variant="outline"
                className="border-[#C0C0C0]/30 text-[#FFFFFF] hover:bg-[#E0E0E0]/10 rounded-xl px-6 py-3"
              >
                Clear Wishlist
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;