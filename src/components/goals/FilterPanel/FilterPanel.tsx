import { useEffect } from "react";
import type { GoalFilter } from "../../../types";
import { useGoalsStore } from "../../../store/useGoalsStore";
import styles from "./FilterPanel.module.css";

const FILTER_OPTIONS: { value: GoalFilter; label: string }[] = [
  { value: "all", label: "All goals" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" },
  { value: "not-started", label: "Not started" },
];

interface FilterPanelProps {
  onClose: () => void;
}

export function FilterPanel({
  onClose,
}: FilterPanelProps): React.JSX.Element {
  const activeFilter = useGoalsStore((state) => state.activeFilter);
  const setFilter = useGoalsStore((state) => state.setFilter);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleChange = (value: GoalFilter) => {
    setFilter(value);
    onClose();
  };

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />

      <div className={styles.panel}>
        <p className={styles.heading} id="filter-panel-heading">
          Filter by status
        </p>

        <div
          role="radiogroup"
          aria-labelledby="filter-panel-heading"
          className={styles.options}
        >
          {FILTER_OPTIONS.map(({ value, label }) => (
            <label key={value} className={styles.option}>
              <input
                type="radio"
                name="filter-status"
                value={value}
                checked={activeFilter === value}
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
