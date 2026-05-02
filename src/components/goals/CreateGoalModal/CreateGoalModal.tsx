import { useEffect, useState, useId } from "react";
import { useGoalsStore } from "../../../store/useGoalsStore";
import { Button } from "../../common/Button/Button";

import type { NewGoal } from "../../../types";

import styles from "./CreateGoalModal.module.css";

interface CreateGoalModalProps {
  onClose: () => void;
}

export function CreateGoalModal({
  onClose,
}: CreateGoalModalProps): React.JSX.Element {
  const addGoal = useGoalsStore((state) => state.addGoal);

  const nameId = useId();
  const targetId = useId();
  const deadlineId = useId();
  //Initialize state for validation errors (only required fields need errors)
  const [errors, setErrors] = useState({ name: "", target: "" });
  const [touched, setTouched] = useState({ name: false, target: false });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const validate = (formData: FormData): NewGoal | null => {
    const nameError = "Goal name is required";
    let targetError = "Target amount is required";

    const name = formData.get(nameId)?.toString().trim() || "";
    const target = formData.get(targetId)?.toString().trim() || "";
    const deadlineValue = formData.get(deadlineId)?.toString().trim() || null;

    if (!name || !target) {
      setErrors({
        name: name ? "" : nameError,
        target: target ? "" : targetError,
      });
      setTouched({ name: true, target: true });
      return null;
    }

    const targetNumber = parseFloat(target);

    if (isNaN(targetNumber) || targetNumber <= 0) {
      targetError = "Target amount must be greater than $0";
      setErrors((prev) => ({ ...prev, target: targetError }));
      setTouched((prev) => ({ ...prev, target: true }));
      return null;
    }

    return {
      name,
      target: targetNumber,
      deadline: deadlineValue,
    };
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const value = e.target.value.trim();

    if (fieldName === nameId) {
      setTouched((prev) => ({ ...prev, name: true }));
      if (!value)
        setErrors((prev) => ({ ...prev, name: "Goal name is required" }));
      else setErrors((prev) => ({ ...prev, name: "" }));
    } else if (fieldName === targetId) {
      setTouched((prev) => ({ ...prev, target: true }));
      if (!value)
        setErrors((prev) => ({ ...prev, target: "Target amount is required" }));
      else setErrors((prev) => ({ ...prev, target: "" }));
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const validData = validate(formData);

    if (!validData) return;

    addGoal(validData);
    onClose();
  };

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-goal-title"
        className={styles.panel}
      >
        {/* ── Header ── */}
        <div className={styles.header}>
          <h2 id="create-goal-title" className={styles.title}>
            New goal
          </h2>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <img
              src="/assets/images/icon-cross.svg"
              alt=""
              aria-hidden="true"
            />
          </button>
        </div>

        <hr className={styles.divider} />

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} noValidate className={styles.form}>
          {/* Goal name */}
          <div className={styles.field}>
            <label htmlFor={nameId} className={styles.label}>
              Goal name
            </label>
            <input
              id={nameId}
              name={nameId}
              type="text"
              placeholder="e.g. MacBook Pro M4"
              className={`${styles.input}
                ${touched.name && errors.name ? styles.inputError : ""}
              `}
              onBlur={handleBlur}
              aria-describedby={
                touched.name && errors.name ? "goal-name-error" : undefined
              }
            />

            {touched.name && errors.name && (
              <p
                id="goal-name-error"
                className={styles.errorMessage}
                role="alert"
              >
                <img
                  src="/assets/images/icon-error.svg"
                  alt=""
                  aria-hidden="true"
                />
                {errors.name}
              </p>
            )}
          </div>

          {/* Target amount */}
          <div className={styles.field}>
            <label htmlFor={targetId} className={styles.label}>
              Target amount
            </label>
            <div
              className={`${styles.inputWrapper}
                ${touched.target && errors.target ? styles.inputWrapperError : ""}
              `}
            >
              <img
                src="/assets/images/icon-dollar.svg"
                alt=""
                aria-hidden="true"
                className={styles.inputIcon}
              />
              <input
                id={targetId}
                name={targetId}
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                className={styles.inputInner}
                onBlur={handleBlur}
                aria-describedby={
                  touched.target && errors.target
                    ? "goal-target-error"
                    : undefined
                }
              />
            </div>

            {touched.target && errors.target && (
              <p
                id="goal-target-error"
                className={styles.errorMessage}
                role="alert"
              >
                <img
                  src="/assets/images/icon-error.svg"
                  alt=""
                  aria-hidden="true"
                />
                {errors.target}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor={deadlineId} className={styles.label}>
              Deadline <span className={styles.optional}>(optional)</span>
            </label>
            <div className={styles.inputWrapper}>
              <img
                src="/assets/images/icon-calendar.svg"
                alt=""
                aria-hidden="true"
                className={styles.inputIcon}
              />
              <input
                id={deadlineId}
                name={deadlineId}
                type="date"
                className={styles.inputInner}
              />
            </div>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create goal
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
