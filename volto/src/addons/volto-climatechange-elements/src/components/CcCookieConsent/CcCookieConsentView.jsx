import React, { useState, useEffect } from 'react';
import {
  useCookieConsent,
  useUpdateCookieConsent,
} from '../../customizations/volto/components/theme/App/CookieConsentProvider';

export const CcCookieConsentView = ({ data }) => {
  const [isServerSide, setIsServerSide] = useState(true);

  // We don't render the cookie consent block on the server because we don't want it to show for non javascript users
  useEffect(() => {
    setIsServerSide(false);
  }, []);

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
      <div className="govuk-body" hidden={!isServerSide}>
        <p>
          We use Javascript to set most of our cookies. Unfortunately Javascript
          is not running on your browser, so you cannot change your settings.
          You can try:
        </p>
        <ul>
          <li>reloading the page</li>
          <li>turning on Javascript in your browser</li>
        </ul>
      </div>

      <form onSubmit={onSubmit} hidden={isServerSide}>
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
                  defaultChecked={value}
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
                  defaultChecked={!value}
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
        <button
          type="submit"
          className="govuk-button"
          data-module="govuk-button"
        >
          Save cookie settings
        </button>
      </form>
    </div>
  );
};
