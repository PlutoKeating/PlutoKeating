import * as React from 'react';

/** Ruled data table: mono caps header on a 2px rule, hairline rows. */
export interface TableProps {
  columns?: Array<{ key: string; label: string; numeric?: boolean }>;
  rows?: Array<Record<string, React.ReactNode> & { id?: string }>;
  /** Highlights a row. */
  selectedId?: string;
  dense?: boolean;
  onRowClick?: (row: any) => void;
  className?: string;
}

export function Table(props: TableProps): JSX.Element;
