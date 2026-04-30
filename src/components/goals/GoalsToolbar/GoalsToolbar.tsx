import { useEffect, useRef } from "react";
import { Button } from "../../common/Button/Button";
import { useModal } from "../../../hooks/useModal";
import { FilterPanel } from "../FilterPanel/FilterPanel";
import { SortPanel } from "../SortPanel/SortPanel";
import styles from "./GoalsToolbar.module.css";

export function GoalsToolbar(): React.JSX.Element {
  const filterModal = useModal();
  const sortModal = useModal();

  const filterWrapperRef = useRef<HTMLDivElement>(null);
  const sortWrapperRef = useRef<HTMLDivElement>(null);

  // Close on click outside (desktop — mobile uses the backdrop)
  useEffect(() => {
    if (!filterModal.isOpen && !sortModal.isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        filterModal.isOpen &&
        filterWrapperRef.current &&
        !filterWrapperRef.current.contains(e.target as Node)
      ) {
        filterModal.close();
      }

      if (
        sortModal.isOpen &&
        sortWrapperRef.current &&
        !sortWrapperRef.current.contains(e.target as Node)
      ) {
        console.log(e.target);
        sortModal.close();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [
    filterModal.isOpen,
    sortModal.isOpen,
    filterModal.close,
    sortModal.close,
  ]);

  const handleFilterToggle = () => {
    sortModal.close();
    filterModal.toggle();
  };

  const handleSortToggle = () => {
    filterModal.close();
    sortModal.toggle();
  };

  return (
    <div className={styles.toolbar} aria-label="Goals controls">
      <div className={styles.dropdownWrapper} ref={filterWrapperRef}>
        <Button
          className={styles.button}
          type="button"
          variant="secondary"
          isActive={filterModal.isOpen}
          aria-expanded={filterModal.isOpen}
          aria-haspopup="dialog"
          icon={
            <img
              src={`${import.meta.env.BASE_URL}assets/images/icon-filter.svg`}
              alt=""
              aria-hidden="true"
            />
          }
          onClick={handleFilterToggle}
        >
          Filters
        </Button>

        {filterModal.isOpen && <FilterPanel onClose={filterModal.close} />}
      </div>

      <div className={styles.dropdownWrapper} ref={sortWrapperRef}>
        <Button
          className={styles.button}
          type="button"
          variant="secondary"
          isActive={sortModal.isOpen}
          aria-expanded={sortModal.isOpen}
          aria-haspopup="dialog"
          icon={
            <img
              src={`${import.meta.env.BASE_URL}assets/images/icon-sort.svg`}
              alt=""
              aria-hidden="true"
            />
          }
          onClick={handleSortToggle}
        >
          Sort by
        </Button>

        {sortModal.isOpen && <SortPanel onClose={sortModal.close} />}
      </div>
    </div>
  );
}
