import React from 'react';
export function Icon({ name, size = 20, label, className = '', style, ...rest }) {
  return <i className={'ph ph-' + name + ' ' + className} style={{ fontSize: size, ...style }} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} {...rest} />;
}
