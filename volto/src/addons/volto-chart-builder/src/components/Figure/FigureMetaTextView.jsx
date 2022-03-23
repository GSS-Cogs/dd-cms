import React from 'react';
import { defaultText } from '../../utils';

export const FigureMetaTextView = ({ data }) => {
  return (
    <p className="figure__text govuk-caption-m">
      {defaultText(data.text, 'Add text')}
    </p>
  );
};
