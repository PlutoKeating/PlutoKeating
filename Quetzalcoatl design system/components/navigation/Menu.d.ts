import * as React from 'react';

/** Floating resin sheet listing actions. */
export interface MenuProps {
  /** Rows; use { separator: true } for a rule. */
  items?: Array<{ id?: string; label?: string; icon?: string; shortcut?: string; danger?: boolean; disabled?: boolean; separator?: boolean }>;
  onSelect?: (id: string) => void;
  className?: string;
}

export function Menu(props: MenuProps): JSX.Element;
