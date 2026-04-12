import React from 'react';

export const SkeletonText = ({ width = '100%', height = '12px', className = '' }: { width?: string, height?: string, className?: string }) => {
  return (
    <div 
      className={`bg-border rounded-[4px] skeleton-pulse ${className}`} 
      style={{ width, height }}
    />
  );
};

export const SkeletonAvatar = ({ size = 40, className = '' }: { size?: number, className?: string }) => {
  return (
    <div 
      className={`bg-border rounded-full skeleton-pulse shrink-0 ${className}`} 
      style={{ width: size, height: size }}
    />
  );
};

export const SkeletonCard = ({ height = '100px', className = '' }: { height?: string, className?: string }) => {
  return (
    <div 
      className={`bg-card2 border-[0.5px] border-border rounded-[16px] skeleton-pulse ${className}`} 
      style={{ width: '100%', height }}
    />
  );
};
