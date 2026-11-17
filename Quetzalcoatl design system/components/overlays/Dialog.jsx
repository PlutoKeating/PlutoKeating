import React from 'react';
export function Dialog({ open, onClose, title, eyebrow, children, footer, modal = true }) {
  const ref = React.useRef(null); const id = React.useId();
  React.useEffect(() => { if (open && ref.current) ref.current.focus(); }, [open]);
  if (!open) return null;
  return (
    <div className={'md-scrim' + (modal ? '' : ' md-scrim--clear')} onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }} onKeyDown={(e) => { if (e.key === 'Escape' && onClose) onClose(); }}>
      <div ref={ref} className="md-paper md-dialog" role="dialog" aria-modal={modal} aria-labelledby={id} tabIndex={-1}>
        <div className="md-dialog__head">
          <div>{eyebrow ? <div className="md-label">{eyebrow}</div> : null}<h2 className="md-dialog__title" id={id}>{title}</h2></div>
          <button className="md-iconbtn md-iconbtn--ghost md-iconbtn--sm" aria-label="Close" onClick={onClose}><i className="ph ph-x" aria-hidden="true" /></button>
        </div>
        <div className="md-dialog__body">{children}</div>
        {footer ? <div className="md-dialog__foot">{footer}</div> : null}
      </div>
    </div>
  );
}
