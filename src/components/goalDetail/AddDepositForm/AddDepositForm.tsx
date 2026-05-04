import { useState, useId } from "react";
import { useGoalsStore } from "../../../store/useGoalsStore";
import { Button } from "../../common/Button/Button";
import styles from "./AddDepositForm.module.css";

interface AddDepositFormProps {
  goalId: string;
}

export function AddDepositForm({
  goalId,
}: AddDepositFormProps): React.JSX.Element {
  const addDeposit = useGoalsStore((state) => state.addDeposit);

  const amountId = useId();
  const noteId = useId();

  const [errors, setErrors] = useState({ amount: "" });
  const [touched, setTouched] = useState({ amount: false });

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name === amountId) {
      setTouched((prev) => ({ ...prev, amount: true }));
      setErrors((prev) => ({
        ...prev,
        amount: e.target.value.trim() ? "" : "Amount is required",
      }));
    }
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const amountStr = formData.get(amountId)?.toString().trim() ?? "";
    const note = formData.get(noteId)?.toString().trim() ?? "";
    const amount = parseFloat(amountStr);

    if (!amountStr || isNaN(amount) || amount <= 0) {
      setErrors({ amount: "Amount must be greater than $0" });
      setTouched({ amount: true });
      return;
    }

    addDeposit(goalId, { amount, note });

    // Reset form to initial state after a successful deposit
    e.currentTarget.reset();
    setErrors({ amount: "" });
    setTouched({ amount: false });
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Add deposit</h2>

      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        {/* Amount */}
        <div className={styles.field}>
          <label htmlFor={amountId} className={styles.label}>
            Amount
          </label>
          <div
            className={`${styles.inputWrapper} ${
              touched.amount && errors.amount ? styles.inputWrapperError : ""
            }`}
          >
            <img
              src="/assets/images/icon-dollar.svg"
              alt=""
              aria-hidden="true"
              className={styles.inputIcon}
            />
            <input
              id={amountId}
              name={amountId}
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              className={styles.inputInner}
              onBlur={handleBlur}
              aria-describedby={
                touched.amount && errors.amount
                  ? "deposit-amount-error"
                  : undefined
              }
            />
          </div>
          {touched.amount && errors.amount && (
            <p
              id="deposit-amount-error"
              className={styles.errorMessage}
              role="alert"
            >
              <img
                src="/assets/images/icon-error.svg"
                alt=""
                aria-hidden="true"
              />
              {errors.amount}
            </p>
          )}
        </div>

        {/* Note */}
        <div className={styles.field}>
          <label htmlFor={noteId} className={styles.label}>
            Note <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id={noteId}
            name={noteId}
            type="text"
            placeholder="e.g. Monthly savings"
            className={styles.input}
          />
        </div>

        <Button variant="primary" type="submit" fullWidth>
          Add funds
        </Button>
      </form>
    </div>
  );
}
