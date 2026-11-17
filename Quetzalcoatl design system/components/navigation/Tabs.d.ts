import * as React from 'react';

/** Folder tabs that switch between sibling views. */
export interface TabsProps {
  items?: Array<{ id: string; label: string; disabled?: boolean }>;
  /** Selected tab id. */
  value?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function Tabs(props: TabsProps): JSX.Element;
