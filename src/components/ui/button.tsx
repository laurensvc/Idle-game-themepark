import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-100 cursor-pointer disabled:pointer-events-none disabled:opacity-50 active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'border-[2px] border-gray-300 bg-primary text-primary-foreground shadow-[0_3px_0_rgb(20,184,166)/.5] hover:bg-primary/90 active:shadow-[0_1px_0_rgb(20,184,166)/.5]',
        destructive:
          'border-[2px] border-gray-300 bg-destructive text-destructive-foreground shadow-[0_3px_0_rgb(100,100,100)/.5] hover:bg-destructive/90 active:shadow-[0_1px_0_rgb(100,100,100)/.5]',
        outline:
          'border-[2px] border-gray-300 bg-background text-foreground shadow-[0_3px_0_rgb(212,215,217)/.5] hover:bg-accent/80 active:shadow-[0_1px_0_rgb(212,215,217)/.5]',
        secondary:
          'border-[2px] border-gray-300 bg-secondary text-secondary-foreground shadow-[0_3px_0_rgb(212,215,217)/.5] hover:bg-secondary/80 active:shadow-[0_1px_0_rgb(212,215,217)/.5]',
        ghost: 'border-[1px] border-gray-300 hover:bg-accent/50 active:shadow-none active:border-transparent',
        link: 'text-primary underline-offset-4 hover:underline active:translate-y-[1px]',
        park: 'border-[2px] border-park-orange/30 bg-gradient-to-b from-park-green to-green-600 text-white shadow-[0_4px_0_rgb(58,124,58)/.5] hover:shadow-[0_6px_0_rgb(58,124,58)] active:shadow-[0_2px_0_rgb(58,124,58)] active:bg-green-700',
        coin: 'border-[2px] border-yellow-300/50 bg-gradient-to-b from-park-orange to-orange-600 text-white shadow-[0_4px_0_rgb(180,83,9)/.5] hover:shadow-[0_6px_0_rgb(180,83,9)] active:shadow-[0_2px_0_rgb(180,83,9)] active:bg-orange-700',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-lg px-3 text-xs',
        lg: 'h-12 rounded-xl px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
