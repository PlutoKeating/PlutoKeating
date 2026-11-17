import * as React from 'react';

/** Round portrait or initials with a keyline. */
export interface AvatarProps {
  /** Used for initials and alt text. */
  name?: string;
  /** Image URL. */
  src?: string;
  /** 24/36/56. */
  size?: 'sm'|'md'|'lg';
  /** Background for initials. */
  tone?: 'sky'|'amber'|'orange'|'green'|'silver';
  /** Shows the green status LED. */
  online?: boolean;
  className?: string;
}

export function Avatar(props: AvatarProps): JSX.Element;
