import React from 'react';
export function Tooltip({ text, children, className = '' }) {
  const id = React.useId();
  return <span className={'md-tip ' + className} aria-describedby={id}>{children}<span id={id} role="tooltip" className="md-sheet md-tooltip">{text}</span></span>;
}
