import React from 'react';
import { Link } from 'react-router-dom';
import { PhaseBanner } from 'govuk-react-jsx';

export const CcMasthead = ({
  children,
  className,
  shouldDisplayPhaseBanner,
  phaseBannerStage,
  phaseBannerLinkAddress,
}) => (
  <div className={`app-masthead ${className || ''}`}>
    <div className="app-width-container">
      {shouldDisplayPhaseBanner ? (
        <div>
          <PhaseBanner
            className="cc-phasebanner-masthead"
            tag={{
              children: phaseBannerStage,
            }}
          >
            This is a new service your{' '}
            <Link
              to="#"
              onClick={(e) => {
                window.location.href = phaseBannerLinkAddress; //'mailto:climate.change@ons.gov.uk';
                e.preventDefault();
              }}
              style={{ textDecorationLine: 'underline' }}
            >
              feedback
            </Link>{' '}
            will help us improve it.
          </PhaseBanner>
        </div>
      ) : null}
      <div className="app-masthead__grid-row">{children}</div>
    </div>
  </div>
);
