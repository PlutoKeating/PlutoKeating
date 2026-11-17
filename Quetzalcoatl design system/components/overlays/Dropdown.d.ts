import * as React from 'react';

/** A button that opens a Menu of actions beneath it. */
export interface DropdownProps {
  /** Button label. */
  label?: string;
  /** Menu rows. */
  items?: Array<{ id?: string; label?: string; icon?: string; shortcut?: string; danger?: boolean; disabled?: boolean; separator?: boolean }>;
  onSelect?: (id: string) => void;
  /** Button variant. Default secondary. */
  variant?: 'primary'|'accent'|'secondary'|'ghost';
  align?: 'start'|'end';
  className?: string;
}

export function Dropdown(props: DropdownProps): JSX.Element;
