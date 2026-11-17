import React from 'react';
export function Table({ columns = [], rows = [], selectedId, dense, onRowClick, className = '' }) {
  return (
    <div className="md-table-wrap"><table className={'md-table' + (dense ? ' md-table--dense' : '') + ' ' + className}>
      <thead><tr>{columns.map((c) => <th key={c.key} scope="col" className={c.numeric ? 'md-num' : undefined}>{c.label}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={r.id || i} aria-selected={selectedId != null && r.id === selectedId ? true : undefined} onClick={onRowClick ? () => onRowClick(r) : undefined}>{columns.map((c) => <td key={c.key} className={c.numeric ? 'md-num' : undefined}>{r[c.key]}</td>)}</tr>)}</tbody>
    </table></div>
  );
}
