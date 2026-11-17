import * as React from 'react';

/** Paper sheet centred over the page. modal (default) blocks the page with a scrim; non-modal leaves it usable. */
export interface DialogProps {
  open?: boolean;
  /** Called on Esc, scrim click and close button. */
  onClose?: () => void;
  title?: string;
  /** Mono caps line above the title. */
  eyebrow?: string;
  /** Body. */
  children?: React.ReactNode;
  /** Buttons, right-aligned; primary last. */
  footer?: React.ReactNode;
  /** Default true. false removes the scrim (plain Dialog). */
  modal?: boolean;
  className?: string;
}

export function Dialog(props: DialogProps): JSX.Element;
