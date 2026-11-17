import * as React from 'react';

/** Transient resin sheet confirming something that just happened. */
export interface ToastProps {
  /** LED colour. */
  tone?: 'success'|'info'|'warning'|'danger';
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  /** Show the 5s drain bar. Default true. */
  timer?: boolean;
  className?: string;
}

export function Toast(props: ToastProps): JSX.Element;
