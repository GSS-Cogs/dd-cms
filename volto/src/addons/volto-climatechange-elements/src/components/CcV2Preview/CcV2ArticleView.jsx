import React from 'react';
import { map } from 'lodash';
import config from '@plone/volto/registry';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  getBaseUrl,
} from '@plone/volto/helpers';

import { CcArticleHeader } from '../CcArticleHeader/CcArticleHeader';
import { formattedDate } from '../../utils';

export const CcV2ArticleView = (props) => {
  const { content, location } = props;
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);

  const formattedCreators = (creators) => creators.join(', ');
  return (
    <div>
      <CcArticleHeader
        data={{
          title: content.title,
          summary: content.description,
          created: formattedDate(content.created),
          creators: formattedCreators(content.creators),
          dashboard: content?.['@id'].includes('dashboard'),
        }}
      />
      <div className="volto-width-container--wide ccv2-article-body">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            {map(content[blocksLayoutFieldname].items, (block) => {
              const Block =
                config.blocks.blocksConfig[
                  content[blocksFieldname]?.[block]?.['@type']
                ]?.['view'] || null;

              const notTitleBlock =
                content[blocksFieldname]?.[block]?.['@type'] !== 'title';

              return Block !== null && notTitleBlock ? (
                <Block
                  key={block}
                  id={block}
                  properties={content}
                  data={content[blocksFieldname][block]}
                  path={getBaseUrl(location?.pathname || '')}
                />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
