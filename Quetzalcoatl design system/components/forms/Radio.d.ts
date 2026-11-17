import * as React from 'react';

/** Round selector for one choice out of a small set. */
export interface RadioProps {
  /** Text beside the control. */
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  /** Group name. */
  name?: string;
  value?: string;
  className?: string;
}

export function Radio(props: RadioProps): JSX.Element;
