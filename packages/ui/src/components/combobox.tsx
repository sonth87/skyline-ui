"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "../lib/utils";

export type ComboboxProps = React.ComponentProps<typeof Command> & {
  options?: { label: React.ReactNode; value: string }[];
  placeHolder?: string;
  onChange?: (value: string) => void;
  emptyText?: string;
  className?: string;
  dropdownClassName?: string;
};

export function Combobox({
  options,
  placeHolder,
  emptyText,
  onChange,
  className,
  dropdownClassName,
  ...props
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    onChange?.(value);
  }, [value, onChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", className)}
        >
          {value
            ? options?.find(option => option.value === value)?.label
            : placeHolder}
          <ChevronsUpDown className={cn("opacity-50", dropdownClassName)} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("p-0 w-[var(--radix-popover-trigger-width)]")}
      >
        <Command {...props}>
          <CommandInput placeholder={placeHolder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyText || "Not found"}</CommandEmpty>
            <CommandGroup>
              {options?.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={currentValue => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
