import React, { ReactNode } from 'react';
import classNames from 'classnames';

import staticStyles from './style';

interface ContentItemProps {
  className?: string;
  apr?: string;
  title: string | ReactNode;
  description: string | ReactNode;
  children: ReactNode;
}

export default function ContentItem({
  className,
  apr,
  title,
  description,
  children,
}: ContentItemProps) {
  return (
    <>
      <div className={classNames('ManageRadiant__content-item', className)}>
        <div className="ManageRadiant__content-title">
          <h3>{title}</h3>

          {apr && (
            <span>
              APR <strong>{apr}</strong>
            </span>
          )}
        </div>
        <div className="ManageRadiant__content-description">{description}</div>

        <div className="ManageRadiant__content-form">{children}</div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </>
  );
}
