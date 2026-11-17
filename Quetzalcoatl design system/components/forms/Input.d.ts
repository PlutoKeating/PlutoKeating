import * as React from 'react';

/** Single-line text field set in a sunken well. */
export interface InputProps {
  /** Mono uppercase label above the control. */
  label?: string;
  /** Helper text below. */
  hint?: string;
  /** Error message; replaces hint and marks the field invalid. */
  error?: string;
  size?: 'sm'|'md'|'lg';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Input(props: InputProps): JSX.Element;
