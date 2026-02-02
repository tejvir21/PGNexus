import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import Card from "./Card";
import { cn } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = "primary",
  loading = false,
  to = "/",
}) => {
  const navigate = useNavigate();

  const colors = {
    primary: "from-primary-600 to-primary-700",
    success: "from-green-600 to-green-700",
    warning: "from-yellow-600 to-yellow-700",
    danger: "from-red-600 to-red-700",
    info: "from-blue-600 to-blue-700",
    purple: "from-purple-600 to-purple-700",
  };

  if (loading) {
    return (
      <Card>
        <div className="animate-pulse">
          <div className="w-1/2 h-4 mb-4 bg-gray-200 rounded dark:bg-gray-800" />
          <div className="w-3/4 h-8 mb-2 bg-gray-200 rounded dark:bg-gray-800" />
          <div className="w-1/3 h-3 bg-gray-200 rounded dark:bg-gray-800" />
        </div>
      </Card>
    );
  }

  return (
    <Card hover className="relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute top-0 right-0 w-32 h-32 opacity-5"
        onClick={() => {
          navigate(to);
        }}
      >
        <Icon className="w-full h-full" />
      </div>

      <div
        className="relative"
        onClick={() => {
          navigate(to);
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </p>
            <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
              {value}
            </h3>
          </div>
          <div
            className={cn(
              "p-3 rounded-xl bg-gradient-to-br shadow-lg",
              colors[color],
            )}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        {trend && (
          <div className="flex items-center space-x-2">
            <div
              className={cn(
                "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium",
                trend === "up"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
              )}
            >
              {trend === "up" ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{trendValue}</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              vs last month
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
