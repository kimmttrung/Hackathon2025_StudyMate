import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";


const labelVariants = cva(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef((props, ref) => {
    const { className, ...rest } = props;
    return (
        <LabelPrimitive.Root
            ref={ref}
            className={cn(labelVariants(), className)}
            {...rest}
        />
    );
});

Label.displayName = "Label";

export { Label };
