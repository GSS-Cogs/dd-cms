import React from 'react';
import { useSelector } from 'react-redux';

export const NotificationBanner = (props) => {
  const altColor = props.pathname === '' ? '' : '--non-root';
  const notificationData = useSelector((state) => {
    const blocks =
      state.rawNotificationBannerState?.notificationBannerState?.data ?? null;
    return blocks;
  });

  const climateChangeData = useSelector((state) => {
    const blocks =
      state.rawClimateChangeNotificationState?.climateChangeNotificationState
        ?.data ?? null;
    return blocks;
  });
  const GetNotificationBanner = () => {
    if (climateChangeData || notificationData === 'climate_change_shutdown') {
      return <ClimateChangeShutdownNotification altColor={altColor} />;
    } else if (notificationData === 'vawg_shutdown') {
      return <VawgShutdownNotification altColor={altColor} />;
    }
    return null;
  };

  return <> {<GetNotificationBanner />}</>;
};

const ClimateChangeShutdownNotification = ({ altColor }) => {
  return (
    <div className={`notification_banner ${'notification_banner' + altColor}`}>
      <div className="govuk-warning-text app-width-container notification_banner__wrapper">
        <span
          className={`govuk-warning-text__icon ${
            'notification_banner__icon' + altColor
          }`}
          aria-hidden="true"
        >
          !
        </span>
        <strong
          className={`govuk-warning-text__text notification_banner__text ${
            'notification_banner__text' + altColor
          }`}
        >
          <span className="govuk-warning-text__assistive">Important</span>
          From September 2023, data will no longer be updated on this site, but
          will remain available until at least September 2024. You can find
          up-to-date data from{' '}
          <a
            className={`govuk-notification-banner__link notification_banner__link ${
              'notification_banner__link' + altColor
            }`}
            href="https://www.ons.gov.uk/releasecalendar"
          >
            ONS
          </a>
          , central government via{' '}
          <a
            className={`govuk-notification-banner__link notification_banner__link ${
              'notification_banner__link' + altColor
            }`}
            href="https://www.gov.uk/search/research-and-statistics?content_store_document_type=all_research_and_statistics&level_one_taxon=3cf97f69-84de-41ae-bc7b-7e2cc238fa58&level_two_taxon=62e08e6f-9161-42c6-b9dd-0cf8fcab2c69&order=release-date-oldest"
          >
            gov.uk
          </a>{' '}
          and devolved governments via{' '}
          <a
            className={`govuk-notification-banner__link notification_banner__link ${
              'notification_banner__link' + altColor
            }`}
            href="https://www.gov.wales/statistics-and-research"
          >
            Welsh Government
          </a>
          ,{' '}
          <a
            className={`govuk-notification-banner__link notification_banner__link ${
              'notification_banner__link' + altColor
            }`}
            href="https://www.gov.scot/statistics-and-research/"
          >
            Scottish Government
          </a>{' '}
          and{' '}
          <a
            className={`govuk-notification-banner__link notification_banner__link ${
              'notification_banner__link' + altColor
            }`}
            href="https://www.nisra.gov.uk/"
          >
            Northern Ireland
          </a>
          {'.'}
        </strong>
      </div>
    </div>
  );
};

const VawgShutdownNotification = ({ altColor }) => {
  return (
    <div className={`notification_banner ${'notification_banner' + altColor}`}>
      <div className="govuk-warning-text app-width-container notification_banner__wrapper">
        <span
          className={`govuk-warning-text__icon ${
            'notification_banner__icon' + altColor
          }`}
          aria-hidden="true"
        >
          !
        </span>
        <strong
          className={`govuk-warning-text__text notification_banner__text ${
            'notification_banner__text' + altColor
          }`}
        >
          <span className="govuk-warning-text__assistive">Important</span>
          From March 2023, data will no longer be updated on this site. The site
          will remain available until 31st March 2024. You can find up-to-date
          data from{' '}
          <a
            className={`govuk-notification-banner__link notification_banner__link ${
              'notification_banner__link' + altColor
            }`}
            href="https://www.ons.gov.uk/peoplepopulationandcommunity/crimeandjustice"
          >
            ONS
          </a>
          ,{' '}
          <a
            className={`govuk-notification-banner__link notification_banner__link ${
              'notification_banner__link' + altColor
            }`}
            href="https://www.gov.uk/government/collections/statistics-on-so-called-honour-based-abuse-offences-england-and-wales"
          >
            Home Office
          </a>
          , and{' '}
          <a
            className={`govuk-notification-banner__link notification_banner__link ${
              'notification_banner__link' + altColor
            }`}
            href="https://digital.nhs.uk/data-and-information/publications/statistical/female-genital-mutilation"
          >
            NHS Digital
          </a>
          {'.'}
        </strong>
      </div>
    </div>
  );
};
