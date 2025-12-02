import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  variant?: 'primary' | 'secondary';
  link?: string;
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ 
  variant = 'primary',
  link = "/",
  className = "h-10 w-auto",
  containerClassName = "",
  children
}) => {
  // Simple text-based logo
  const renderContent = () => {
    return (
      <div className="flex items-center">
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          V3BMusic.Ai
        </span>
      </div>
    );
  };

  const content = children || renderContent();

  return (
    <Link 
      to={link} 
      className="inline-block transition-all hover:scale-[1.02] duration-500 ease-out"
    >
      {containerClassName ? (
        <div className={containerClassName}>
          {content}
        </div>
      ) : (
        content
      )}
    </Link>
  );
};

export default BrandLogo;