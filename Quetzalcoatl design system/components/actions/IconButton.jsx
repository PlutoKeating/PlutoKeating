import React from 'react';
export function IconButton({ icon, label, variant = 'neutral', size = 'md', className = '', ...rest }) {
  const cls = ['md-iconbtn', variant !== 'neutral' && 'md-iconbtn--' + variant, size !== 'md' && 'md-iconbtn--' + size, className].filter(Boolean).join(' ');
  return <button className={cls} aria-label={label} title={label} {...rest}><i className={'ph ph-' + icon} aria-hidden="true" /></button>;
}
