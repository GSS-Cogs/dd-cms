/**
 * Home container.
 * @module components/theme/NotFound/NotFound
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { withServerErrorCode } from '@plone/volto/helpers/Utils/Utils';

/**
 * Not found function.
 * @function NotFound
 * @returns {string} Markup of the not found page.
 */
const NotFound = () => (
  <div className="app-width-container">
    <main
      className="govuk-main-wrapper govuk-main-wrapper--l"
      id="main-content"
      role="main"
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-xl govuk-!-margin-bottom-9">
            Page not found
          </h1>
          <p className="govuk-body">
            If you typed the web address, check it is correct.
          </p>
          <p className="govuk-body">
            You can{' '}
            <a href="/" className="govuk-link">
              browse from the homepage
            </a>{' '}
            or use the search box above to find the information you need.
          </p>
          <p className="govuk-body">Status code: 404</p>
        </div>
      </div>
    </main>
  </div>
);

export default withServerErrorCode(404)(NotFound);
