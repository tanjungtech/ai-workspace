import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: Props) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  };

  return (
    <button
      {...props}
      className={`
        rounded-lg
        px-4
        py-2
        transition
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}