import React from 'react';
import classNames from 'classnames';

import LangSwitcher from '../basic/LangSwitcher';
import UserInfo from '../UserInfo';

import staticStyles from './style';
import aurora from '../../images/radiant/aurora.png';

interface FooterProps {
  inside?: boolean;
}

export default function Footer({ inside }: FooterProps) {
  return (
    <>
      <div className="Markets__powered_by">
        <p>powered by</p>
        <img src={aurora} alt="aurora" />
      </div>
      <footer className={classNames('Footer', { Footer__inside: inside })}>
        <UserInfo />
        <LangSwitcher />

        <style jsx={true} global={true}>
          {staticStyles}
        </style>
      </footer>
    </>
  );
}
