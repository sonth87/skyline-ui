import * as React from "react";
import { FloatingLabel } from "./floating-label";
import { cn } from "../lib/utils";
import { Label } from "./label";
import { X } from "lucide-react";
import { Select, SelectTrigger, SelectValue } from "./select";

type FloatingLabelSelectProps = {
  label?: string;
  id?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode; // <SelectItem> bên trong
  className?: string;
  placeholder?: string;
  error?: React.ReactNode;
  unClearable?: boolean;
};

const FloatingLabelSelect = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithoutRef<FloatingLabelSelectProps>
>(function FloatingLabelSelect(
  {
    id,
    label,
    value,
    onValueChange,
    children,
    className,
    error,
    unClearable,
    ...props
  },
  ref
) {
  return (
    <div>
      <div className="relative floating-label">
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger
            ref={ref}
            id={id}
            className={cn(
              "peer !h-14 !pt-5 px-4 w-full rounded-md border bg-background text-foreground",
              className
            )}
            iconClassName="-translate-y-1.5"
            {...props}
          >
            <SelectValue placeholder={props?.placeholder} />
          </SelectTrigger>
          {children}
          {!unClearable && value && (
            <Label
              onClick={(e) => {
                e.stopPropagation();
                onValueChange?.("");
              }}
              className="absolute right-14 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
            >
              <X className="h-4 w-4" />
            </Label>
          )}
        </Select>
        <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
      </div>
      <div className="text-xs mt-1 text-destructive">{error}</div>
    </div>
  );
});
FloatingLabelSelect.displayName = "FloatingLabelSelect";

export { FloatingLabelSelect };
