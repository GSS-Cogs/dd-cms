import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGoogleAnalytics } from 'volto-google-analytics';
import { hotjar } from 'react-hotjar';

export const Analytics = () => {
  useGoogleAnalytics();

  const hotjarIdStr = useSelector(
    (state) =>
      state.rawSiteTitle?.siteTitle?.data?.data?.hotjar_analytics_id ?? '',
  );

  useEffect(() => {
    if (hotjarIdStr == null) {
      dispatch(getSiteTitle());
    }
    if (hotjarIdStr) {
      let hotjarVersion =
        window?.env?.RAZZLE_RUNTIME_HOTJAR_VERSION ||
        process.env.RAZZLE_RUNTIME_HOTJAR_VERSION ||
        null;

      const hotjarIds = hotjarIdStr.split(';');

      if (hotjarIds.length > 1) {
        hotjarVersion = hotjarIds[1];
      }

      const hotjarId = hotjarIds[0];

      hotjar.initialize(hotjarId, hotjarVersion);
    }
  }, [hotjarIdStr]);

  return null;
};
