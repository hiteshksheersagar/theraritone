import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, Users, Star, ChevronDown, Play, ShoppingBag, Heart, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ToastContainer';
import Navbar from '@/components/Navbar';
import ButterflyScene from '@/components/ButterflyScene';
import SearchOverlay from '@/components/SearchOverlay';
import ChatWidget from '@/components/ChatWidget';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Enhanced testimonials with more realistic data
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Fashion Enthusiast",
      content: "RARITONE's AI body scan is incredible! I finally found clothes that fit perfectly. No more returns!",
      rating: 5,
      location: "Mumbai"
    },
    {
      name: "Arjun Patel",
      role: "Tech Professional",
      content: "The virtual try-on feature saved me so much time. The recommendations are spot-on every time.",
      rating: 5,
      location: "Bangalore"
    },
    {
      name: "Sneha Reddy",
      role: "Designer",
      content: "As someone in fashion, I'm impressed by their AI technology. The fit predictions are remarkably accurate.",
      rating: 5,
      location: "Hyderabad"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/catalog');
    } else {
      showToast({
        type: 'info',
        title: 'Welcome to RARITONE',
        message: 'Please sign up to start your personalized fashion journey!'
      });
    }
  };

  const handleTryBodyScan = () => {
    if (user) {
      navigate('/scan');
    } else {
      showToast({
        type: 'info',
        title: 'Body Scan Feature',
        message: 'Please sign up to access our AI body scanning technology!'
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced gradient background with more visual appeal */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #1e3a8a 100%)
          `
        }}
      />

      {/* Animated background particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <Navbar 
        onSearchOpen={() => setIsSearchOpen(true)}
        onCartOpen={() => navigate('/cart')}
      />

      {/* HERO SECTION with Butterfly Scene */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Butterfly Scene Background */}
        <div className="absolute inset-0 z-10">
          <ButterflyScene />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
          {/* Logo positioned lower to show butterfly head */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-8 mt-20"
          >
            <img
              src="/IMG-20250305-WA0003-removebg-preview.png"
              alt="RARITONE"
              className="mx-auto h-24 sm:h-32 lg:h-40 w-auto object-contain filter brightness-110 contrast-110"
              style={{
                filter: 'brightness(1.2) contrast(1.1) drop-shadow(0 4px 20px rgba(176, 238, 255, 0.4))',
                maxWidth: '90vw'
              }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-light mb-6 text-white leading-tight"
            style={{
              textShadow: '0 0 30px rgba(176, 238, 255, 0.5)',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            Fashion Meets
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technology
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Experience perfect-fit fashion with our AI body scanning technology. 
            Discover your style with personalized recommendations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ShoppingBag className="mr-2" size={20} />
              Start Shopping
            </Button>
            
            <Button
              onClick={handleTryBodyScan}
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 backdrop-blur-sm"
            >
              <Zap className="mr-2" size={20} />
              Try Body Scan
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={() => scrollToSection('features')}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-white/70 hover:text-white transition-colors"
            >
              <span className="text-sm mb-2">Discover More</span>
              <ChevronDown size={24} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="relative z-30 py-20 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
              Revolutionary Fashion Technology
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how AI transforms your shopping experience with precision and personalization
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "AI Body Scanning",
                description: "Get accurate measurements using your device camera for perfect-fit recommendations",
                color: "from-blue-400 to-cyan-400"
              },
              {
                icon: Sparkles,
                title: "Virtual Try-On",
                description: "See how clothes look on you before buying with our advanced AR technology",
                color: "from-purple-400 to-pink-400"
              },
              {
                icon: Shield,
                title: "Privacy First",
                description: "Your body scan data is processed locally and never stored on our servers",
                color: "from-green-400 to-emerald-400"
              },
              {
                icon: Users,
                title: "Style Recommendations",
                description: "Personalized fashion suggestions based on your preferences and body type",
                color: "from-orange-400 to-red-400"
              },
              {
                icon: Star,
                title: "Premium Quality",
                description: "Curated collection of high-quality fashion items from trusted brands",
                color: "from-yellow-400 to-orange-400"
              },
              {
                icon: Heart,
                title: "Perfect Fit Guarantee",
                description: "Free size exchanges if our AI recommendations don't fit perfectly",
                color: "from-pink-400 to-rose-400"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="relative z-30 py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get started with RARITONE in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Scan Your Body",
                description: "Use your device camera to capture accurate body measurements in seconds",
                image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop"
              },
              {
                step: "02", 
                title: "Get Recommendations",
                description: "Our AI analyzes your measurements and suggests perfectly fitting clothes",
                image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
              },
              {
                step: "03",
                title: "Shop with Confidence",
                description: "Purchase knowing every item will fit perfectly, or get free exchanges",
                image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative mb-8">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-64 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="relative z-30 py-20 bg-gradient-to-b from-black/30 to-black/50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of satisfied customers who found their perfect fit
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 text-center"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={24} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed italic">
                  "{testimonials[currentTestimonial].content}"
                </p>
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-gray-400">
                    {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative z-30 py-20 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6">
              Ready to Transform Your Wardrobe?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join the future of fashion with AI-powered perfect fit technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <ArrowRight className="mr-2" size={20} />
                Get Started Now
              </Button>
              
              <Button
                onClick={() => navigate('/catalog')}
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 backdrop-blur-sm"
              >
                <Search className="mr-2" size={20} />
                Browse Collection
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;