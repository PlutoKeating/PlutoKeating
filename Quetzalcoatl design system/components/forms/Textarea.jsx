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
export function Textarea({ label, hint, error, id, className = '', ...rest }) {
  const auto = React.useId(); const fid = id || auto;
  return <Field label={label} hint={hint} error={error} id={fid}><textarea id={fid} className={'md-textarea ' + className} aria-invalid={error ? true : undefined} aria-describedby={error || hint ? fid + '-hint' : undefined} {...rest} /></Field>;
}
