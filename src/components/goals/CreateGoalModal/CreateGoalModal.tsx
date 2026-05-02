import { useEffect } from "react";
import { useGoalsStore } from "../../../store/useGoalsStore";
import { Button } from "../../common/Button/Button";
import styles from "./CreateGoalModal.module.css";

interface CreateGoalModalProps {
  onClose: () => void;
}

export function CreateGoalModal({
  onClose,
}: CreateGoalModalProps): React.JSX.Element {
  const addGoal = useGoalsStore((state) => state.addGoal);

  // TODO: Initialize state for form values
  // const [values, setValues] = useState({ name: "", target: "", deadline: "" });

  // TODO: Initialize state for validation errors (only required fields need errors)
  // const [errors, setErrors] = useState({ name: "", target: "" });

  // TODO: Initialize state for touched fields
  // No built-in React API for this — you manage it manually with useState.
  // A field becomes "touched" when the user leaves it (onBlur).
  // On submit, you mark all fields as touched so errors show for untouched fields too.
  // const [touched, setTouched] = useState({ name: false, target: false });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // TODO: Implement validate() — returns a new errors object
  // Rules: name is required, target is required and must be > 0
  // const validate = () => { ... };

  // TODO: Implement handleChange(field, value) — updates the matching key in values state
  // const handleChange = (...) => { ... };

  // TODO: Implement handleBlur(field) — marks the field as touched, then runs validate()
  // and updates the errors state for that field only
  // const handleBlur = (...) => { ... };

  // TODO: Implement handleSubmit — marks ALL fields as touched, runs validate(),
  // if no errors: call addGoal with { name, target: Number(target), deadline: deadline || null }
  // then call onClose()
  // const handleSubmit = (e: React.FormEvent) => { ... };

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
        <form
          onSubmit={/* TODO: handleSubmit */ undefined}
          noValidate
          className={styles.form}
        >
          {/* Goal name */}
          <div className={styles.field}>
            <label htmlFor="goal-name" className={styles.label}>
              Goal name
            </label>
            <input
              id="goal-name"
              type="text"
              placeholder="e.g. MacBook Pro M4"
              className={`${styles.input} ${
                /* TODO: touched.name && errors.name ? styles.inputError : "" */ ""
              }`}
              value={/* TODO */ ""}
              onChange={/* TODO */ undefined}
              onBlur={/* TODO */ undefined}
              aria-describedby={
                /* TODO: touched.name && errors.name ? "goal-name-error" : undefined */ undefined
              }
            />
            {/* TODO: replace `false` with: touched.name && errors.name */}
            {false && (
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
                Goal name is required
              </p>
            )}
          </div>

          {/* Target amount */}
          <div className={styles.field}>
            <label htmlFor="goal-target" className={styles.label}>
              Target amount
            </label>
            <div
              className={`${styles.inputWrapper} ${
                /* TODO: touched.target && errors.target ? styles.inputWrapperError : "" */ ""
              }`}
            >
              <img
                src="/assets/images/icon-dollar.svg"
                alt=""
                aria-hidden="true"
                className={styles.inputIcon}
              />
              <input
                id="goal-target"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                className={styles.inputInner}
                value={/* TODO */ ""}
                onChange={/* TODO */ undefined}
                onBlur={/* TODO */ undefined}
                aria-describedby={/* TODO */ undefined}
              />
            </div>
            {/* TODO: replace `false` with: touched.target && errors.target */}
            {false && (
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
                Target amount must be greater than $0
              </p>
            )}
          </div>

          {/* Deadline (optional) */}
          <div className={styles.field}>
            <label htmlFor="goal-deadline" className={styles.label}>
              Deadline{" "}
              <span className={styles.optional}>(optional)</span>
            </label>
            <div className={styles.inputWrapper}>
              <img
                src="/assets/images/icon-calendar.svg"
                alt=""
                aria-hidden="true"
                className={styles.inputIcon}
              />
              <input
                id="goal-deadline"
                type="date"
                className={styles.inputInner}
                value={/* TODO */ ""}
                onChange={/* TODO */ undefined}
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
