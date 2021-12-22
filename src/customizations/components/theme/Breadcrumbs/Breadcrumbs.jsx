/**
 * Breadcrumbs components.
 * @module components/theme/Breadcrumbs/Breadcrumbs
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { PhaseBanner } from 'govuk-react';
import { injectIntl } from 'react-intl';
import { Container } from 'semantic-ui-react';
/**
 * Breadcrumbs container class.
 * @class Breadcrumbs
 * @extends Component
 */
class Breadcrumbs extends Component {

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Container>
        <PhaseBanner level="beta">
          This part of GOV.UK is being rebuilt –{' '}
          <Link to="https://example.com">
            find out what that means
          </Link>
        </PhaseBanner>
      </Container>
    );
  }
}

export const BreadcrumbsComponent = Breadcrumbs;
export default injectIntl(Breadcrumbs);
