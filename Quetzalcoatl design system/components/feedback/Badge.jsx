import React from 'react';
export function Badge({ tone = 'neutral', children, className = '', ...rest }) {
  return <span className={'md-badge' + (tone !== 'neutral' ? ' md-badge--' + tone : '') + ' ' + className} {...rest}>{children}</span>;
}
