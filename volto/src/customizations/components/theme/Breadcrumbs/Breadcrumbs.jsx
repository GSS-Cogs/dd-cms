/**
 * Breadcrumbs components.
 * @module components/theme/Breadcrumbs/Breadcrumbs
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Breadcrumbs as GovukBreadcrumbs, PhaseBanner } from 'govuk-react-jsx';
import { Container } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

import { getBreadcrumbs } from '@plone/volto/actions';
import { getBaseUrl, hasApiExpander } from '@plone/volto/helpers';
import './Breadcrumbs.css';

/**
 * Breadcrumbs container class.
 * @class Breadcrumbs
 * @extends Component
 */
class Breadcrumbs extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getBreadcrumbs: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    root: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ).isRequired,
  };

  componentDidMount() {
    if (!hasApiExpander('breadcrumbs', getBaseUrl(this.props.pathname))) {
      this.props.getBreadcrumbs(getBaseUrl(this.props.pathname));
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      if (!hasApiExpander('breadcrumbs', getBaseUrl(this.props.pathname))) {
        this.props.getBreadcrumbs(getBaseUrl(nextProps.pathname));
      }
    }
  }
  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { props } = this;
    const hasBreadcrumbItems = props.items && props.items.length >= 1;

    return (
      <div>
        <div className="Breadcrumbs">
          {hasBreadcrumbItems && (
            <GovukBreadcrumbs
              items={[
                {
                  children: 'Home',
                  href: '/',
                },
                ...props.items.map((item, index, items) => ({
                  children: item.title,
                  href: item.url,
                })),
              ]}
            />
          )}

          <PhaseBanner
            tag={{
              children: 'beta',
            }}
          >
            This part of GOV.UK is being rebuilt –{' '}
            <Link to="https://example.com">find out what that means</Link>
          </PhaseBanner>
        </div>
      </div>
    );
  }
}

export const BreadcrumbsComponent = Breadcrumbs;
export default compose(
  injectIntl,
  connect(
    (state) => ({
      items: state.breadcrumbs.items,
      root: state.breadcrumbs.root,
    }),
    { getBreadcrumbs },
  ),
)(Breadcrumbs);
