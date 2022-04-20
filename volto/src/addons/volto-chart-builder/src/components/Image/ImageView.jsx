import React from 'react';
import { injectIntl } from 'react-intl';

import { flattenToAppURL } from '@plone/volto/helpers';

import './image.scss';

const ImageViewComponent = ({ content }) => {
  return (
    <div className={'image'}>
      <img
        alt={content.title}
        src={flattenToAppURL(content.image.scales.preview.download)}
      />
    </div>
  );
};

export const ImageView = injectIntl(ImageViewComponent);
