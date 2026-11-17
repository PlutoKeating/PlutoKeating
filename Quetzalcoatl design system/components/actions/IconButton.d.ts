import * as React from 'react';

/** Round key holding a single icon; use for compact, well-known actions. */
export interface IconButtonProps {
  /** Phosphor icon name. */
  icon: string;
  /** Accessible name (required). */
  label: string;
  /** chrome uses the anodized material. */
  variant?: 'neutral'|'primary'|'chrome'|'ghost';
  size?: 'sm'|'md'|'lg';
  disabled?: boolean;
  className?: string;
}

export function IconButton(props: IconButtonProps): JSX.Element;
