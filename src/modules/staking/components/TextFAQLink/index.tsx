import React from 'react';
import { useIntl } from 'react-intl';

import Link from '../../../../components/basic/Link';
import TailArrow from '../../../../components/basic/TailArrow';

import messages from './messages';
import staticStyles from './style';

import { faqLink } from '../../index';

export default function TextFAQLink() {
  const intl = useIntl();

  return (
    <div className="TextFAQLink">
      <Link
        to={faqLink}
        className="TextFAQLink__link ButtonLink"
        absolute={true}
        inNewWindow={true}
        color="dark"
      >
        <span>{intl.formatMessage(messages.title)}</span>
        <TailArrow className="TextFAQLink__arrow" type="left" color="dark" />
      </Link>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
