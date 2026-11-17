import * as React from 'react';

/** Square tick box for independent on/off choices in a list. */
export interface CheckboxProps {
  /** Text beside the control. */
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  /** Mixed state for parent rows. */
  indeterminate?: boolean;
  className?: string;
}

export function Checkbox(props: CheckboxProps): JSX.Element;
