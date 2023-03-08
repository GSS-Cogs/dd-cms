/**
 * Home container.
 * @module components/theme/ServiceProblem/ServiceProblem
 */

import React from 'react';
import { withServerErrorCode } from '@plone/volto/helpers/Utils/Utils';

/**
 * Service Problem function.
 * @function ServiceProblem
 * @returns {string} Markup of the not found page.
 */
const ServiceProblem = () => (
  <div class="app-width-container">
    <main
      class="govuk-main-wrapper govuk-main-wrapper--l"
      id="main-content"
      role="main"
    >
      <div class="govuk-grid-row">
        <div class="govuk-grid-column-two-thirds">
          <h1 class="govuk-heading-xl govuk-!-margin-bottom-9">
            Sorry, there is a problem with the service
          </h1>
          <p class="govuk-body">
            Our Support Team is working on the error, and will resolve it as
            soon as possible.
          </p>
          <p class="govuk-body">Try again later.</p>
        </div>
      </div>
    </main>
  </div>
);

export default withServerErrorCode(500)(ServiceProblem);
