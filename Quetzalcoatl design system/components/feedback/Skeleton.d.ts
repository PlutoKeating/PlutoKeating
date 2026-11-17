import * as React from 'react';

/** Placeholder block shown while content loads; a sunbeam sweeps across it. */
export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  shape?: 'line'|'block'|'circle';
  className?: string;
}

export function Skeleton(props: SkeletonProps): JSX.Element;
