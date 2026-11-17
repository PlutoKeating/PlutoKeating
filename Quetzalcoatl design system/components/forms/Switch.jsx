import React from 'react';
export function Switch({ label, className = '', ...rest }) {
  return <label className={'md-switch ' + className}><input type="checkbox" role="switch" {...rest} /><span>{label}</span></label>;
}
