import Spline from '@splinetool/react-spline';
import { Suspense, useRef, useState } from 'react';

const SplineLoadingFallback = () => (
  <div className="w-full h-full bg-gradient-to-br from-muted/10 to-muted/5 flex items-center justify-center">
    <div className="animate-pulse text-muted-foreground">Loading 3D Animation...</div>
  </div>
);

interface SplineAnimationProps {
  scene: string; // Spline scene URL
  className?: string;
}

export const SplineAnimation = ({ scene, className = 'w-full h-full' }: SplineAnimationProps) => {
  const splineRef = useRef<any>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (splineRef.current && isInteractive) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      // Trigger interaction on the spline scene if available
      if (splineRef.current?.emitEvent) {
        splineRef.current.emitEvent('mousemove', { x, y });
      }
    }
  };

  const handleMouseDown = () => {
    setIsInteractive(true);
  };

  const handleMouseUp = () => {
    setIsInteractive(false);
  };

  return (
    <Suspense fallback={<SplineLoadingFallback />}>
      <div
        ref={splineRef}
        className={`${className} cursor-grab active:cursor-grabbing transition-all duration-300 hover:shadow-lg`}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        role="img"
        aria-label="Interactive 3D animation"
      >
        <Spline scene={scene} />
      </div>
    </Suspense>
  );
};

export default SplineAnimation;
