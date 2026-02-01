import React from "react";
import { cn } from "../../utils/helpers";

const Input = ({
  label,
  error,
  helperText,
  icon: Icon,
  className,
  containerClassName,
  required = false,
  ...props
}) => {
  return (
    <div className={cn("w-full", containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          className={cn(
            "input-field",
            Icon && "pl-10",
            error && "border-red-500 focus:ring-red-500",
            className,
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
