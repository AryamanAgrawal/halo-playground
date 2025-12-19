import { forwardRef } from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`font-montserrat text-sm font-medium text-black/90 dark:text-white/90 ${className}`}
        {...props}
      />
    );
  },
);

Label.displayName = 'Label';
