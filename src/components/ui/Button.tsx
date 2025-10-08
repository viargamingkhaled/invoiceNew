'use client';

import { motion } from 'framer-motion';
import { ReactNode, MouseEvent } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  disabled?: boolean;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
}

function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  onClick,
  href,
  disabled = false,
  title,
  type = 'button'
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200';
  
  const variantClasses = {
    // Primary (teal brand)
    primary: {
      default: 'bg-[#0F766E] hover:bg-[#0C5F59] active:bg-[#0A4F4B] text-white border border-[#0C5F59] focus:ring-[#14B8A6]',
      disabled: 'bg-[#A7B0B6] text-[#F8FAFC] border-transparent cursor-not-allowed'
    },
    // Secondary (accent mint)
    secondary: {
      default: 'bg-[#14B8A6] hover:bg-[#0F9F90] active:bg-[#0B877A] text-white border border-[#0F9F90] focus:ring-[#0F766E]',
      disabled: 'bg-[#B8E3DD] text-white/60 cursor-not-allowed'
    },
    // Ghost (text button on surface)
    ghost: {
      default: 'text-[#0B1221] hover:bg-[#EAEDEF] active:bg-[#DDE2E6] focus:ring-[#14B8A6]',
      disabled: 'text-[#9AA3AA] bg-transparent cursor-not-allowed'
    },
    // Outline (stroke on surface)
    outline: {
      default: 'bg-transparent border border-[#14B8A6] hover:bg-[#E6F6F3] active:bg-[#D6F0EC] text-[#0F766E] focus:ring-[#14B8A6]',
      disabled: 'border-[#CCD5DA] text-[#9AA3AA] cursor-not-allowed'
    },
    // Success
    success: {
      default: 'bg-[#22C55E] hover:bg-[#1FAA55] active:bg-[#1A944B] text-[#0B1221] focus:ring-[#86EFAC]',
      disabled: 'bg-[#A7B0B6] text-[#F8FAFC] cursor-not-allowed'
    },
    // Danger (destructive)
    danger: {
      default: 'bg-[#DC2626] hover:bg-[#B91C1C] active:bg-[#991B1B] text-white focus:ring-[#FCA5A5]',
      disabled: 'bg-[#A7B0B6] text-[#F8FAFC] cursor-not-allowed'
    }
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-xl',
    md: 'px-4 py-2 text-sm rounded-xl',
    lg: 'px-5 py-3 text-base rounded-xl'
  };

  const variantClass = disabled 
    ? variantClasses[variant].disabled 
    : variantClasses[variant].default;
  
  const classes = `${baseClasses} ${variantClass} ${sizeClasses[size]} ${className}`;

  const buttonContent = (
    <motion.button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      title={title}
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.button>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        title={title}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {children}
      </motion.a>
    );
  }

  return buttonContent;
}

export { Button };
export default Button;
