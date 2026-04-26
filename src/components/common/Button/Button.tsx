import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantClassNameMap: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
};

export function Button({
  children,
  className,
  icon,
  type = "button",
  variant = "primary",
  fullWidth = false,
  ...props
}: ButtonProps) {
  const buttonClassName = [
    styles.button,
    variantClassNameMap[variant],
    fullWidth ? styles.fullWidth : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClassName} type={type} {...props}>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      <span className={styles.label}>{children}</span>
    </button>
  );
}

export type { ButtonProps, ButtonVariant };
