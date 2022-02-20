import React from 'react';

import DefaultButton from '../../../../components/basic/DefaultButton';
import ContentItem from '../ContentItem';

import iconCoins from '../../images/icon-coins.svg';
import staticStyles from './style';

export function ContentItemHelp() {
  return (
    <>
      <ContentItem
        className="ManageRadiant__content-help"
        title="Help"
        description={
          <p>
            Looking for some help?
            <br /> Visit our docs or join our Telegram
          </p>
        }
      >
        <DefaultButton
          title="Docs"
          mobileBig={true}
          size="medium"
          type="submit"
          color="purple"
          transparent
        />
      </ContentItem>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .ManageRadiant__content-help h3:after {
          background: url(${iconCoins}) no-repeat;
        }
      `}</style>
    </>
  );
}
