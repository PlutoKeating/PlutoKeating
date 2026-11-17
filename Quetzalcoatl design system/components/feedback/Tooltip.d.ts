import * as React from 'react';

/** Short mono caption that names a control on hover or focus. */
export interface TooltipProps {
  /** Caption. */
  text?: string;
  /** Trigger element. */
  children?: React.ReactNode;
  className?: string;
}

export function Tooltip(props: TooltipProps): JSX.Element;
