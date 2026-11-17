import * as React from 'react';

/** Capsule key for the main actions of a view; presses down 2px like a hardware key. */
export interface ButtonProps {
  /** Visual weight. Default primary (amber). */
  variant?: 'primary'|'accent'|'secondary'|'ghost'|'danger';
  /** Control height 28/36/44/56. */
  size?: 'sm'|'md'|'lg'|'xl';
  /** Phosphor icon name shown before the label. */
  icon?: string;
  /** Phosphor icon name shown after the label. */
  iconEnd?: string;
  /** Shows the LED chase and blocks input. */
  loading?: boolean;
  /** Fill the container width. */
  block?: boolean;
  disabled?: boolean;
  /** Label. */
  children?: React.ReactNode;
  className?: string;
}

export function Button(props: ButtonProps): JSX.Element;
