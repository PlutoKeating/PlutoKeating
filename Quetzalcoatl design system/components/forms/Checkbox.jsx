import React from 'react';
export function Checkbox({ label, indeterminate, className = '', ...rest }) {
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = !!indeterminate; }, [indeterminate]);
  return <label className={'md-check ' + className}><input ref={ref} type="checkbox" {...rest} /><span>{label}</span></label>;
}
