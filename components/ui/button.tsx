import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff2d5e] disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        primary:
          "text-white border-none shadow-[0_8px_25px_rgba(255,45,94,0.3)] hover:brightness-110 hover:shadow-[0_12px_30px_rgba(255,45,94,0.5)] hover:-translate-y-0.5",
        secondary:
          "bg-[#121212] border border-[rgba(255,255,255,0.08)] text-white hover:bg-[#1a1a1a]",
        danger:
          "bg-[rgba(255,45,94,0.1)] text-[#ff8fa8] hover:bg-[rgba(255,45,94,0.2)] hover:text-[#ffb3c1]",
        ghost: "bg-transparent text-white hover:bg-[rgba(255,255,255,0.1)]",
        gem: "text-white border-none shadow-[0_8px_25px_rgba(139,92,246,0.3)] hover:brightness-110 hover:-translate-y-0.5",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-5 text-base w-full",
        icon: "w-10 h-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// Inline gradient styles (can't be done with Tailwind alone)
const variantStyles: Record<string, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(145deg, #ff2d5e, #ff4d77)",
  },
  gem: {
    background: "linear-gradient(145deg, #8b5cf6, #c084fc)",
  },
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        style={{ ...(variantStyles[variant ?? "primary"] ?? {}), ...style }}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
