import React, { useEffect, useState } from 'react';
import {
  useCookieConsentPreferenceSet,
  useUpdateCookieConsent,
} from '../../customizations/volto/components/theme/App/CookieConsentProvider';
import { getSiteTitle } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const CookiesHeader = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSiteTitle());
  }, []);

  const siteTitle = useSelector((state) => {
    const blocks = state.rawSiteTitle?.siteTitle?.data?.blocks ?? '';

    let siteTitle = '';
    for (const [key, value] of Object.entries(blocks)) {
      const block = value;
      if (block['@type'] === 'heroHeader') {
        siteTitle = block.title;
        break;
      }
    }
    return siteTitle;
  });
  if (siteTitle === '') {
    return null;
  }
  return (
    <h2 className="govuk-cookie-banner__heading govuk-heading-m">
      Cookies for {siteTitle}
    </h2>
  );
};

const ConfirmationMessage = ({ acceptedOrRejected, onHideClick }) => {
  return (
    <div className="govuk-cookie-banner" data-nosnippet>
      <div className="govuk-cookie-banner__message app-width-container ">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <div className="govuk-cookie-banner__content">
              <p className="govuk-body">
                You’ve {acceptedOrRejected} analytics cookies. You can{' '}
                <a className="govuk-link" href="/cookies">
                  change your cookie settings
                </a>{' '}
                at any time.
              </p>
              {/* Empty p tag below overrides styling applied by semantic-ui site.less to the p:last-child selector */}
              <p />
            </div>
          </div>
        </div>

        <div className="govuk-button-group">
          <button
            onClick={onHideClick}
            className="govuk-button"
            data-module="govuk-button"
          >
            Hide cookie message
          </button>
        </div>
      </div>
    </div>
  );
};

const ConsentForm = ({ handleOnConsentClick }) => {
  return (
    <div className="govuk-cookie-banner__message app-width-container ">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <CookiesHeader />

          <div className="govuk-cookie-banner__content">
            <p className="govuk-body">
              We use some essential cookies to make this service work.
            </p>
            <p className="govuk-body">
              We’d also like to use analytics cookies so we can understand how
              you use the service and make improvements.
            </p>
            {/* Empty p tag below overrides styling applied by cms-ui.site.less to the p:last-child selector */}
            <p />
          </div>
        </div>
      </div>

      <div className="govuk-button-group">
        <button
          value="accept"
          type="button"
          name="cookies"
          className="govuk-button"
          data-module="govuk-button"
          onClick={handleOnConsentClick}
        >
          Accept analytics cookies
        </button>
        <button
          value="reject"
          type="button"
          name="cookies"
          className="govuk-button"
          data-module="govuk-button"
          onClick={handleOnConsentClick}
        >
          Reject analytics cookies
        </button>
        <a className="govuk-link" href="/cookies">
          View cookies
        </a>
      </div>
    </div>
  );
};

const CcCookieBanner = () => {
  const location = useLocation();
  const cookiePreferenceSet = useCookieConsentPreferenceSet();
  const [confirmationState, setConfirmationState] = useState('hidden');
  const updateCookieConsent = useUpdateCookieConsent();

  const [isServerSide, setIsServerSide] = useState(true);

  // We don't render the cookie banner on the server because we don't want it to show for non javascript users
  useEffect(() => {
    setIsServerSide(false);
  }, []);

  const handleOnConsentClick = (e) => {
    e.preventDefault();
    const hasConsent = e.target.value === 'accept';
    hasConsent
      ? setConfirmationState('accepted')
      : setConfirmationState('rejected');

    updateCookieConsent(hasConsent);
  };

  const onHideClick = (e) => {
    e.preventDefault();
    setConfirmationState('hidden');
  };

  if (
    (cookiePreferenceSet === true && confirmationState === 'hidden') ||
    location.pathname === '/cookies'
  ) {
    return null;
  }

  if (confirmationState === 'accepted' || confirmationState === 'rejected') {
    return (
      <ConfirmationMessage
        acceptedOrRejected={confirmationState}
        onHideClick={onHideClick}
      />
    );
  }

  return (
    <div
      className="govuk-cookie-banner"
      hidden={isServerSide}
      data-nosnippet
      role="region"
      aria-label="Cookies on service"
    >
      <ConsentForm handleOnConsentClick={handleOnConsentClick} />
    </div>
  );
};

export default CcCookieBanner;
