import React from 'react';
import exclamation from './exclamation.svg';

export const BlueLineViewTextBlock = ({}) => {
  return (
    <>
      <div className="cc-related-links ">
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          className="govuk-!-padding-top-3 govuk-!-padding-bottom-3"
        >
          <img src={exclamation} className="govuk-!-padding-right-4" />
          <h3 className="govuk-heading-m ">Finding help</h3>
        </div>
        <div className="govuk-body-m">
          <p>
            If you or someone you know has experienced abuse, help is available.
          </p>
          <p></p>
          <p>If you feel unsafe, call 999 and ask for the police</p>
          <p></p>
          <p>
            If you cannot use a voice phone you can text REGISTER to 999 and you
            will receive a text message which tells you what to do next
          </p>
          <a
            href="https://vawg.gss-data.org.uk/"
            className="blue-line-text-link"
          >
            View all helplines
          </a>
        </div>
      </div>
      <div className="cc-related-links">
        <h3 className="govuk-heading-m  govuk-!-padding-top-2">Contact us</h3>
        <div className="govuk-body-m">
          <p className="govuk-!-padding-bottom-0">
            You can content the ONS Centre for Crime and Justice by:
          </p>
          <ul
            style={{ listStyleType: 'disc' }}
            className="govuk-!-padding-top-0 govuk-!-padding-left-4"
          >
            <li className="govuk-!-padding-bottom-1">
              emailing{' '}
              <a href="mailto:crimestatistics@ons.gov.uk">
                crimestatistics@ons.gov.uk
              </a>
            </li>
            <li className="govuk-!-padding-bottom-1">
              writing to ONS Centre for Crime and Justice, Office for National
              Statistics, Room 2200, Segensworth Road, Titchfield, PO15 5RR, or
            </li>
            <li className="govuk-!-padding-bottom-1">
              phoning the statistical contact Meghan Elkin on +44(0)20 7592
              8695.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
