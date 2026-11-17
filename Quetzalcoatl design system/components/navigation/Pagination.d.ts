import * as React from 'react';

/** Numeric page stepper set in expanded numerals. */
export interface PaginationProps {
  /** Current page (1-based). */
  page?: number;
  /** Total pages. */
  count?: number;
  onChange?: (page: number) => void;
  className?: string;
}

export function Pagination(props: PaginationProps): JSX.Element;
