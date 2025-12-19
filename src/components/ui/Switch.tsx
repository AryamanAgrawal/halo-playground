'use client';

import { forwardRef } from 'react';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onCheckedChange, disabled = false, className = '' }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-white ${
          checked
            ? 'bg-neutral-900 dark:bg-white'
            : 'bg-neutral-300 dark:bg-neutral-700'
        } ${className}`}
      >
        <span
          className={`inline-block size-4 transform rounded-full transition-transform ${
            checked
              ? 'translate-x-6 bg-white dark:bg-neutral-900'
              : 'translate-x-1 bg-white dark:bg-neutral-300'
          }`}
        />
      </button>
    );
  },
);

Switch.displayName = 'Switch';
