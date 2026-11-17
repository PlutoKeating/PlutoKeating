import * as React from 'react';

/** Small pill that reports status or a count. */
export interface BadgeProps {
  /** count is the solid orange counter without LED. */
  tone?: 'neutral'|'success'|'warning'|'danger'|'info'|'count';
  children?: React.ReactNode;
  className?: string;
}

export function Badge(props: BadgeProps): JSX.Element;
