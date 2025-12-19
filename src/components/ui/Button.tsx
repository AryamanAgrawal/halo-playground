import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const baseStyles =
      'font-montserrat inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variantStyles = {
      default:
        'bg-black text-white hover:bg-black/90 focus:ring-black dark:bg-white dark:text-black dark:hover:bg-white/90',
      outline:
        'border border-black/20 bg-transparent hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/5',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
