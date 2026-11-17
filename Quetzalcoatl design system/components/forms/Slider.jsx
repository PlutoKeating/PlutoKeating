import React from 'react';
export function Slider({ value = 50, min = 0, max = 100, label, className = '', style, ...rest }) {
  const pct = ((value - min) / (max - min)) * 100 + '%';
  return <input type="range" className={'md-slider ' + className} min={min} max={max} value={value} aria-label={label} style={{ '--md-val': pct, ...style }} {...rest} />;
}
