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
                href="https://eur03.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.gov.uk%2Fsearch%2Fresearch-and-statistics%3Fcontent_store_document_type%3Dall_research_and_statistics%26level_one_taxon%3D3cf97f69-84de-41ae-bc7b-7e2cc238fa58%26level_two_taxon%3D62e08e6f-9161-42c6-b9dd-0cf8fcab2c69%26order%3Drelease-date-oldest&data=05%7C01%7Cangela.watkins%40ons.gov.uk%7C080f81b3182747004c8708dbcf2f6358%7C078807bfce824688bce00d811684dc46%7C0%7C0%7C638331855223012354%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=Vvfv3bWD3JiNd6vaoujEOaxneVC4HGWvi2lE9whJtW4%3D&reserved=0"
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
                href="https://eur03.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.gov.scot%2Fstatistics-and-research%2F&data=05%7C01%7Cangela.watkins%40ons.gov.uk%7C080f81b3182747004c8708dbcf2f6358%7C078807bfce824688bce00d811684dc46%7C0%7C0%7C638331855223012354%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=0ZOZEFgSkShqIZeStkq%2BYOl3SYz61OsTzeQI5tO957I%3D&reserved=0"
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
