import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CcArticleHeader } from '../CcArticleHeader/CcArticleHeader';

import { map } from 'lodash';
import config from '@plone/volto/registry';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  getBaseUrl,
} from '@plone/volto/helpers';
import { getArticlePublishedDate } from '../../actions';

import './CvV2ArticleView.scss';

export const CcV2ArticleView = (props) => {
  const { content, intl, location, articlePublishedDate={} } = props;
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);

  const formattedDate = (date) => new Date(date).toLocaleDateString('en-gb', { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedCreators = (creators) => creators.join(', ');

  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.articlePublishedDate);

  useEffect(() => {
    content.relatedItems.forEach((item) => dispatch(getArticlePublishedDate(item['@id'])))
  }, []);

  return (<div>
    <CcArticleHeader
      data={{
        title: content.title,
        summary: content.description,
        created: formattedDate(content.created),
        creators: formattedCreators(content.creators),
        relatedItems: data
      }}
    />
    <div className="govuk-width-container ccv2-article-body">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds govuk-!-padding-right-6">
            {map(content[blocksLayoutFieldname].items, (block) => {
              const Block =
                config.blocks.blocksConfig[
                  content[blocksFieldname]?.[block]?.['@type']
                ]?.['view'] || null;
              
              const notTitleBlock = content[blocksFieldname]?.[block]?.['@type'] !== 'title';

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
  </div>)
};
