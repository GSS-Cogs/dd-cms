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
    "logo_text": "Climate change portal",
    "logo_href": "/",
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
            "href": "/articles",
            "description": "Explainer articles to support understanding and provide insight into climate change",
            "menu_contents": [
                {
                    "label": "Climate change insights, UK: May 2022",
                    "href": "https://www.ons.gov.uk/economy/environmentalaccounts/articles/climatechangeinsightsuk/may2022",
                    "description": "Quarterly publication bringing together the latest climate change-related statistics and analysis from a range of sources."
                },
                {
                    "label": "The UK’s climate is changing. What is driving this? How is the UK responding?",
                    "href": "/articles/the-uk-climate-is-changing",
                    "description": "Recent decades in the UK have been warmer, wetter and sunnier than in the 20th century."
                },
                {
                    "label": "Measuring greenhouse gas emissions",
                    "href": "/articles/measuring-greenhouse-gas-emissions",
                    "description": "The three key official measures of UK GHG emissions, territorial, residence and footprint are explored and defined."
                },
                {
                    "label": "Emissions embedded in trade and impacts on climate change",
                    "href": "/articles/emissions-embedded-in-trade-and-impacts-on-climate-change",
                    "description": "How different industries are affecting climate change."
                }
            ]
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
