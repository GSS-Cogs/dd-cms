import React from 'react';
import { defaultText } from '../../utils';

export const FigureTitleView = (props = {}) => {
  return (
    <h2 className="figure__text govuk-heading-m govuk-!-margin-bottom-7">
      {defaultText(props.data.title || props.properties.title, 'Add Title')}
    </h2>
  );
};
