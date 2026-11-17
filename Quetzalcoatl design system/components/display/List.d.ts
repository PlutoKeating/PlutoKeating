import * as React from 'react';

/** Hairline-ruled list with optional leading index numerals. */
export interface ListProps {
  items?: Array<{ title: React.ReactNode; meta?: React.ReactNode; description?: React.ReactNode; href?: string }>;
  /** Shows 01, 02… in mono. */
  ordered?: boolean;
  className?: string;
}

export function List(props: ListProps): JSX.Element;
