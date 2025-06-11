import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const id = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const widthClass = fullWidth ? 'w-full' : 'w-auto';

  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-foreground/80 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          block rounded-md px-3 py-2 bg-background border border-black/[.08] dark:border-white/[.145] 
          ${widthClass}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          ${error ? 'border-red-500' : ''}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;