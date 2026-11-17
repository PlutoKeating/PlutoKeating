import React from 'react';
function Field({ label, hint, error, id, children }) {
  return (
    <div className={'md-field' + (error ? ' md-field--error' : '')}>
      {label ? <label className="md-field__label" htmlFor={id}>{label}</label> : null}
      {children}
      {error || hint ? <span className="md-field__hint" id={id + '-hint'}>{error || hint}</span> : null}
    </div>
  );
}
export function Select({ label, hint, error, options = [], id, className = '', ...rest }) {
  const auto = React.useId(); const fid = id || auto;
  return (
    <Field label={label} hint={hint} error={error} id={fid}>
      <span className="md-select">
        <select id={fid} className={className} aria-invalid={error ? true : undefined} {...rest}>
          {options.map((o) => { const v = typeof o === 'string' ? { value: o, label: o } : o; return <option key={v.value} value={v.value}>{v.label}</option>; })}
        </select>
        <i className="ph ph-caret-down" aria-hidden="true" />
      </span>
    </Field>
  );
}
