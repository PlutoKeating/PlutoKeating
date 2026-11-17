import * as React from 'react';

/** Rule between sections: hairline, strong, horizon or labelled. */
export interface DividerProps {
  /** horizon is a hairline with a 96px amber lead. */
  variant?: 'hair'|'strong'|'horizon'|'labeled'|'vertical';
  /** Label for the labeled variant. */
  children?: React.ReactNode;
  className?: string;
}

export function Divider(props: DividerProps): JSX.Element;
