/**
 * @module components/theme/Unauthorized/Unauthorized
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { withServerErrorCode } from '@plone/volto/helpers/Utils/Utils';
import { getBaseUrl } from '@plone/volto/helpers';

/**
 * unauthorized function.
 * @function Unauthorized
 * @returns {string} Markup of the unauthorized page.
 */
const Unauthorized = () => {
  const error_message = useSelector((state) => state.apierror.message);
  let location = useLocation();

  return (
    <div class="app-width-container">
      <main
        class="govuk-main-wrapper govuk-main-wrapper--l"
        id="main-content"
        role="main"
      >
        <div class="govuk-grid-row">
          <div class="govuk-grid-column-two-thirds">
            <h1 class="govuk-heading-l">Unauthorized</h1>
            <h3 className="govuk-body">{error_message}</h3>
            <p className="govuk-body">
              You are trying to access a protected resource, please login first.
            </p>
            <p className="govuk-body">Thank you.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withServerErrorCode(401)(Unauthorized);
