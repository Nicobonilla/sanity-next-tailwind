import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/cn';

const buttonVariants = {
  primary: 'button-primary',
  secondary: 'button-secondary',
  ghost: 'button-ghost',
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: keyof typeof buttonVariants;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { asChild = false, className, variant = 'primary', type = 'button', ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const componentProps = asChild ? props : { ...props, type };

    return (
      <Comp
        className={cn(buttonVariants[variant], className)}
        ref={ref}
        {...componentProps}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
