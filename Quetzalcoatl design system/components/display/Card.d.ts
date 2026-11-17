import * as React from 'react';

/** A plate with one rounded "nose" corner that groups related content. */
export interface CardProps {
  /** Surface. */
  variant?: 'plate'|'outline'|'paper'|'amber'|'orange'|'blue'|'green'|'sky';
  /** Lifts on hover; use when the whole card is a link. */
  interactive?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function Card(props: CardProps): JSX.Element;
