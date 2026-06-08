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
      {/* Main cursor dot with enhanced visibility */}
      <div
        className="fixed pointer-events-none z-[10000]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full bg-primary shadow-[0_0_8px_rgba(204,255,0,0.8)] transition-all duration-150 ${
            isPointer ? 'w-3 h-3 shadow-[0_0_12px_rgba(204,255,0,1)]' : 'w-2 h-2'
          }`}
        />
      </div>

      {/* Outer ring with invert effect and zoom */}
      <div
        className="fixed pointer-events-none z-[10000]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full backdrop-blur-sm transition-all duration-300 ease-out border-2 ${
            isPointer 
              ? 'w-16 h-16 border-primary/80 bg-primary/10 shadow-[0_0_20px_rgba(204,255,0,0.6),inset_0_0_20px_rgba(204,255,0,0.2)] scale-110' 
              : 'w-10 h-10 border-primary/60 bg-primary/5 shadow-[0_0_15px_rgba(204,255,0,0.4)]'
          }`}
          style={{
            mixBlendMode: isPointer ? 'screen' : 'normal',
          }}
        />
      </div>

      {/* Inner accent ring for pointer state */}
      {isPointer && (
        <div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="rounded-full border border-primary/40 animate-pulse"
            style={{
              width: '24px',
              height: '24px',
              boxShadow: '0 0 10px rgba(204, 255, 0, 0.3) inset',
            }}
          />
        </div>
      )}
    </>
  );
};

export default CustomCursor;
