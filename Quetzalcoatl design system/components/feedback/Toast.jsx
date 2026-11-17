import React from 'react';
export function Toast({ tone = 'success', title, children, onClose, timer = true, className = '' }) {
  return (
    <div className={'md-sheet md-toast md-toast--' + tone + ' ' + className} role={tone === 'danger' ? 'alert' : 'status'}>
      <span className="md-toast__led" aria-hidden="true" />
      <div><div className="md-toast__title">{title}</div>{children ? <div className="md-toast__text">{children}</div> : null}</div>
      {onClose ? <button className="md-iconbtn md-iconbtn--ghost md-iconbtn--sm" style={{ color: 'inherit' }} aria-label="Dismiss" onClick={onClose}><i className="ph ph-x" aria-hidden="true" /></button> : null}
      {timer ? <span className="md-toast__timer" aria-hidden="true" /> : null}
    </div>
  );
}
