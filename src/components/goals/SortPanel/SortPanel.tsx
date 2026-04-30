import { useEffect } from "react";
import { useGoalsStore } from "../../../store/useGoalsStore";
import type { GoalSort } from "../../../types";
import styles from "./SortPanel.module.css";

const SORT_OPTIONS: { value: GoalSort; label: string }[] = [
  { value: "recently-added", label: "Recently added" },
  { value: "deadline", label: "Deadline (soonest first)" },
  { value: "progress-highest", label: "Progress (highest first)" },
  { value: "progress-lowest", label: "Progress (lowest first)" },
  { value: "amount-saved", label: "Amount saved (highest first)" },
  { value: "alphabetically", label: "Alphabetical (A–Z)" },
];

interface SortPanelProps {
  onClose: () => void;
}

export function SortPanel({ onClose }: SortPanelProps): React.JSX.Element {
  const activeSort = useGoalsStore((state) => state.activeSort);
  const setSort = useGoalsStore((state) => state.setSort);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleChange = (value: GoalSort) => {
    setSort(value);
    onClose();
  };

  return (
    <>
      {/* Mobile: dark backdrop — hidden on desktop via CSS */}
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />

      <div className={styles.panel}>
        <p className={styles.heading} id="sort-panel-heading">
          Sort by
        </p>

        <div
          role="radiogroup"
          aria-labelledby="sort-panel-heading"
          className={styles.options}
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <label key={value} className={styles.option}>
              <input
                type="radio"
                name="goal-sort"
                value={value}
                checked={activeSort === value}
                onChange={() => handleChange(value)}
                className={styles.radioInput}
              />
              <span className={styles.radioCustom} aria-hidden="true" />
              <span className={styles.optionText}>{label}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
