import React from 'react';
export function Drawer({ open, onClose, title, eyebrow, side = 'right', children, footer }) {
  const ref = React.useRef(null); const id = React.useId();
  React.useEffect(() => { if (open && ref.current) ref.current.focus(); }, [open]);
  if (!open) return null;
  return (
    <div className="md-scrim" style={{ zIndex: 'var(--md-z-drawer)' }} onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }} onKeyDown={(e) => { if (e.key === 'Escape' && onClose) onClose(); }}>
      <aside ref={ref} className={'md-paper md-drawer' + (side === 'left' ? ' md-drawer--left' : '')} role="dialog" aria-modal="true" aria-labelledby={id} tabIndex={-1}>
        <div className="md-dialog__head">
          <div>{eyebrow ? <div className="md-label">{eyebrow}</div> : null}<h2 className="md-dialog__title" id={id}>{title}</h2></div>
          <button className="md-iconbtn md-iconbtn--ghost md-iconbtn--sm" aria-label="Close" onClick={onClose}><i className="ph ph-x" aria-hidden="true" /></button>
        </div>
        <div className="md-dialog__body">{children}</div>
        {footer ? <div className="md-dialog__foot">{footer}</div> : null}
      </aside>
    </div>
  );
}
