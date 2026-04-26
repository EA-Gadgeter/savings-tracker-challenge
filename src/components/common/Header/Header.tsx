import type { FC, ReactElement } from "react";
import { Button } from "../Button/Button";
import styles from "./Header.module.css";

type HeaderProps = {
  onCreateGoal: () => void;
};

const Header: FC<HeaderProps> = ({ onCreateGoal }): ReactElement => {
  return (
    <header className={styles.header}>
      <img
        className={styles.logo}
        src={`${import.meta.env.BASE_URL}assets/images/logo-small.svg`}
        alt="Savings Tracker"
        width={48}
        height={48}
      />

      <div className={styles.actions}>
        <Button
          type="button"
          variant="primary"
          onClick={onCreateGoal}
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
      </div>
    </header>
  );
};

export default Header;
