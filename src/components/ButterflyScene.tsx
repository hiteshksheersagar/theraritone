import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ButterflyScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        const parallaxSpeed = 0.1;
        containerRef.current.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    >
      {/* Main Butterfly - Positioned Higher for Better Visibility */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: 'translateY(-8vh)' }} // Moved up for better visibility
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <motion.div
          className="relative"
          style={{
            width: '120vw',
            height: '80vh',
            opacity: 0.6,
            filter: 'drop-shadow(0 0 40px rgba(176, 238, 255, 0.3))',
            mixBlendMode: 'lighten'
          }}
          animate={{ 
            scale: [1, 1.03, 1],
            y: [0, -12, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut"
          }}
        >
          {/* Futuristic Moth/Butterfly SVG with Updated Color Palette */}
          <svg
            viewBox="0 0 1400 900"
            className="w-full h-full"
            style={{ filter: 'brightness(1.2) contrast(1.1)' }}
          >
            {/* Butterfly Body - Thick, Realistic Body with Neon Glow */}
            <motion.ellipse
              cx="700"
              cy="450"
              rx="12"
              ry="180"
              fill="rgba(176, 238, 255, 0.8)"
              style={{ 
                filter: 'drop-shadow(0 0 15px rgba(176, 238, 255, 0.8))',
                transformOrigin: '700px 450px'
              }}
            />
            
            {/* Body Segments with Neon Accents */}
            <ellipse cx="700" cy="380" rx="8" ry="15" fill="rgba(255, 215, 0, 0.6)" />
            <ellipse cx="700" cy="420" rx="10" ry="20" fill="rgba(176, 238, 255, 0.7)" />
            <ellipse cx="700" cy="480" rx="9" ry="18" fill="rgba(255, 215, 0, 0.6)" />
            <ellipse cx="700" cy="520" rx="7" ry="15" fill="rgba(176, 238, 255, 0.5)" />
            
            {/* LEFT UPPER WING - Large, Translucent with Holographic Effect */}
            <motion.path
              d="M700 350 Q500 200 250 250 Q100 300 120 400 Q140 500 250 550 Q400 580 550 520 Q650 480 700 420"
              fill="rgba(176, 238, 255, 0.3)"
              stroke="rgba(255, 215, 0, 0.6)"
              strokeWidth="1"
              style={{ 
                filter: 'drop-shadow(0 0 25px rgba(176, 238, 255, 0.4))',
                transformOrigin: '700px 350px'
              }}
              animate={{
                rotateZ: [0, -2, 0],
                scaleY: [1, 1.04, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
                delay: 0
              }}
            />
            
            {/* RIGHT UPPER WING - Large, Translucent with Holographic Effect */}
            <motion.path
              d="M700 350 Q900 200 1150 250 Q1300 300 1280 400 Q1260 500 1150 550 Q1000 580 850 520 Q750 480 700 420"
              fill="rgba(176, 238, 255, 0.3)"
              stroke="rgba(255, 215, 0, 0.6)"
              strokeWidth="1"
              style={{ 
                filter: 'drop-shadow(0 0 25px rgba(176, 238, 255, 0.4))',
                transformOrigin: '700px 350px'
              }}
              animate={{
                rotateZ: [0, 2, 0],
                scaleY: [1, 1.04, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
                delay: 0
              }}
            />
            
            {/* LEFT LOWER WING - Distinctive Tail Shape with Neon Coral */}
            <motion.path
              d="M700 450 Q550 550 400 600 Q300 650 280 720 Q290 780 350 770 Q420 750 500 700 Q600 650 700 580"
              fill="rgba(255, 126, 121, 0.25)"
              stroke="rgba(184, 143, 255, 0.5)"
              strokeWidth="1"
              style={{ 
                filter: 'drop-shadow(0 0 20px rgba(255, 126, 121, 0.3))',
                transformOrigin: '700px 450px'
              }}
              animate={{
                rotateZ: [0, -1.5, 0],
                scaleY: [1, 1.02, 1],
                opacity: [0.25, 0.4, 0.25]
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            {/* RIGHT LOWER WING - Distinctive Tail Shape with Neon Coral */}
            <motion.path
              d="M700 450 Q850 550 1000 600 Q1100 650 1120 720 Q1110 780 1050 770 Q980 750 900 700 Q800 650 700 580"
              fill="rgba(255, 126, 121, 0.25)"
              stroke="rgba(184, 143, 255, 0.5)"
              strokeWidth="1"
              style={{ 
                filter: 'drop-shadow(0 0 20px rgba(255, 126, 121, 0.3))',
                transformOrigin: '700px 450px'
              }}
              animate={{
                rotateZ: [0, 1.5, 0],
                scaleY: [1, 1.02, 1],
                opacity: [0.25, 0.4, 0.25]
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
                delay: 1
              }}
            />

            {/* Wing Vein Patterns - Left Upper Wing with Neon Effects */}
            <motion.path
              d="M700 350 Q600 300 500 320 Q400 340 350 380"
              stroke="rgba(176, 238, 255, 0.6)"
              strokeWidth="0.5"
              fill="none"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M650 380 Q550 360 450 380 Q350 400 300 440"
              stroke="rgba(255, 215, 0, 0.5)"
              strokeWidth="0.5"
              fill="none"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "easeInOut",
                delay: 2
              }}
            />

            {/* Wing Vein Patterns - Right Upper Wing with Neon Effects */}
            <motion.path
              d="M700 350 Q800 300 900 320 Q1000 340 1050 380"
              stroke="rgba(176, 238, 255, 0.6)"
              strokeWidth="0.5"
              fill="none"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.path
              d="M750 380 Q850 360 950 380 Q1050 400 1100 440"
              stroke="rgba(255, 215, 0, 0.5)"
              strokeWidth="0.5"
              fill="none"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: "easeInOut",
                delay: 3
              }}
            />

            {/* Wing Spots/Patterns - Holographic */}
            <motion.ellipse
              cx="450" cy="380" rx="20" ry="15"
              fill="rgba(184, 143, 255, 0.3)"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut"
              }}
            />
            <motion.ellipse
              cx="950" cy="380" rx="20" ry="15"
              fill="rgba(184, 143, 255, 0.3)"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut",
                delay: 2
              }}
            />

            {/* Wing Edge Details - Feathered Appearance with Neon */}
            <motion.path
              d="M250 250 Q200 280 180 320 Q190 350 220 380"
              stroke="rgba(255, 126, 121, 0.4)"
              strokeWidth="1"
              fill="none"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 15,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M1150 250 Q1200 280 1220 320 Q1210 350 1180 380"
              stroke="rgba(255, 126, 121, 0.4)"
              strokeWidth="1"
              fill="none"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                repeat: Infinity,
                duration: 15,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            {/* Antennae - Delicate and Realistic with Neon Glow */}
            <motion.path
              d="M690 320 Q680 300 670 280 Q665 270 660 260"
              stroke="rgba(176, 238, 255, 0.9)"
              strokeWidth="2"
              fill="none"
              animate={{ rotate: [0, 2, 0] }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M710 320 Q720 300 730 280 Q735 270 740 260"
              stroke="rgba(176, 238, 255, 0.9)"
              strokeWidth="2"
              fill="none"
              animate={{ rotate: [0, -2, 0] }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
              }}
            />
            
            {/* Antennae Tips with Neon Glow */}
            <circle cx="660" cy="260" r="3" fill="rgba(255, 215, 0, 0.9)" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.8))' }} />
            <circle cx="740" cy="260" r="3" fill="rgba(255, 215, 0, 0.9)" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.8))' }} />

            {/* Wing Transparency Gradients */}
            <defs>
              <radialGradient id="wingGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(176, 238, 255, 0.4)" />
                <stop offset="70%" stopColor="rgba(255, 215, 0, 0.2)" />
                <stop offset="100%" stopColor="rgba(184, 143, 255, 0.1)" />
              </radialGradient>
            </defs>

            {/* Overlay Transparency Effects */}
            <motion.ellipse
              cx="450" cy="400" rx="150" ry="100"
              fill="url(#wingGradient)"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut"
              }}
            />
            <motion.ellipse
              cx="950" cy="400" rx="150" ry="100"
              fill="url(#wingGradient)"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Holographic Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${25 + (i * 8)}%`,
              top: `${25 + (i * 6)}%`,
              background: i % 2 === 0 ? 'rgba(176, 238, 255, 0.6)' : 'rgba(255, 215, 0, 0.6)',
              filter: 'blur(0.5px)',
              boxShadow: i % 2 === 0 
                ? '0 0 8px rgba(176, 238, 255, 0.8)' 
                : '0 0 8px rgba(255, 215, 0, 0.8)'
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              repeat: Infinity,
              duration: 6 + (i * 0.5),
              ease: "easeInOut",
              delay: i * 0.4
            }}
          />
        ))}
      </div>

      {/* Ethereal Background Glow with Neon Colors */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 35%, rgba(176, 238, 255, 0.08) 0%, rgba(255, 215, 0, 0.04) 40%, transparent 60%)',
          mixBlendMode: 'lighten'
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.05, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default ButterflyScene;