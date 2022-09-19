import React, { useState, useEffect } from 'react';
import {
  useCookieConsent,
  useUpdateCookieConsent,
} from '../../customizations/volto/components/theme/App/CookieConsentProvider';

const ConfirmationMessage = ({ hidden }) => {
  return (
    <div
      class="govuk-notification-banner govuk-notification-banner--success"
      role="alert"
      aria-labelledby="govuk-notification-banner-title"
      data-module="govuk-notification-banner"
      hidden={hidden}
    >
      <div class="govuk-notification-banner__header">
        <h2
          class="govuk-notification-banner__title"
          id="govuk-notification-banner-title"
        >
          Success
        </h2>
      </div>
      <div class="govuk-notification-banner__content">
        <p class="govuk-notification-banner__heading">
          You’ve set your cookie preferences.{' '}
          <a class="govuk-notification-banner__link" href="#">
            Go back to the page you were looking at
          </a>
          .
        </p>
      </div>
    </div>
  );
};

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
  const [showConfirmation, setShowConfirmation] = useState(false);

  const onChangeValue = (e) => {
    setValue(e.target.value === 'true');
    setShowConfirmation(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateCookieConsent(value);
    setShowConfirmation(true);
  };

  return (
    <div className="cc-cookie-consent">
      <ConfirmationMessage hidden={!showConfirmation} />

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
