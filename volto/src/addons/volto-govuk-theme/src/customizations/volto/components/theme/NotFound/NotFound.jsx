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
  <div class="app-width-container">
    <main
      class="govuk-main-wrapper govuk-main-wrapper--l"
      id="main-content"
      role="main"
    >
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
          <h1 class="govuk-heading-xl govuk-!-margin-bottom-9">
            Page not found
          </h1>
          <p class="govuk-body">
            If you typed the web address, check it is correct.
          </p>
          <p class="govuk-body">
            You can{' '}
            <a href="/" class="govuk-link">
              browse from homepage
            </a>{' '}
            or use the search box above to find the information you need.
          </p>
          <p class="govuk-body">Status code: 404</p>
        </div>
      </div>
    </main>
  </div>
);

export default withServerErrorCode(404)(NotFound);
