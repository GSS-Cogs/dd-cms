import React from 'react';

import { CcRecentArticles } from '../CcArticleList/CcArticleList';
import { CcMasthead } from '../CcMasthead/CcMasthead';
import { FeedSignUps } from '../CcRelatedLinks/FeedSignUps';

export const CcArticleHeader = ({ data }) => {
  return (
    <CcMasthead className="app-masthead--article">
      <div className="cc-article-header volto-width-container--wide">
        <div className="govuk-grid-row">
          <div className="govuk-!-padding-right-6">
            <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">
              {data.title}
            </h1>
            <p className="govuk-caption-m govuk-!-margin-bottom-6">
              {data.created} by{' '}
              <span className="cc-article-header__date">{data.creators}</span>
            </p>
            <p className="govuk-body-l">{data.summary}</p>
          </div>
        </div>
      </div>
    </CcMasthead>
  );
};
