import React from 'react';
export function Avatar({ name = '', src, size = 'md', tone = 'sky', online, className = '' }) {
  const initials = name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  const cls = ['md-avatar', size !== 'md' && 'md-avatar--' + size, tone !== 'sky' && 'md-avatar--' + tone, className].filter(Boolean).join(' ');
  return <span className={cls} aria-label={src ? undefined : name}>{src ? <img src={src} alt={name} /> : initials}{online ? <span className="md-avatar__status" title="Online" /> : null}</span>;
}
