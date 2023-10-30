import React from 'react';
import { useSelector } from 'react-redux';

export const ClimateChangeNotification = (props) => {
  const altColor = props.pathname === '' ? '' : '--non-root';
  const notificationData = useSelector((state) => {
    const blocks =
      state.rawClimateChangeNotificationState?.climateChangeNotificationState
        ?.data ?? null;
    return blocks;
  });

  return (
    <>
      {notificationData && (
        <div className={`cc-notification ${'cc-notification' + altColor}`}>
          <div class="govuk-warning-text app-width-container cc-notification__wrapper">
            <span
              className={`govuk-warning-text__icon ${
                'cc-notification__icon' + altColor
              }`}
              aria-hidden="true"
            >
              !
            </span>
            <strong
              class={`govuk-warning-text__text cc-notification__text ${
                'cc-notification__text' + altColor
              }`}
            >
              <span class="govuk-warning-text__assistive">Important</span>
              From September 2023, data will no longer be updated on this site,
              but will remain available until at least September 2024. You can
              find up-to-date data from{' '}
              <a
                className={`govuk-notification-banner__link cc-notification__link ${
                  'cc-notification__link' + altColor
                }`}
                href="https://www.ons.gov.uk/releasecalendar"
              >
                ONS
              </a>
              , central government via{' '}
              <a
                className={`govuk-notification-banner__link cc-notification__link ${
                  'cc-notification__link' + altColor
                }`}
                href="https://www.gov.uk/search/research-and-statistics?content_store_document_type=all_research_and_statistics&level_one_taxon=3cf97f69-84de-41ae-bc7b-7e2cc238fa58&level_two_taxon=62e08e6f-9161-42c6-b9dd-0cf8fcab2c69&order=release-date-oldest"
              >
                gov.uk
              </a>{' '}
              and devolved governments via{' '}
              <a
                className={`govuk-notification-banner__link cc-notification__link ${
                  'cc-notification__link' + altColor
                }`}
                href="https://www.gov.wales/statistics-and-research"
              >
                Welsh Government
              </a>
              ,{' '}
              <a
                className={`govuk-notification-banner__link cc-notification__link ${
                  'cc-notification__link' + altColor
                }`}
                href="https://www.gov.scot/statistics-and-research/"
              >
                Scottish Government
              </a>{' '}
              and{' '}
              <a
                className={`govuk-notification-banner__link cc-notification__link ${
                  'cc-notification__link' + altColor
                }`}
                href="https://www.nisra.gov.uk/"
              >
                Northern Ireland
              </a>
              {'.'}
            </strong>
          </div>
        </div>
      )}
    </>
  );
};
