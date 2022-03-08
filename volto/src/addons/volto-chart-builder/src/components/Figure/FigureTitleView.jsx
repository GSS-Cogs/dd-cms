import React from 'react';

export const FigureTitleView = ({ data }) => {
  return (
    <h2 className="govuk-heading-m govuk-!-margin-bottom-7">{data.title}</h2>
  );
};
