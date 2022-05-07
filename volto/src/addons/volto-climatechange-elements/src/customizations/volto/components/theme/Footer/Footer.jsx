/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '@plone/volto/registry';
import { Footer as GovukFooter } from 'govuk-react-jsx';
import './Footer.css';

/**
 * Component to display the footer.
 * @class Footer
 * @extends Component
 */
class Footer extends Component {
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

  render() {
    const { settings } = config;
    let items = [];
    const returnUrl = this.props.content
      ? `?return_url=${this.props.content['@id'].replace(settings.apiPath, '')}`
      : '';
    console.log('This is here');
    if (this.props.token) {
      items = [
        {
          children: 'Log Out',
          href: `/logout${returnUrl}`,
        },
        {
          children: 'Item 2',
          href: '/footer-meta-item-2',
        },
        {
          children: 'Item 3',
          href: '/',
        },
      ];
    } else {
      items = [
        {
          children: 'Item 1',
          href: '/',
        },
        {
          children: 'Item 2',
          href: '/footer-meta-item-2',
        },
        {
          children: 'Item 3',
          href: '/',
        },
      ];
    }
    return (
      <GovukFooter
        containerClassName="volto-width-container--wide"
        meta={{
          items,
          visuallyHiddenTitle: 'Support links',
        }}
      />
    );
  }
}

export default connect((state) => ({
  token: state.userSession.token,
  content: state.content.data,
}))(Footer);
