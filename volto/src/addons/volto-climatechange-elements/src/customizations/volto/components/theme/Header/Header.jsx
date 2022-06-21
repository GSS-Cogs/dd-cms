/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SuperNavigationHeader } from "../../../../../components/CcSuperNavigationHeader/CcSuperNavigationHeader";

const headerConfig = {
    "logo_link_title": "Go to the GOV.UK homepage",
    "logo_text": "GOV.UK",
    "logo_href": "/",
    "service_name": "Climate Change",
    "navigation_links": [
        {
            "label": "Dashboards",
            "href": "/dashboards",
            "description": "Dashboards about the different indicators of climate change",
            "menu_contents": [
                {
                    "label": "Climate and weather",
                    "href": "/dashboards/climate-and-weather"
                },
                {
                    "label": "Emissions",
                    "href": "/dashboards/emissions"
                },
                {
                    "label": "Drivers",
                    "href": "/dashboards/drivers"
                },
                {
                    "label": "Impacts",
                    "href": "/dashboards/impacts"
                },
                {
                    "label": "Mitigation",
                    "href": "/dashboards/mitigation"
                },
                {
                    "label": "Adaptation",
                    "href": "/dashboards/adaptation"
                }
            ],
            "footer_links": [
                {
                    "label": "About the portal",
                    "href": "/about"
                },
                {
                    "label": "Datasets",
                    "href": "https://beta.gss-data.org.uk/datasets"
                }
            ]
        },
        {
            "label": "Articles",
            "href": "/articles"
        },
        {
            "label": "About",
            "href": "/about"
        }
    ],
    "navigation_menu_heading": "Navigation menu",
    "navigation_search_heading": "Search and popular pages",
    "search_text": "Search GOV.UK"
}

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
                <SuperNavigationHeader
                    className={this.props.pathname === '' ? 'root-header' : 'non-root-header'}
                    navigation={headerConfig}
                />
            </>
        );
    }
}

export default connect((state) => ({
    token: state.userSession.token,
    items: state.navigation.items,
}))(Header);
