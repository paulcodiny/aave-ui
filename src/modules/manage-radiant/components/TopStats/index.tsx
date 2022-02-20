import React, { ReactNode } from 'react';
import staticStyles from './style';

interface TopStatsProps {
  title: string;
  value: string;
  children?: ReactNode;
}

export function TopStats({ title, value, children }: TopStatsProps) {
  return (
    <>
      <div className="TopStats">
        <h3>{title}</h3>
        <span>{value}</span>
        {children}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </>
  );
}
