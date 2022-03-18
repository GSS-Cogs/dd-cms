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
          <div className="govuk-grid-column-two-thirds govuk-!-padding-right-6">
            <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">{data.title}</h1>
            <p className="govuk-caption-m govuk-!-margin-bottom-6">{data.created} by <span className="cc-article-header__date">{data.creators}</span></p>
            <p className="govuk-body-l">{data.summary}</p>
          </div>
          <div className="govuk-grid-column-one-third">
            <FeedSignUps />
            <CcRecentArticles articles={data.relatedItems} />
          </div>
        </div>
      </div>
    </CcMasthead>
  );
};
