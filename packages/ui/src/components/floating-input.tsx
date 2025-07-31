import * as React from "react";

import { Input } from "./input";
import { FloatingLabel } from "./floating-label";
import { cn } from "../lib/utils";

type FloatingLabelInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: React.ReactNode;
};

const FloatingLabelInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.PropsWithoutRef<FloatingLabelInputProps>
>(({ id, label, error, ...props }, ref) => {
  return (
    <div>
      <div className="relative floating-label">
        <Input
          ref={ref}
          id={id}
          {...props}
          className={cn(
            "peer h-14 pt-4 px-4 w-full block bg-background text-foreground",
            props.className
          )}
          placeholder=" "
        />
        <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
      </div>
      <div className="text-xs mt-1 text-destructive">{error}</div>
    </div>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingLabelInput };
