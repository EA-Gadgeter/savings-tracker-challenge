import type { ReactElement } from "react";
import { useModal } from "../../../hooks/useModal";
import { Button } from "../Button/Button";
import { CreateGoalModal } from "../../goals/CreateGoalModal/CreateGoalModal";
import styles from "./Header.module.css";

const Header = (): ReactElement => {
  const createGoalModal = useModal();

  return (
    <header className={styles.header}>
      <picture>
        <source
          media="(width >= 768px)"
          srcSet={`${import.meta.env.BASE_URL}assets/images/logo-large.svg`}
        />
        <img
          className={styles.logo}
          src={`${import.meta.env.BASE_URL}assets/images/logo-small.svg`}
          alt="Savings Tracker"
          width={48}
          height={48}
        />
      </picture>

      <div className={styles.actions}>
        <Button
          type="button"
          variant="primary"
          onClick={createGoalModal.toggle}
          icon={
            <img
              src={`${import.meta.env.BASE_URL}assets/images/icon-plus.svg`}
              alt=""
              aria-hidden="true"
            />
          }
        >
          New goal
        </Button>

        {createGoalModal.isOpen && (
          <CreateGoalModal onClose={createGoalModal.toggle} />
        )}
      </div>
    </header>
  );
};

export default Header;
