import React from 'react';

import { CcRecentArticles } from '../CcArticleList/CcArticleList';
import { CcMasthead } from '../CcMasthead/CcMasthead';
import { FeedSignUps } from '../CcRelatedLinks/FeedSignUps';
import './CcArticleHeader.scss';

export const CcArticleHeader = ({data}) => {
  return (
    <CcMasthead className="cc-masthead-wrapper--article">
      <div className="cc-article-header govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-heading-l">{data.title}</h1>
            <p className="govuk-body-l">{data.summary}</p>
          </div>
          <div className="govuk-grid-column-one-third">
            <FeedSignUps />
            <CcRecentArticles />
          </div>
        </div>
      </div>
    </CcMasthead>
  );
};
