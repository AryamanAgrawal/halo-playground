import { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`font-montserrat rounded-lg border border-black/20 bg-white px-3 py-2 text-sm text-black focus:border-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/20 dark:bg-neutral-800 dark:text-white dark:focus:border-white dark:focus:ring-white ${className}`}
        {...props}
      >
        {children}
      </select>
    );
  },
);

Select.displayName = 'Select';
