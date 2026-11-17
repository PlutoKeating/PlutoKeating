import * as React from 'react';

/** Square-cornered label for categories and filters; can be selected or removed. */
export interface TagProps {
  variant?: 'outline'|'solid';
  /** Amber fill for active filters. */
  selected?: boolean;
  /** Shows a remove button. */
  onRemove?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function Tag(props: TagProps): JSX.Element;
