import * as React from 'react';

/** Paper panel that slides in from the edge like a disc tray, for side tasks that keep page context. */
export interface DrawerProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  eyebrow?: string;
  side?: 'right'|'left';
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Drawer(props: DrawerProps): JSX.Element;
