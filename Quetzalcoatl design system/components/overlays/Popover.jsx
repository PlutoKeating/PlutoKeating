import React from 'react';
export function Popover({ trigger, children, align = 'start', defaultOpen = false }) {
  const [open, setOpen] = React.useState(defaultOpen); const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return; const off = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', off); return () => document.removeEventListener('mousedown', off);
  }, [open]);
  return (
    <span ref={ref} className="md-popover-anchor" onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}>
      <span aria-expanded={open} onClick={() => setOpen(!open)}>{trigger}</span>
      {open ? <div className={'md-sheet md-popover' + (align === 'end' ? ' md-popover--end' : '')} role="dialog">{children}</div> : null}
    </span>
  );
}
