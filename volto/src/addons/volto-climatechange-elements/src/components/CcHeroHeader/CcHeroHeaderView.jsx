// Adapted from https://github.com/alphagov/govuk-design-system/blob/main/views/partials/_masthead.njk

import React from 'react';
import { Button, Tag } from 'govuk-react-jsx';
import { CcMasthead } from '../CcMasthead/CcMasthead';

import earth from './Earth.svg';

export const CcHeroHeaderView = (props) => {
    return (
        <CcMasthead>
            <div className="govuk-grid-column-two-thirds-from-desktop">
                <Tag className="govuk-tag--grey app-masthead__tag">NEW ARTICLE</Tag>
                <h1 className="govuk-heading-xl app-masthead__title">{props.data.title}</h1>
                <p className="app-masthead__description">{props.data.summary}</p>
                <Button
                    isStartButton
                    className="govuk-button--secondary app-masthead__start"
                    href="/articles/measuring-greenhouse-gas-emissions">
                        Read article
                </Button>
            </div>

            <div className="govuk-grid-column-one-third-from-desktop">
                <img className="app-masthead__image" src={earth} alt="" role="presentation" />
            </div>
        </CcMasthead>
    );
};
