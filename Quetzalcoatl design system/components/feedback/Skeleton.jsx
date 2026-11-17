import React from 'react';
export function Skeleton({ width = '100%', height, shape = 'line', className = '', style }) {
  return <span className={'md-skeleton' + (shape !== 'line' ? ' md-skeleton--' + shape : '') + ' ' + className} aria-hidden="true" style={{ width, height, ...style }} />;
}
