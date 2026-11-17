import * as React from 'react';

/** Multi-line text field; resizes vertically. */
export interface TextareaProps {
  /** Mono uppercase label above the control. */
  label?: string;
  /** Helper text below. */
  hint?: string;
  /** Error message; replaces hint and marks the field invalid. */
  error?: string;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  className?: string;
}

export function Textarea(props: TextareaProps): JSX.Element;
