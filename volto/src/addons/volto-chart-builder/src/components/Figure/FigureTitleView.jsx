import React from 'react';
import { defaultText } from '../../utils';

export const FigureTitleView = ({ data }) => {
  return (
    <h2 className="figure__text govuk-heading-m govuk-!-margin-bottom-7">
      {defaultText(data.title, 'Add Title')}
    </h2>
  );
};
