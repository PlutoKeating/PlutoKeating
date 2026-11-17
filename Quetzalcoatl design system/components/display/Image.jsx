import React from 'react';
export function Image({ src, alt = '', caption, treatment = 'natural', ratio = '4 / 3', placeholder = 'Image', className = '' }) {
  return (
    <figure className={'md-image' + (treatment === 'duotone' ? ' md-image--duotone' : '') + ' ' + className}>
      <div className="md-image__frame" style={{ aspectRatio: ratio }}>{src ? <img src={src} alt={alt} /> : <div className="md-image__placeholder">{placeholder}</div>}</div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
