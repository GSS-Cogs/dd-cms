/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TopNav, SearchBox } from "govuk-react";
import Crown from '@govuk-react/icon-crown';

import {
  Anontools,
  LanguageSelector,
  Logo,
  Navigation,
  SearchWidget,
} from '@plone/volto/components';

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
      <TopNav
        company={<TopNav.Anchor href="https://example.com" target="new"><TopNav.IconTitle icon={<Crown height="32" width="36" />}>GOV.UK</TopNav.IconTitle></TopNav.Anchor>}
        search={<SearchBox><SearchBox.Input placeholder="Search" /><SearchBox.Button /></SearchBox>}
        serviceTitle={<TopNav.NavLink href="https://example.com" target="new">GOV.UK Open Data</TopNav.NavLink>}
      >
        {!this.props.token && (
          <div className="tools">
            <Anontools />
          </div>
        )}
      </TopNav>
    );
  }
}

export default connect((state) => ({
  token: state.userSession.token,
}))(Header);
