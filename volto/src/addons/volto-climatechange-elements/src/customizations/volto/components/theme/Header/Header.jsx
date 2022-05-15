/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header as GovukHeader } from 'govuk-react-jsx';
import "./Header.css";
/**
 * Header component class.
 * @class Header
 * @extends Component
 */
class Header extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    token: PropTypes.string,
    pathname: PropTypes.string.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <>
        <GovukHeader
          navigationClassName="govuk-!-padding-left-0"
          navigation={[
            ...this.props.items.map(({title, url}) => ({
                children: title,
                href: url === '' ? '/' : url
              })
            ),
          ]}
          className={this.props.pathname === '' ? 'root-header' : 'non-root-header'}
        />
      </>
    );
  }
}

export default connect((state) => ({
  token: state.userSession.token,
  items: state.navigation.items,
}))(Header);
