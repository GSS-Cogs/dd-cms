import React from 'react';
import { CcArticleHeader } from '../CcArticleHeader/CcArticleHeader';

import { map } from 'lodash';
import config from '@plone/volto/registry';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  getBaseUrl,
} from '@plone/volto/helpers';

import './CvV2ArticleView.scss';

export const CcV2ArticleView = ({ content, intl, location }) => {
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);

  return (<div>
    <CcArticleHeader
      data={{
        title: content.title,
        summary: content.description,
        href: '#',
        linkTitle: 'All climate and weather data',
      }}
    />
    <div className="govuk-width-container ccv2-article-body">
      <div>
        {map(content[blocksLayoutFieldname].items, (block) => {
         const Block =
           config.blocks.blocksConfig[
             content[blocksFieldname]?.[block]?.['@type']
           ]?.['view'] || null;

         return Block !== null && content[blocksFieldname]?.[block]?.['@type'] !== 'title' ? (
           <Block
             key={block}
             id={block}
             properties={content}
             data={content[blocksFieldname][block]}
             path={getBaseUrl(location?.pathname || '')}
           />
         ) : null;
       })}</div>
    </div>
  </div>)
};
