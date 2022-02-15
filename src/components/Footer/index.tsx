import React from 'react';
import classNames from 'classnames';

import LangSwitcher from '../basic/LangSwitcher';
import UserInfo from '../UserInfo';

import staticStyles from './style';

interface FooterProps {
  inside?: boolean;
}

export default function Footer({ inside }: FooterProps) {
  return (
    <>
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
