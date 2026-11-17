import * as React from 'react';

/** Phosphor regular icon by name. */
export interface IconProps {
  /** Phosphor icon name, e.g. "airplane-tilt". */
  name: string;
  /** 16, 20, 24 or 32. Default 20. */
  size?: number;
  /** Accessible name; omit for decorative icons. */
  label?: string;
  className?: string;
}

export function Icon(props: IconProps): JSX.Element;
