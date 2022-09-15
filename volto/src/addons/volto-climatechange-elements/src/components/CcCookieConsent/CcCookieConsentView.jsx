import React, { useEffect, useState } from 'react';
import {
  useCookieConsent,
  useUpdateCookieConsent,
} from '../../customizations/volto/components/theme/App/CookieConsentProvider';

export const CcCookieConsentView = ({ data }) => {
  const updateCookieConsent = useUpdateCookieConsent();
  const cookieConsent = useCookieConsent();

  const initialValue = cookieConsent.usage ? true : false;

  const [value, setValue] = useState(initialValue);

  const onChangeValue = (e) => {
    setValue(e.target.value === 'true');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateCookieConsent(value);
  };

  return (
    <div className="cc-cookie-consent">
      <form onSubmit={onSubmit}>
        <div className="govuk-form-group">
          <fieldset className="govuk-fieldset">
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--s">
              <h1 className="govuk-fieldset__heading">
                Do you want to accept analytics cookies?
              </h1>
            </legend>
            <div
              className="govuk-radios"
              data-module="govuk-radios"
              onChange={onChangeValue}
            >
              <div className="govuk-radios__item">
                <input
                  className="govuk-radios__input"
                  id="accept_analytics_cookies"
                  name="analytics_cookies_consent"
                  type="radio"
                  value="true"
                  checked={value}
                />
                <label
                  className="govuk-label govuk-radios__label"
                  htmlFor="accept_analytics_cookies"
                >
                  Yes
                </label>
              </div>
              <div className="govuk-radios__item">
                <input
                  className="govuk-radios__input"
                  id="reject_analytics_cookies"
                  name="analytics_cookies_consent"
                  type="radio"
                  value="false"
                  checked={!value}
                />
                <label
                  className="govuk-label govuk-radios__label"
                  htmlFor="reject_analytics_cookies"
                >
                  No
                </label>
              </div>
            </div>
          </fieldset>
        </div>
        <button type="submit" class="govuk-button" data-module="govuk-button">
          Save cookie settings
        </button>
      </form>
    </div>
  );
};
