// import React from 'react';
// import PropTypes from 'prop-types';

// const Button = ({ 
//   children, 
//   onClick, 
//   variant = 'primary', 
//   size = 'medium', 
//   className = '',
//   disabled = false, 
//   type = 'button', 
//   ...props 
// }) => {
//   const baseClasses = 'font-medium rounded transition-colors duration-200 focus:outline-none';

//   const variants = {
//     primary: 'bg-[#2463eb] text-white hover:bg-blue-700 disabled:bg-gray-400 border border-[#2463eb]',
//     secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
//     outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:border-gray-200 disabled:text-gray-400',
//   };

//   const sizes = {
//     small: 'px-3 py-1 text-sm',
//     medium: 'px-4 py-2 text-base',
//     large: 'px-6 py-3 text-lg',
//   };

//   const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'cursor-not-allowed' : ''} ${className}`;

//   return (
//     <button 
//       type={type} 
//       onClick={onClick} 
//       disabled={disabled} 
//       className={buttonClasses} 
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

// Button.propTypes = {
//   children: PropTypes.node,
//   onClick: PropTypes.func,
//   variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
//   size: PropTypes.oneOf(['small', 'medium', 'large']),
//   className: PropTypes.string,
//   disabled: PropTypes.bool,
//   type: PropTypes.oneOf(['button', 'submit', 'reset']),
// };

// export default Button;

import * as React from "react";

import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";
import { Slot } from "@radix-ui/react-slot";

// Khai báo các biến thể (variants) của button
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Button component không dùng TypeScript type nữa
const Button = React.forwardRef(
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
