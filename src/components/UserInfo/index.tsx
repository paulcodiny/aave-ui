import React from 'react';
import classNames from 'classnames';

import staticStyles from './style';

export default function UserInfo() {
  const userStats = [
    { value: 245.19, text: 'added in platform fees', time: '12 mins ago' },
    { value: 546.31, text: 'added in platform fees', time: '16 mins ago' },
    { value: 1343.76, text: 'added in platform fees', time: '18 mins ago' },
  ];

  return (
    <div className={classNames('UserInfo')}>
      <div className={classNames('UserInfo__stats')}>
        {userStats.map(({ value, text, time }) => (
          <p className={classNames('UserInfo__item')}>
            <span className={classNames('UserInfo__value')}>$ {value}</span>
            <span className={classNames('UserInfo__text')}>{text}</span>{' '}
            <span className={classNames('UserInfo__time')}>{time}</span>
          </p>
        ))}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
