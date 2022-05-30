import React from 'react';
import { Button, Tag } from 'govuk-react-jsx';
import { CcMasthead } from '../CcMasthead/CcMasthead';

import earth from './Earth.svg';

export const CcHeroHeaderView = (props) => {
  return (
    <CcMasthead className="cc-masthead-wrapper--bottom-overlap cc-masthead-wrapper--hero">
      <div className="cc-hero-header volto-width-container--wide">
        <div className="cc-hero-header--content">
          <div className="cc-hero-header--update-type">
            <Tag className="govuk-tag--grey">New Article</Tag> 20 January 2022
          </div>

          <div className="cc-hero-header--title">{props.data.title}</div>
          <div className="cc-hero-header--summary">{props.data.summary}</div>

          <Button className="govuk-button--secondary">Read article &gt;</Button>
        </div>

        <div className="cc-hero-header--image">
          <img src={earth}/>
        </div>
      </div>
    </CcMasthead>
  );
};
