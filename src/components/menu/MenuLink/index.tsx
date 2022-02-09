import React from 'react';
import classNames from 'classnames';
import { gradient, useThemeContext } from '@aave/aave-ui-kit';

import goToTop from '../../../helpers/goToTop';
import Link from '../../basic/Link';

import staticStyles from './style';

interface MenuLinkProps {
  to: string;
  title: string;
  isActive: boolean;
  hidden?: boolean;
}

export default function MenuLink({ to, title, isActive, hidden }: MenuLinkProps) {
  const { currentTheme } = useThemeContext();

  return (
    <Link
      to={to}
      className={classNames('MenuLink ButtonLink', {
        MenuLink__active: isActive,
        MenuLink__hidden: hidden,
      })}
      onClick={() => goToTop()}
    >
      <div className="MenuLink__title">
        <p>
          <b>{title}</b> <strong>{title}</strong>
        </p>{' '}
        <i />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .MenuLink {
          opacity: 0.5;
          color: ${currentTheme.white.hex} !important;

          &__active {
            opacity: 1;
          }

          .MenuLink__title {
            i {
              background: #7159ff !important;
            }
          }
        }
      `}</style>
    </Link>
  );
}
