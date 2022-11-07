import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGoogleAnalytics } from 'volto-google-analytics';
import { hotjar } from 'react-hotjar';

export const Analytics = () => {
  useGoogleAnalytics();

  const hotjarId = useSelector(
    (state) =>
      state.rawSiteTitle?.siteTitle?.data?.data?.hotjar_analytics_id ?? '',
  );

  useEffect(() => {
    if (hotjarId == null) {
      dispatch(getSiteTitle());
    }
    if (hotjarId) {
      hotjar.initialize(
        hotjarId,
        window?.env?.RAZZLE_RUNTIME_HOTJAR_VERSION ||
          process.env.RAZZLE_RUNTIME_HOTJAR_VERSION,
      );
    }
  }, [hotjarId]);

  return null;
};
