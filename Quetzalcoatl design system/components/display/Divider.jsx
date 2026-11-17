import React from 'react';
export function Divider({ variant = 'hair', children, className = '' }) {
  if (variant === 'labeled') return <div className={'md-divider md-divider--labeled ' + className} role="separator">{children}</div>;
  return <hr className={'md-divider' + (variant !== 'hair' ? ' md-divider--' + variant : '') + ' ' + className} />;
}
