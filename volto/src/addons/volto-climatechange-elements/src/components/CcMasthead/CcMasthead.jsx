import React from 'react';
import { Link } from 'react-router-dom';
import { PhaseBanner } from 'govuk-react-jsx';
import { CcPhaseBannerWrapper } from '../CcPhaseBannerWrapper/CcPhaseBannerWrapper';

export const CcMasthead = ({ children, className, shouldDisplayPhaseBanner }) => (
  <div className={`app-masthead ${className || ''}`}>
    <div className="app-width-container">
    {shouldDisplayPhaseBanner ? (
        <CcPhaseBannerWrapper className={'cc-phasebanner-masthead'} />
      ) : null}
      <div className="app-masthead__grid-row">{children}</div>
    </div>
  </div>
);
