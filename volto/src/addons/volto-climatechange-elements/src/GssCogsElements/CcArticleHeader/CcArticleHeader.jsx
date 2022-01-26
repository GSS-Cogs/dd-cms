import React from 'react';
import { Button, Tag } from 'govuk-react-jsx';
import { H1, Paragraph } from 'govuk-react';
import { RelatedLinks } from '../RelatedLinks/RelatedLinks';

export const CcArticleHeader = () => {
  return (
    <div className="cc-masthead-wrapper cc-masthead-wrapper--bottom-overlap cc-masthead-wrapper--article">
      <div className="govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <H1>
              The UK’s climate is changing. What is driving this? How is the UK
              responding?
            </H1>
            <Paragraph>
              The latest report from the Intergovernmental Panel on Climate
              Change (IPCC), a United Nations body providing science-led
              comprehensive assessments of climate change science, found that
              climate change is already happening, with global surface
              temperatures between 2001 and 2020 around 1°C higher than during
              1850 to 1900, and that this is having effects across the world and
              in the UK including making extreme weather events more likely.
            </Paragraph>
          </div>
          <div className="govuk-grid-column-one-third">
            <RelatedLinks />
          </div>
        </div>
      </div>
    </div>
  );
};
