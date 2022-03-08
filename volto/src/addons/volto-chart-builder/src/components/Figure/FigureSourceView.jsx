import React from 'react';

export const FigureSourceView = ({ data }) => {
  return (
    <p className="govuk-!-margin-top-6 govuk-caption-m">
      Source:{' '}
      <a href={data.url} className="govuk-link">
        {data.text}
      </a>
    </p>
  );
};
