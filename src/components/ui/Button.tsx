import { ButtonHTMLAttributes, ReactNode } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils';

const buttonVariants = cva('btn', {
  variants: {
    variant: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      outline: 'btn-outline',
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  icon?: ReactNode;
}

const Button = ({ 
  children, 
  className, 
  variant, 
  size, 
  icon,
  ...props 
}: ButtonProps) => {
  return (
    <button 
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;