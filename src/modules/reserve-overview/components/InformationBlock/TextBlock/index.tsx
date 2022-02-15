import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';

import BlockWrapper, { BlockWrapperProps } from '../BlockWrapper';

import messages from './messages';
import staticStyles from './style';

interface TextBlockProps extends Pick<BlockWrapperProps, 'title'> {
  condition: boolean;
}

export default function TextBlock({ condition, title }: TextBlockProps) {
  const intl = useIntl();

  return (
    <BlockWrapper title={title}>
      <p className={classNames('TextBlock', { TextBlockYes: condition })}>
        {intl.formatMessage(condition ? messages.yes : messages.no)}
      </p>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .TextBlock {
          color: #000000;
        }
        .TextBlockYes {
          color: #000000;
        }
      `}</style>
    </BlockWrapper>
  );
}
