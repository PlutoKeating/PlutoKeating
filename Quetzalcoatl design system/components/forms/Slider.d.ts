import * as React from 'react';

/** Range control with an anodized thumb and amber fill. */
export interface SliderProps {
  /** Current value. */
  value?: number;
  /** Default 0. */
  min?: number;
  /** Default 100. */
  max?: number;
  step?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Accessible name. */
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Slider(props: SliderProps): JSX.Element;
