import React from "react";
import { cn } from "../../utils/helpers";

const Badge = ({
  children,
  variant = "default",
  size = "md",
  className,
  ...props
}) => {
  const variants = {
    default: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300",
    primary:
      "bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300",
    success:
      "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
    warning:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
    danger: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
    info: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
