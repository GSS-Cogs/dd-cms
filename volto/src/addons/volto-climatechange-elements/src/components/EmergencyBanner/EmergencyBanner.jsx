import React from 'react';

export const EmergencyBanner = (props) => {
    const { heading, short_description, link, link_text } = props;
    return (
        <div className="gem-c-emergency-banner gem-c-emergency-banner--notable-death gem-c-emergency-banner--homepage" aria-label="emergency banner" role="region" data-nosnippet="true">
            <div className="app-width-container">
                <div className="govuk-grid-row">
                    <div className="govuk-grid-column-two-thirds">
                        <h2 className="gem-c-emergency-banner__heading gem-c-emergency-banner__heading--homepage">
                            {props.heading}
                        </h2>          <p className="gem-c-emergency-banner__description gem-c-emergency-banner__description--homepage">
                            {props.short_description}
                        </p>          <a href={props.link} className="gem-c-emergency-banner__link">
                            {props.link_text}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

