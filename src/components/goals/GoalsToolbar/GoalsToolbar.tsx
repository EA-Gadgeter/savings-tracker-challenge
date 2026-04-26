import { Button } from "../../common/Button/Button";
import styles from "./GoalsToolbar.module.css";

export interface GoalsToolbarProps {
  onFilterClick: () => void;
  onSortClick: () => void;
}

export function GoalsToolbar({
  onFilterClick,
  onSortClick,
}: GoalsToolbarProps): React.JSX.Element {
  return (
    <div className={styles.toolbar} aria-label="Goals controls">
      <Button
        className={styles.button}
        type="button"
        variant="secondary"
        icon={
          <img
            src={`${import.meta.env.BASE_URL}assets/images/icon-filter.svg`}
            alt=""
            aria-hidden="true"
          />
        }
        onClick={onFilterClick}
      >
        Filters
      </Button>

      <Button
        className={styles.button}
        type="button"
        variant="secondary"
        icon={
          <img
            src={`${import.meta.env.BASE_URL}assets/images/icon-sort.svg`}
            alt=""
            aria-hidden="true"
          />
        }
        onClick={onSortClick}
      >
        Sort by
      </Button>
    </div>
  );
}
