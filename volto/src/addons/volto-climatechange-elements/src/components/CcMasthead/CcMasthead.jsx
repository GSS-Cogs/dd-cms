import React from 'react';
import { Link } from 'react-router-dom';
import { PhaseBanner } from 'govuk-react-jsx';
import { CcPhaseBannerWrapper } from '../CcPhaseBannerWrapper/CcPhaseBannerWrapper';

export const CcMasthead = ({ children, className }) => (
  <div className={`app-masthead ${className || ''}`}>
    <div className="app-width-container">
      <CcPhaseBannerWrapper className={'cc-phasebanner-masthead'} />
      <div className="app-masthead__grid-row">{children}</div>
    </div>
  </div>
);
