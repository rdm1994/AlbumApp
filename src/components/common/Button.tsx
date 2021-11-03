import React, { ButtonHTMLAttributes, forwardRef, FunctionComponent, Ref } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
  variant?: 'primary' | 'normal';
}

export const Button: FunctionComponent<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { variant = 'normal', className, children, disabled, ...rest } = props;

  const classes = {
    root: clsx(
      className,
      'flex-shrink-0 inline-flex justify-center items-center space-[4px]',
      'min-w-[36px] h-[36px] rounded-[4px] p-[8px] text-[14px]',
      'transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed',
      {
        'bg-white hover:bg-blueGray-100 active:bg-blueGray-200 disabled:bg-blueGray-200': variant === 'normal',
        'text-black disabled:text-blueGray-500': variant === 'normal',
        'border border-blueGray-400': variant === 'normal',
        'bg-blue-500 hover:bg-blue-400 active:bg-blue-600 disabled:bg-blue-300 text-white': variant === 'primary',
      },
    ),
  };

  return (
    <button ref={ref} className={classes.root} disabled={disabled} {...rest}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';
