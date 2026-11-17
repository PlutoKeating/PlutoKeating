import * as React from 'react';

/** Mono path trail showing where the page sits. */
export interface BreadcrumbProps {
  /** Last item is the current page. */
  items?: Array<{ label: string; href?: string }>;
  className?: string;
}

export function Breadcrumb(props: BreadcrumbProps): JSX.Element;
