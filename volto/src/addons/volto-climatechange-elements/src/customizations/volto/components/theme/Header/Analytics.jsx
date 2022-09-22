import { useEffect } from 'react';
import { useGoogleAnalytics } from 'volto-google-analytics';
import { hotjar } from 'react-hotjar';

export const Analytics = () => {
  useGoogleAnalytics();
  useEffect(() => {
    hotjar.initialize(
      process.env.RAZZLE_RUNTIME_HOTJAR_ID,
      process.env.RAZZLE_RUNTIME_HOTJAR_VERSION,
    );
  }, []);

  return null;
};
