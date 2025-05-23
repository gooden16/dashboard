import { HTMLAttributes, ReactNode } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../utils';

const badgeVariants = cva('badge', {
  variants: {
    variant: {
      default: 'bg-navy-700 text-cream-300',
      primary: 'bg-gold-400 text-navy-900',
      success: 'badge-success',
      warning: 'badge-warning',
      error: 'badge-error',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface BadgeProps 
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: ReactNode;
}

const Badge = ({ 
  children, 
  className, 
  variant,
  ...props 
}: BadgeProps) => {
  return (
    <span 
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;