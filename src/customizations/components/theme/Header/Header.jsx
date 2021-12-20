/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TopNav } from "govuk-react";
import Crown from '@govuk-react/icon-crown';

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
                serviceTitle={<TopNav.NavLink href="https://example.com" target="new">GOV.UK Open Data</TopNav.NavLink>}
            />
        );
    }
}

export default connect((state) => ({
    token: state.userSession.token,
}))(Header);
