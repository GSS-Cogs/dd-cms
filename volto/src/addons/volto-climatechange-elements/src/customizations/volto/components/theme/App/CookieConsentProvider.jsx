import React, { useContext, createContext, useState } from 'react';
import Cookies from 'js-cookie';

const CookieConsentPreferenceContext = createContext(null);
const CookieConsentContext = createContext(null);
const UpdateCookieConsentContext = createContext(null);

export const useCookieConsentPreferenceSet = () =>
  useContext(CookieConsentPreferenceContext);
export const useCookieConsent = () => useContext(CookieConsentContext);
export const useUpdateCookieConsent = () =>
  useContext(UpdateCookieConsentContext);

const getCookieConsentState = () => {
  let cookiesPolicyString = Cookies.get('cookies_policy');
  try {
    let cookiesPolicy = JSON.parse(cookiesPolicyString);
    return cookiesPolicy;
  } catch (e) {
    const defaultConsent = {
      usage: false,
      campaigns: false,
      settings: false,
    };
    Cookies.set('cookies_policy', JSON.stringify(defaultConsent), {
      expires: 365,
      secure: true,
    });
    return defaultConsent;
  }
};

export const CookieConsentProvider = ({ children }) => {
  const [cookiePreferenceSet, setCookiePreferenceSet] = useState(() => {
    const preference = Cookies.get('cookies_preferences_set') === 'true';
    return preference;
  });

  const [cookieConsent, setCookieConsent] = useState(getCookieConsentState);

  const updateConsent = (value) => {
    const consentObject = { usage: value, campaigns: value, settings: value };
    Cookies.set('cookies_preferences_set', 'true', {
      expires: 365,
      secure: true,
    });
    Cookies.set('cookies_policy', JSON.stringify(consentObject), {
      expires: 365,
      secure: true,
    });
    setCookieConsent(consentObject);
    setCookiePreferenceSet(true);
  };

  return (
    <CookieConsentPreferenceContext.Provider value={cookiePreferenceSet}>
      <CookieConsentContext.Provider value={cookieConsent}>
        <UpdateCookieConsentContext.Provider value={updateConsent}>
          {children}
        </UpdateCookieConsentContext.Provider>
      </CookieConsentContext.Provider>
    </CookieConsentPreferenceContext.Provider>
  );
};
