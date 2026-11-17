import React from 'react';
export function Tag({ variant = 'outline', selected, onRemove, children, className = '', ...rest }) {
  const cls = ['md-tag', variant === 'solid' && 'md-tag--solid', selected && 'md-tag--selected', className].filter(Boolean).join(' ');
  return <span className={cls} {...rest}>{children}{onRemove ? <button className="md-tag__remove" aria-label={'Remove ' + (typeof children === 'string' ? children : 'tag')} onClick={onRemove}><i className="ph ph-x" aria-hidden="true" /></button> : null}</span>;
}
