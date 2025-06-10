import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  ...rest
}) => {
  const variants = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white shadow-md focus:ring-2 focus:ring-blue-500',
    secondary:
      'bg-gray-300 hover:bg-gray-400 text-gray-800 shadow focus:ring-2 focus:ring-gray-300',
    terciary:
      'bg-gray-900 hover:bg-gray-400 text-gray-200 shadow focus:ring-2 focus:ring-gray-300',
    outline:
      'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-300',
    ghost:
      'bg-transparent hover:bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-300'
  };

  const sizes = {
    sm: 'whitespace-nowrap w-1/12 h-fit px-3 py-1 text-sm',
    md: 'whitespace-nowrap px-4 py-2 text-base',
    lg: 'whitespace-nowrap w-fit h-fit px-6 py-3 text-lg'
  };

  const baseStyles =
    'rounded-md transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed';

  const className = [
    baseStyles,
    variants[variant],
    sizes[size]
  ].join(' ');

  return (
    <button
      type="button"
      className={"ml-2 mr-2" + className}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
