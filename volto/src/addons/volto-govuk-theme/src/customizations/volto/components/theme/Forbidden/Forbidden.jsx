/**
 * @module components/theme/Forbidden/Forbidden
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Container } from 'semantic-ui-react';
import { withServerErrorCode } from '@plone/volto/helpers/Utils/Utils';

/**
 * forbidden function.
 * @function Forbidden
 * @returns {string} Markup of the forbidden page.
 */
const Forbidden = () => (
  <div class="app-width-container">
    <main
      class="govuk-main-wrapper govuk-main-wrapper--l"
      id="main-content"
      role="main"
    >
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
          <h1 class="govuk-heading-xl govuk-!-margin-bottom-9">Forbidden</h1>
          <p className="govuk-body">
            We apologize for the inconvenience, but you don't have permissions
            on this resource.
          </p>
          <p className="govuk-body">Thank you.</p>
        </div>
      </div>
    </main>
  </div>
);

export default withServerErrorCode(403)(Forbidden);
