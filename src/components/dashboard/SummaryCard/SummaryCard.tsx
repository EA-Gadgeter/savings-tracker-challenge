import type { ReactNode } from "react";
import styles from "./SummaryCard.module.css";

type SummaryCardVariant = "default" | "highlight";

interface SummaryCardProps {
  title: string;
  value: string;
  variant?: SummaryCardVariant;
  isEmpty?: boolean;
  showPattern?: boolean;
  children?: ReactNode;
}

function SummaryCard({
  title,
  value,
  variant = "default",
  isEmpty = false,
  showPattern = false,
  children,
}: SummaryCardProps): React.JSX.Element {
  const cardClassName = [
    styles.card,
    variant === "highlight" ? styles.highlighted : "",
  ]
    .filter(Boolean)
    .join(" ");

  const valueClassName = [
    styles.value,
    variant === "default" ? styles.mutedValue : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClassName}>
      {showPattern ? (
        <img
          className={styles.pattern}
          src={`${import.meta.env.BASE_URL}assets/images/pattern-star.svg`}
          alt=""
          aria-hidden="true"
        />
      ) : null}

      <div className={styles.content}>
        <h2 className={styles.label}>{title}</h2>

        {isEmpty ? (
          <div className={styles.chartEmpty}>
            <p className={styles.chartEmptyText}>{value}</p>
          </div>
        ) : (
          <p className={valueClassName}>{value}</p>
        )}

        {children}
      </div>
    </article>
  );
}

export default SummaryCard;
