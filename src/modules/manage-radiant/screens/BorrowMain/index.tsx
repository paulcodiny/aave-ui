import React from 'react';
import { useIntl } from 'react-intl';
import { PERMISSION } from '@aave/contract-helpers';

import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import messages from './messages';

import PermissionWarning from '../../../../ui-config/branding/PermissionWarning';

export default function ManageRadiantMain() {
  const intl = useIntl();

  return (
    <PermissionWarning requiredPermission={PERMISSION.BORROWER}>
      <ScreenWrapper
        pageTitle={intl.formatMessage(messages.title)}
        isTitleOnDesktop={true}
        withMobileGrayBg={true}
      >
        Placeholder for the page Manage Radiant
      </ScreenWrapper>
    </PermissionWarning>
  );
}
