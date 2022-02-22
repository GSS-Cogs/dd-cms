import React from 'react';
import { H1, Paragraph } from 'govuk-react';
import { CcRecentArticles } from '../CcArticleList/CcArticleList';
import { CcArticleTitle } from '../CcArticleTitle/CcArticleTitle';
import { CcMasthead } from '../CcMasthead/CcMasthead';
import { FeedSignUps } from '../CcRelatedLinks/FeedSignUps';
import './CcArticleHeader.scss';

export const CcArticleHeader = ({data}) => {
  return (
    <CcMasthead className="cc-masthead-wrapper--article">
      <div className="cc-article-header govuk-width-container">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <CcArticleTitle title={data.title} />
            <Paragraph>{data.summary}</Paragraph>
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
