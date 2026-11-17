import * as React from 'react';

/** Native select in the same well as Input, with a caret. */
export interface SelectProps {
  /** Mono uppercase label above the control. */
  label?: string;
  /** Helper text below. */
  hint?: string;
  /** Error message; replaces hint and marks the field invalid. */
  error?: string;
  /** Options to list. */
  options?: Array<string | { value: string; label: string }>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  className?: string;
}

export function Select(props: SelectProps): JSX.Element;
