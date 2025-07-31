import * as React from "react";

import { FloatingLabel } from "./floating-label";
import { cn } from "../lib/utils";
import { Combobox, type ComboboxProps } from "./combobox";

type FloatingLabelComboboxProps = ComboboxProps & {
  label?: string;
  error?: React.ReactNode;
};

const FloatingLabelCombobox = React.forwardRef<
  React.ElementRef<typeof Combobox>,
  React.PropsWithoutRef<FloatingLabelComboboxProps>
>(({ id, label, error, ...props }, ref) => {
  return (
    <div>
      <div className="relative floating-label">
        <Combobox
          {...props}
          ref={ref}
          className={cn(
            "peer h-14 pt-6 !px-4 w-full flex justify-between bg-background text-foreground",
            props.className
          )}
          dropdownClassName="absolute right-4 top-1/2 -translate-y-1/2"
        />
        <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
      </div>
      <div className="text-xs mt-1 text-destructive">{error}</div>
    </div>
  );
});
FloatingLabelCombobox.displayName = "FloatingLabelCombobox";

export { FloatingLabelCombobox };
