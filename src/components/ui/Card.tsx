import { HTMLAttributes, ReactNode } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../utils';

const cardVariants = cva('card', {
  variants: {
    variant: {
      default: 'bg-navy-800',
      darker: 'bg-navy-900',
      lighter: 'bg-navy-700',
    },
    hover: {
      true: 'card-hover',
    },
  },
  defaultVariants: {
    variant: 'default',
    hover: false,
  },
});

interface CardProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: ReactNode;
}

const Card = ({ 
  children, 
  className, 
  variant, 
  hover,
  ...props 
}: CardProps) => {
  return (
    <div 
      className={cn(cardVariants({ variant, hover }), className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;