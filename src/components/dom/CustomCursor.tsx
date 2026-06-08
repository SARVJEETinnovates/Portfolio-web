import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Hide custom cursor on mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile || isHidden) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[10000]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full bg-primary transition-all duration-150 shadow-[0_0_15px_rgba(204,255,0,0.8)] ${
            isPointer ? 'w-4 h-4' : 'w-2 h-2'
          }`}
        />
      </div>

      {/* Outer inverted ring with gradient and animation */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <style>{`
          @keyframes cursor-pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.15);
              opacity: 1;
            }
          }
          
          @keyframes cursor-spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes cursor-glow {
            0%, 100% {
              filter: drop-shadow(0 0 8px rgba(204, 255, 0, 0.6)) drop-shadow(0 0 16px rgba(204, 255, 0, 0.3));
            }
            50% {
              filter: drop-shadow(0 0 12px rgba(204, 255, 0, 0.8)) drop-shadow(0 0 24px rgba(204, 255, 0, 0.5));
            }
          }
          
          .cursor-ring {
            border: 2px solid;
            border-image: linear-gradient(135deg, rgba(204, 255, 0, 0.9), rgba(204, 255, 0, 0.4)) 1;
            border-radius: 50%;
            position: relative;
            animation: ${isPointer ? 'cursor-pulse 1s ease-in-out infinite' : 'none'};
            filter: invert(1);
            backdrop-filter: invert(100%);
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .cursor-ring::before {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            background: conic-gradient(from 0deg, rgba(204, 255, 0, 0.8), rgba(204, 255, 0, 0.2), rgba(204, 255, 0, 0.8));
            opacity: ${isPointer ? 0.7 : 0.3};
            animation: cursor-spin 3s linear infinite;
            z-index: -1;
            filter: blur(1px);
          }
          
          .cursor-ring::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(204, 255, 0, 0.2), transparent);
            animation: cursor-glow 1.5s ease-in-out infinite;
          }
        `}</style>
        <div
          className="cursor-ring"
          style={{
            width: isPointer ? '56px' : '40px',
            height: isPointer ? '56px' : '40px',
          }}
        />
      </div>

      {/* Additional shimmer layer for depth */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <style>{`
          @keyframes shimmer {
            0%, 100% {
              opacity: 0;
              transform: scale(0.8);
            }
            50% {
              opacity: 0.4;
              transform: scale(1.2);
            }
          }
          
          .cursor-shimmer {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(204, 255, 0, 0.1), transparent);
            animation: shimmer 2s ease-in-out infinite;
            position: absolute;
          }
        `}</style>
        <div
          className="cursor-shimmer"
          style={{
            width: isPointer ? '80px' : '60px',
            height: isPointer ? '80px' : '60px',
            marginLeft: isPointer ? '-40px' : '-30px',
            marginTop: isPointer ? '-40px' : '-30px',
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
