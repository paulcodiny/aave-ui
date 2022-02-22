import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useUserWalletDataContext } from '../../libs/web3-data-provider';
import { useMenuContext } from '../../libs/menu';

import messages from './messages';
import staticStyles from './style';

interface ConnectButtonProps {
  className?: string;
  size?: 'small' | 'normal' | 'medium';
  transparent?: boolean;
}

export default function ConnectButton({ className, size = 'normal', transparent = false }: ConnectButtonProps) {
  const intl = useIntl();
  const { currentTheme, sm, isCurrentThemeDark } = useThemeContext();
  const { showSelectWalletModal } = useUserWalletDataContext();
  const { closeMobileMenu } = useMenuContext();

  return (
    <button
      className={classNames('ConnectButton', `ConnectButton__${size}`, className)}
      type="button"
      onClick={() => {
        showSelectWalletModal();
        closeMobileMenu();
      }}
    >
      <div className="ConnectButton__inner">
        <span>{intl.formatMessage(sm ? messages.connectWallet : messages.connect)}</span>
      </div>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .ConnectButton {
          border-radius: 4px;
          border: solid 1px ${currentTheme.purple.hex};
          background: ${transparent ? 'none' : currentTheme.purple.hex};

          &:hover {
            border-color: ${currentTheme.green.hex};
            background: ${transparent ? 'none' : currentTheme.green.hex};
          }

          &__inner {
            color: ${currentTheme.white.hex};

            &:hover {
              color: ${transparent ? currentTheme.white.hex : currentTheme.darkBlue.hex};
            }
          }
        }
      `}</style>
    </button>
  );
}
