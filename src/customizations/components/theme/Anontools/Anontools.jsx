/**
 * Anontools component.
 * @module components/theme/Anontools/Anontools
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import config from '@plone/volto/registry';
import { Button } from 'govuk-react';
import { FormattedMessage } from 'react-intl';

/**
 * Anontools container class.
 * @class Anontools
 * @extends Component
 */
export class Anontools extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    token: PropTypes.string,
    content: PropTypes.shape({
      '@id': PropTypes.string,
    }),
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
    content: {
      '@id': null,
    },
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { settings } = config;
    return (
      !this.props.token && (
        <Link
          aria-label="login"
          to={`/login${this.props.content
            ? `?return_url=${this.props.content['@id'].replace(
              settings.apiPath,
              '',
            )}`
            : ''
            }`}
        >
          <Button buttonColour="#1d70b8" onClick={() => {
            console.log('Clicked');
          }}>
            Log in
          </Button>
        </Link>
      )
    );
  }
}

export default connect((state) => ({
  token: state.userSession.token,
  content: state.content.data,
}))(Anontools);
