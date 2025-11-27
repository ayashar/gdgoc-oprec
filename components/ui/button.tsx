import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg hover:cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-neutral-700 hover:bg-neutral-600 has-[>svg]:gap-2 font-bold hover:scale-105 transition',
        delete: 'bg-[#DC2626] text-white has-[>svg]:gap-2 font-bold',
        disabled: 'bg-[#E4E4E7] text-white has-[>svg]:gap-2 font-bold',
      },
      size: {
        default: 'md:px-11 md:py-[10px] px-10 py-2 has-[>svg]:px-4',
        transparant: 'md:px-[14px] md:py-[8px] px-[12px] py-[6px]',
        sm: 'px-[14px] text-lg py-2',
        md: 'px-4 py-[10px] text-lg',
        lg: 'px-[18px] py-[10px] lg:text-[22px]',
        smIcon: 'h-9 w-9',
        mdIcon: 'h-10 w-10',
        lgIcon: 'h-11 w-11',
        xlIcon: 'h-12 w-12',
        xxlIcon: 'h-14 w-14',
        cream: 'py-[6px] px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

function Button({ className, variant, size, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  );
}

export { Button, buttonVariants };