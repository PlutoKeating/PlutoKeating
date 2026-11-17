import * as React from 'react';

/** Top navigation bar: wordmark, primary links, trailing actions. */
export interface NavBarProps {
  /** Wordmark or product name. */
  brand?: React.ReactNode;
  /** Primary links. */
  items?: Array<{ id: string; label: string; href?: string }>;
  /** Active item id. */
  value?: string;
  onChange?: (id: string) => void;
  /** Trailing controls. */
  actions?: React.ReactNode;
  className?: string;
}

export function NavBar(props: NavBarProps): JSX.Element;
