import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';
import GradientLine from '../../basic/GradientLine';

import staticStyles from './style';

interface RepayWithdrawWrapperProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function RepayWithdrawWrapper({
  title,
  children,
  className,
}: RepayWithdrawWrapperProps) {
  const { currentTheme, sm } = useThemeContext();

  return (
    <div className={classNames('RepayWithdrawWrapper', className)}>
      <div className="RepayWithdrawWrapper__content">{children}</div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .RepayWithdrawWrapper {
        }
      `}</style>
    </div>
  );
}
