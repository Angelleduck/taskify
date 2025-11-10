import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";
import type React from "react";
import { useState } from "react";
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface InputProps<T extends FieldValues>
  extends React.HTMLAttributes<HTMLDivElement> {
  register: UseFormRegister<T>;
  id: Path<T>;
  type: "email" | "password" | "text";
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
}

export function Input<T extends FieldValues>({
  register,
  id,
  type,
  placeholder,
  className,
  defaultValue,
  disabled,
}: InputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={cn(
        "flex items-center border rounded-md overflow-hidden focus-within:border-black",
        className
      )}
    >
      <input
        {...register(id)}
        id={id}
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        className="w-full py-2 px-4 outline-none disabled:cursor-not-allowed"
        defaultValue={defaultValue}
        disabled={disabled}
      />
      {type === "password" && (
        <button
          tabIndex={-1}
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="p-2"
        >
          {showPassword ? <EyeClosed /> : <Eye />}
        </button>
      )}
    </div>
  );
}
