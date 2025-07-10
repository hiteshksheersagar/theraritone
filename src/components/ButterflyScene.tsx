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
            width: '110vw',
            height: '75vh',
            opacity: 0.6,
            filter: 'drop-shadow(0 0 40px rgba(176, 238, 255, 0.3))',
            mixBlendMode: 'lighten'
          }}
          animate={{ 
            scale: [1, 1.03, 1],
            y: [0, -8, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut"
          }}
        >
          {/* Futuristic Moth/Butterfly SVG with Updated Color Palette */}
          <svg
            viewBox="0 0 1400 800"
            className="w-full h-full"
            style={{ filter: 'brightness(1.2) contrast(1.1)' }}
          >
            {/* Butterfly Body - Thick, Realistic Body with Neon Glow */}
            <motion.ellipse
              cx="700"
              cy="400"
              rx="12"
              ry="160"
              fill="rgba(176, 238, 255, 0.8)"
              style={{ 
                filter: 'drop-shadow(0 0 15px rgba(176, 238, 255, 0.8))',
                transformOrigin: '700px 400px'
              }}
            />
            
            {/* Body Segments with Neon Accents */}
            <ellipse cx="700" cy="340" rx="8" ry="15" fill="rgba(255, 215, 0, 0.6)" />
            <ellipse cx="700" cy="380" rx="10" ry="20" fill="rgba(176, 238, 255, 0.7)" />
            <ellipse cx="700" cy="420" rx="9" ry="18" fill="rgba(255, 215, 0, 0.6)" />
            <ellipse cx="700" cy="460" rx="7" ry="15" fill="rgba(176, 238, 255, 0.5)" />
            
            {/* LEFT UPPER WING - Large, Translucent with Holographic Effect */}
            <motion.path
              d="M700 300 Q500 150 250 200 Q100 250 120 350 Q140 450 250 500 Q400 530 550 470 Q650 430 700 370"
              fill="rgba(176, 238, 255, 0.3)"
              stroke="rgba(255, 215, 0, 0.6)"
              strokeWidth="1"
              style={{ 
                filter: 'drop-shadow(0 0 25px rgba(176, 238, 255, 0.4))',
                transformOrigin: '700px 300px'
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
              d="M700 300 Q900 150 1150 200 Q1300 250 1280 350 Q1260 450 1150 500 Q1000 530 850 470 Q750 430 700 370"
              fill="rgba(176, 238, 255, 0.3)"
              stroke="rgba(255, 215, 0, 0.6)"
              strokeWidth="1"
              style={{ 
                filter: 'drop-shadow(0 0 25px rgba(176, 238, 255, 0.4))',
                transformOrigin: '700px 300px'
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
              d="M700 400 Q550 500 400 550 Q300 600 280 670 Q290 730 350 720 Q420 700 500 650 Q600 600 700 530"
              fill="rgba(255, 126, 121, 0.25)"
              stroke="rgba(184, 143, 255, 0.5)"
              strokeWidth="1"
              style={{ 
                filter: 'drop-shadow(0 0 20px rgba(255, 126, 121, 0.3))',
                transformOrigin: '700px 400px'
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
              d="M700 400 Q850 500 1000 550 Q1100 600 1120 670 Q1110 730 1050 720 Q980 700 900 650 Q800 600 700 530"
              fill="rgba(255, 126, 121, 0.25)"
              stroke="rgba(184, 143, 255, 0.5)"
              strokeWidth="1"
              style={{ 
                filter: 'drop-shadow(0 0 20px rgba(255, 126, 121, 0.3))',
                transformOrigin: '700px 400px'
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
              d="M700 300 Q600 250 500 270 Q400 290 350 330"
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
              d="M650 330 Q550 310 450 330 Q350 350 300 390"
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
              d="M700 300 Q800 250 900 270 Q1000 290 1050 330"
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
              d="M750 330 Q850 310 950 330 Q1050 350 1100 390"
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
              cx="450" cy="330" rx="20" ry="15"
              fill="rgba(184, 143, 255, 0.3)"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "easeInOut"
              }}
            />
            <motion.ellipse
              cx="950" cy="330" rx="20" ry="15"
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
              d="M250 200 Q200 230 180 270 Q190 300 220 330"
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
              d="M1150 200 Q1200 230 1220 270 Q1210 300 1180 330"
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
              d="M690 270 Q680 250 670 230 Q665 220 660 210"
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
              d="M710 270 Q720 250 730 230 Q735 220 740 210"
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
            <circle cx="660" cy="210" r="3" fill="rgba(255, 215, 0, 0.9)" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.8))' }} />
            <circle cx="740" cy="210" r="3" fill="rgba(255, 215, 0, 0.9)" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.8))' }} />

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
              cx="450" cy="350" rx="150" ry="100"
              fill="url(#wingGradient)"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut"
              }}
            />
            <motion.ellipse
              cx="950" cy="350" rx="150" ry="100"
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