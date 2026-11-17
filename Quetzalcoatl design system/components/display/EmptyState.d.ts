import * as React from 'react';

/** Sun rising over a horizon line, with a title, a sentence and one action. */
export interface EmptyStateProps {
  title?: string;
  /** One sentence of guidance. */
  children?: React.ReactNode;
  /** A single Button. */
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState(props: EmptyStateProps): JSX.Element;
