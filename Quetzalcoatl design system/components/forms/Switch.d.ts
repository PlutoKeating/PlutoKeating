import * as React from 'react';

/** Sliding toggle with an anodized thumb for settings that apply immediately. */
export interface SwitchProps {
  /** Text beside the control. */
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}

export function Switch(props: SwitchProps): JSX.Element;
