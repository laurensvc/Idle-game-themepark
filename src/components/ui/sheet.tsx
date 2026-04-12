import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { Dialog } from 'radix-ui';
import * as React from 'react';

const Sheet = Dialog.Root;
const SheetTrigger = Dialog.Trigger;
const SheetClose = Dialog.Close;
const SheetPortal = Dialog.Portal;

const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    className={cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/40',
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = Dialog.Overlay.displayName;

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-200 data-[state=open]:duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom rounded-t-2xl max-h-[85vh]',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'bottom',
    },
  }
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content>, VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<React.ComponentRef<typeof Dialog.Content>, SheetContentProps>(
  ({ side = 'bottom', className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <Dialog.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
        <Dialog.Close className="absolute top-4 right-4 cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Dialog.Close>
        {children}
      </Dialog.Content>
    </SheetPortal>
  )
);
SheetContent.displayName = Dialog.Content.displayName;

const SheetHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('flex flex-col gap-2 text-center sm:text-left', className)} {...props} />
);

const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title ref={ref} className={cn('text-foreground text-lg font-semibold', className)} {...props} />
));
SheetTitle.displayName = Dialog.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
));
SheetDescription.displayName = Dialog.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
