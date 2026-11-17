import * as React from 'react';

/** Inline message that stays in the page flow, marked by a solid icon tile. */
export interface AlertProps {
  tone?: 'info'|'success'|'warning'|'danger';
  title?: string;
  /** Message. */
  children?: React.ReactNode;
  /** Shows a dismiss button. */
  onClose?: () => void;
  className?: string;
}

export function Alert(props: AlertProps): JSX.Element;
