import React from 'react';
import classNames from 'classnames';

interface GradientLineProps {
  size?: number;
  direction?: 'horizontal' | 'vertical';
}

export default function GradientLine({ size, direction = 'horizontal' }: GradientLineProps) {
  return (
    <span className={classNames('GradientLine', `GradientLine__${direction}`)}>
      <style jsx={true}>{`
        .GradientLine {
          display: block;
          background-color: #e2e2e2;

          &__horizontal {
            width: 100%;
            height: ${size || 1}px;
          }

          &__vertical {
            width: ${size || 1}px;
          }
        }
      `}</style>
    </span>
  );
}
