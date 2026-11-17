import * as React from 'react';

/** Resin sheet anchored to a trigger, for short supporting content or a few controls. */
export interface PopoverProps {
  /** Element that toggles the popover. */
  trigger?: React.ReactNode;
  /** Content. */
  children?: React.ReactNode;
  align?: 'start'|'end';
  defaultOpen?: boolean;
  className?: string;
}

export function Popover(props: PopoverProps): JSX.Element;
