import * as React from 'react';

/** Framed picture with a nose corner, optional duotone treatment and mono caption. */
export interface ImageProps {
  /** Omit to show the striped placeholder. */
  src?: string;
  alt?: string;
  caption?: string;
  /** duotone multiplies a greyscale image over amber. */
  treatment?: 'natural'|'duotone';
  /** CSS aspect-ratio. Default "4 / 3". */
  ratio?: string;
  /** Text shown when src is missing. */
  placeholder?: string;
  className?: string;
}

export function Image(props: ImageProps): JSX.Element;
