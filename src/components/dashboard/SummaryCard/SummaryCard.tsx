import type { ReactNode } from "react";
import styles from "./SummaryCard.module.css";

type SummaryCardVariant = "default" | "muted" | "highlight" | "complete";

interface SummaryCardProps {
  title: string;
  value: string;
  cardVariant?: SummaryCardVariant;
  valueVariant?: SummaryCardVariant;
  isEmpty?: boolean;
  showPattern?: boolean;
  children?: ReactNode;
}

const getValueClassName = (variant: SummaryCardVariant): string => {
  const valueClassNames: Record<SummaryCardVariant, string> = {
    default: styles.value,
    muted: styles.mutedValue,
    highlight: styles.highlightedValue,
    complete: styles.completedValue,
  };

  const valueClassName = [styles.value];
  valueClassName.push(valueClassNames[variant]);

  return valueClassName.join(" ");
};

function SummaryCard({
  title,
  value,
  cardVariant = "default",
  valueVariant = "default",
  isEmpty = false,
  showPattern = false,
  children,
}: SummaryCardProps): React.JSX.Element {
  const cardClassName = [
    styles.card,
    cardVariant === "highlight" ? styles.highlighted : "",
  ]
    .filter(Boolean)
    .join(" ");

  const valueClassName = getValueClassName(valueVariant);

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
