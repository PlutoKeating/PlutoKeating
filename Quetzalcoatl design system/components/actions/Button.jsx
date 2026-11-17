import React from 'react';
export function Button({ variant = 'primary', size = 'md', icon, iconEnd, loading, block, disabled, children, className = '', ...rest }) {
  const cls = ['md-btn', 'md-btn--' + variant, 'md-btn--' + size, block && 'md-btn--block', className].filter(Boolean).join(' ');
  return (
    <button className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading ? <span className="md-led-chase" aria-hidden="true"><i /><i /><i /></span> : icon ? <i className={'ph ph-' + icon} aria-hidden="true" /> : null}
      <span>{children}</span>
      {iconEnd ? <i className={'ph ph-' + iconEnd} aria-hidden="true" /> : null}
    </button>
  );
}
