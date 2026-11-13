import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * shadcn Button (Base UI), restyled for this site. Hover is an opacity layer (::before) and press
 * is a scale, so only transform and opacity animate. Colours come from the site tokens.
 */
const buttonVariants = cva(
  "group/button relative isolate inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-solid font-medium no-underline select-none outline-none transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus) disabled:pointer-events-none disabled:opacity-50 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-current before:opacity-0 before:transition-opacity before:duration-150 hover:before:opacity-[0.08] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-150 [&_svg:not([class*='size-'])]:size-4 motion-reduce:transition-none motion-reduce:active:scale-100",
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_1px_2px_rgb(0_0_0/0.25)] bg-[linear-gradient(to_bottom,transparent,rgb(0_0_0/0.10))] hover:before:opacity-[0.10]',
        outline: 'border-border bg-card text-foreground bg-[linear-gradient(to_bottom,rgb(255_255_255/0.04),transparent)] hover:before:opacity-[0.05]',
        ghost: 'border-transparent bg-transparent text-foreground hover:before:opacity-[0.07]',
      },
      size: {
        default: 'h-11 px-5 text-sm',
        sm: 'h-9 px-3.5 text-[13px]',
        icon: 'size-10',
        'icon-sm': 'size-9',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

function Button({ className, variant = 'default', size = 'default', ...props }: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
