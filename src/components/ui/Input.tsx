import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefix?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, prefix, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="input-label">
            {label}
          </label>
        )}
        <div className="relative">
          {prefix && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-500">
              {prefix}
            </span>
          )}
          <input
            className={cn(
              'input',
              prefix && 'pl-7',
              error && 'border-error-500 focus:border-error-500 focus:ring-error-500',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-error-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;