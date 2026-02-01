import React from "react";
import { cn } from "../../utils/helpers";

const Card = ({
  children,
  className,
  hover = false,
  padding = "default",
  ...props
}) => {
  const paddings = {
    none: "",
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "card",
        hover && "card-hover",
        paddings[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className, ...props }) => (
  <div className={cn("mb-4", className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className, ...props }) => (
  <h3
    className={cn(
      "text-xl font-semibold text-gray-900 dark:text-gray-100",
      className,
    )}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription = ({ children, className, ...props }) => (
  <p
    className={cn("text-sm text-gray-600 dark:text-gray-400 mt-1", className)}
    {...props}
  >
    {children}
  </p>
);

export const CardContent = ({ children, className, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className, ...props }) => (
  <div
    className={cn(
      "mt-4 pt-4 border-t border-gray-200 dark:border-gray-800",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export default Card;
