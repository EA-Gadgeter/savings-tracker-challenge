import { useMemo } from "react";
import type { Deposit } from "../../../types";
import { formatCurrency, formatDate } from "../../../utils/formatters";
import styles from "./DepositList.module.css";

interface DepositListProps {
  deposits: Deposit[];
}

export function DepositList({
  deposits,
}: DepositListProps): React.JSX.Element {
  // Most recent deposit first
  const sorted = useMemo(
    () =>
      [...deposits].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [deposits],
  );

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Deposit history</h2>
        {deposits.length > 0 && (
          <span className={styles.count}>
            {deposits.length} deposit{deposits.length === 1 ? "" : "s"}
          </span>
        )}
      </div>

      {deposits.length === 0 ? (
        <p className={styles.empty}>
          No deposits yet. Add your first deposit above.
        </p>
      ) : (
        <ul className={styles.list}>
          {sorted.map((deposit) => (
            <li key={deposit.id} className={styles.item}>
              <div className={styles.icon} aria-hidden="true">
                <img
                  src="/assets/images/icon-arrow-down.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              </div>

              <div className={styles.details}>
                <p className={styles.note}>
                  {deposit.note || "Deposit"}
                </p>
                <p className={styles.date}>{formatDate(deposit.createdAt)}</p>
              </div>

              <p className={styles.amount}>
                +{formatCurrency(deposit.amount)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
