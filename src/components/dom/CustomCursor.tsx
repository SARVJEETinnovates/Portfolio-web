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
      {/* Main cursor dot - CHANGES COLOR INSIDE ON HOVER */}
      <div
        className="fixed pointer-events-none z-[10000]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            isPointer 
              ? 'w-3.5 h-3.5 bg-background border-2 border-primary shadow-[0_0_10px_rgba(204,255,0,0.9)]' 
              : 'w-2 h-2 bg-primary shadow-[0_0_4px_rgba(204,255,0,0.5)]'
          }`}
        />
      </div>

      {/* Outer ring - zooms and inverts on hover */}
      <div
        className="fixed pointer-events-none z-[10000]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full border-2 transition-all duration-300 ease-out ${
            isPointer 
              ? 'w-16 h-16 border-primary scale-130' 
              : 'w-9 h-9 border-primary/50'
          }`}
          style={{
            backgroundColor: isPointer ? 'rgba(204, 255, 0, 0.12)' : 'transparent',
            mixBlendMode: isPointer ? 'lighten' : 'normal',
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
