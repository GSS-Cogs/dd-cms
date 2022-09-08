import React, { useEffect, useState } from 'react';
import {
  useCookieConsentPreferenceSet,
  useUpdateCookieConsent,
} from '../../customizations/volto/components/theme/App/CookieConsentProvider';
import { getSiteTitle } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const CookiesHeader = () => {
  const [title, setTitle] = useState('Climate');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSiteTitle());
  }, []);

  useEffect(() => {
    setTitle(siteTitle);
    console.log('setting title' + siteTitle);
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

const CcCookieBanner = () => {
  const location = useLocation();
  const cookiePreferenceSet = useCookieConsentPreferenceSet();
  const updateCookieConsent = useUpdateCookieConsent();

  if (cookiePreferenceSet === true || location.pathname === '/cookies') {
    return null;
  }

  return (
    <div
      className="govuk-cookie-banner "
      data-nosnippet
      role="region"
      aria-label="Cookies on service"
    >
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
            onClick={() => updateCookieConsent(true)}
          >
            Accept analytics cookies
          </button>
          <button
            value="reject"
            type="button"
            name="cookies"
            className="govuk-button"
            data-module="govuk-button"
            onClick={() => updateCookieConsent(false)}
          >
            Reject analytics cookies
          </button>
          <a className="govuk-link" href="/cookies">
            View cookies
          </a>
        </div>
      </div>
    </div>
  );
};

export default CcCookieBanner;
