import React from 'react';
import { CcCookieConsentView } from './CcCookieConsentView';
import { SidebarPortal } from '@plone/volto/components';

export const CcCookieConsentEdit = (props) => {
  const { selected, onChangeBlock, block, data } = props;
  return (
    <div>
      <SidebarPortal selected={selected}>
        <header className="header pulled">
          <h2>Cookie consent block</h2>
        </header>
      </SidebarPortal>
      <CcCookieConsentView {...props} />
    </div>
  );
};
