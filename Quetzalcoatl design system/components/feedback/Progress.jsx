import React from 'react';
export function Progress({ value, tone = 'primary', size = 'md', label, className = '' }) {
  const ind = value == null;
  const cls = ['md-progress', tone === 'success' && 'md-progress--success', size === 'sm' && 'md-progress--sm', ind && 'md-progress--indeterminate', className].filter(Boolean).join(' ');
  return <div className={cls} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={ind ? undefined : value}><i style={ind ? undefined : { width: value + '%' }} /></div>;
}
