'use client';

import { forwardRef } from 'react';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
  className?: string;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      onValueChange,
      min,
      max,
      step,
      disabled = false,
      className = '',
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={`relative flex items-center ${className}`}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onValueChange(parseFloat(e.target.value))}
          disabled={disabled}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-700"
          style={{
            background: `linear-gradient(to right, rgb(38 38 38) 0%, rgb(38 38 38) ${((value - min) / (max - min)) * 100}%, rgb(229 229 229) ${((value - min) / (max - min)) * 100}%, rgb(229 229 229) 100%)`,
          }}
        />
        <style jsx>{`
          input[type='range']::-webkit-slider-thumb {
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: rgb(38 38 38);
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          input[type='range']::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: rgb(38 38 38);
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          .dark input[type='range']::-webkit-slider-thumb {
            background: white;
            border: 2px solid rgb(38 38 38);
          }

          .dark input[type='range']::-moz-range-thumb {
            background: white;
            border: 2px solid rgb(38 38 38);
          }
        `}</style>
      </div>
    );
  },
);

Slider.displayName = 'Slider';
