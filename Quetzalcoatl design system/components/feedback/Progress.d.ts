import * as React from 'react';

/** Segmented bar that fills in steps, like an early download meter. */
export interface ProgressProps {
  /** 0 to 100. Omit for indeterminate. */
  value?: number;
  tone?: 'primary'|'success';
  size?: 'sm'|'md';
  /** Accessible name. */
  label?: string;
  className?: string;
}

export function Progress(props: ProgressProps): JSX.Element;
