import { useEffect } from 'react';
import { useGoogleAnalytics } from 'volto-google-analytics';
import { hotjar } from 'react-hotjar';

export const Analytics = () => {
  useGoogleAnalytics();
  useEffect(() => {
    hotjar.initialize(process.env.HOTJAR_ID, process.env.HOTJAR_VERSION);
  }, []);

  return null;
};
