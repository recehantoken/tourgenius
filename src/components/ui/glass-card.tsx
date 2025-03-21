
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard = ({ 
  children, 
  className, 
  hoverEffect = false, 
  ...props 
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        'glass rounded-lg p-6',
        hoverEffect && 'transition-all duration-300 hover:shadow-xl hover:scale-[1.02]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
