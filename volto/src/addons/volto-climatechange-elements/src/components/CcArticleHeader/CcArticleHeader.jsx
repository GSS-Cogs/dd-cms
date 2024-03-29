import React from 'react';

import { CcMasthead } from '../CcMasthead/CcMasthead';

export const CcArticleHeader = ({ data }) => {
  return (
    <CcMasthead className="app-masthead--article">
      <div className="cc-article-header">
        <div className="govuk-!-padding-right-6">
          {data?.dashboard ? (
            <p className="govuk-caption-l">Dashboard</p>
          ) : (
            <p className="govuk-caption-l">Article</p>
          )}
          <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">
            {data.title}
          </h1>
          {data?.displayAuthors ? (
            <p className="govuk-caption-m govuk-!-margin-bottom-6">
              {data.EffectiveDate ?? data.created}
              <span className="cc-article-header__date">{data.creators}</span>
            </p>
          ) : (
            <p className="govuk-caption-m govuk-!-margin-bottom-6">
              {data.EffectiveDate ?? data.created}
            </p>
          )}
          <p className="govuk-body-l">{data.summary}</p>
        </div>
      </div>
    </CcMasthead>
  );
};
