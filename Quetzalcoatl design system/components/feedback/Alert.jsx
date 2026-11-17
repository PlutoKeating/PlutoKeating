import React from 'react';
export function Alert({ tone = 'info', title, children, onClose, className = '' }) {
  const icon = { info: 'info', success: 'check-circle', warning: 'warning', danger: 'x-circle' }[tone];
  return (
    <div className={'md-alert' + (tone !== 'info' ? ' md-alert--' + tone : '') + ' ' + className} role={tone === 'danger' || tone === 'warning' ? 'alert' : 'status'}>
      <span className="md-alert__icon"><i className={'ph ph-' + icon} aria-hidden="true" /></span>
      <div className="md-alert__body">{title ? <div className="md-alert__title">{title}</div> : null}{children}</div>
      {onClose ? <button className="md-iconbtn md-iconbtn--ghost md-iconbtn--sm md-alert__close" aria-label="Dismiss" onClick={onClose}><i className="ph ph-x" aria-hidden="true" /></button> : null}
    </div>
  );
}
