import * as React from "react";
import { Label } from "./label";
import { cn } from "../lib/utils";


const FloatingLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return (
    <Label
      className={cn(
        "absolute start-2 top-2 z-10 user-select-none pointer-events-none",
        "origin-[0] -translate-y-1 scale-75 transform bg-background px-3 text-sm text-gray-500",
        "duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2",
        "peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-1",
        "peer-focus:secondary peer-focus:dark:secondary peer-focus:scale-75 peer-focus:px-3",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
FloatingLabel.displayName = "FloatingLabel";

export { FloatingLabel };
