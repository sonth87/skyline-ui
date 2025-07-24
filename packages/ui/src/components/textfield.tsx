"use client";

import { createContext, forwardRef, useContext } from "react";

import { tv } from "@skyline/styles";

const TextFieldStyles = {
  Root: tv({
    base: [
      "relative flex cursor-text gap-2 px-3",
      "[&:has(:disabled)]:cursor-not-allowed",
    ],
  }),
  Slot: tv({
    base: ["relative z-10 flex shrink-0 items-center text-input"],
  }),
  Input: tv({
    base: [
      "peer block h-10 w-full appearance-none bg-transparent text-sm outline-none transition",
      "placeholder:text-muted-foreground",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ],
  }),
  Chrome: tv({
    base: [
      "pointer-events-none absolute inset-0 z-0 rounded-md border border-input ring-offset-2 ring-offset-background transition",
      "peer-focus-within:ring-2 peer-focus-within:ring-ring peer-[&:focus-within[aria-invalid=true]]:ring-destructive peer-aria-[invalid=true]:border-destructive",
    ],
  }),
};

const TextFieldContext = createContext({
  hasRoot: false,
});

const useTextFieldContext = () => {
  return useContext(TextFieldContext);
};

type TextFieldRootProps = React.ComponentPropsWithoutRef<"div">;

const TextFieldRoot = forwardRef<HTMLDivElement, TextFieldRootProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={TextFieldStyles.Root({ className })}
        ref={ref}
        onPointerDown={(event) => {
          props.onPointerDown?.(event);

          const target = event.target as HTMLElement;
          if (target.closest("input, button, a")) return;

          const input = event.currentTarget.querySelector("input");
          if (!input) return;

          const position = input.compareDocumentPosition(target);
          const targetIsBeforeTextFieldInput =
            (position & Node.DOCUMENT_POSITION_PRECEDING) !== 0;
          const cursorPosition = targetIsBeforeTextFieldInput
            ? 0
            : input.value.length;

          requestAnimationFrame(() => {
            input.setSelectionRange(cursorPosition, cursorPosition);
            input.focus();
          });
        }}
      >
        <TextFieldContext.Provider value={{ hasRoot: true }}>
          {props.children}
        </TextFieldContext.Provider>
      </div>
    );
  }
);

type TextFieldSlotProps = React.ComponentPropsWithoutRef<"div"> & {
  children: React.ReactNode;
};

const TextFieldSlot = forwardRef<HTMLDivElement, TextFieldSlotProps>(
  ({ className, ...props }, ref) => {
    if (!props.children) return null;

    return (
      <div
        className={TextFieldStyles.Slot({ className })}
        ref={ref}
        {...props}
      />
    );
  }
);

type TextFieldInputProps = React.ComponentPropsWithoutRef<"input">;

const TextFieldInput = forwardRef<HTMLInputElement, TextFieldInputProps>(
  ({ className, type = "text", ...props }, ref) => {
    const { hasRoot } = useTextFieldContext();

    if (type === "file")
      throw new Error("TextField does not support type=file");

    const input = (
      <>
        <input
          type={type}
          spellCheck="false"
          className={TextFieldStyles.Input({ className })}
          ref={ref}
          {...props}
        />
        <div className={TextFieldStyles.Chrome()} />
      </>
    );

    return hasRoot ? input : <TextFieldRoot>{input}</TextFieldRoot>;
  }
);

export type { TextFieldRootProps, TextFieldSlotProps, TextFieldInputProps };
export { TextFieldStyles, TextFieldRoot, TextFieldSlot, TextFieldInput };
export const TextField = Object.assign(TextFieldInput, {
  Root: TextFieldRoot,
  Slot: TextFieldSlot,
  Input: TextFieldInput,
});
