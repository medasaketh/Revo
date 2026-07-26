import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white text-[#090909] hover:bg-[#D4C4A8] hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-[#111111] text-white border border-[#222222] hover:border-[#444444] hover:bg-[#1a1a1a]",
        ghost: "text-gray-400 hover:text-white hover:bg-white/5",
        outline:
          "border border-[#222222] bg-transparent text-white hover:border-white/30 hover:bg-white/5",
        champagne:
          "bg-[#D4C4A8]/10 text-[#D4C4A8] border border-[#D4C4A8]/20 hover:bg-[#D4C4A8]/20",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-10 px-5 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
