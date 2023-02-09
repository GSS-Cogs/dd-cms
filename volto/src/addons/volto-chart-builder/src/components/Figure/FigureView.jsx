/**
 * Document view component.
 * @module components/theme/View/FigureView
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { map } from 'lodash';
import config from '@plone/volto/registry';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
  getBaseUrl,
} from '@plone/volto/helpers';

import { classes } from '../../utils';
import { FigureTitleView } from './FigureTitleView';
import './figure.scss';

const FigureViewComponent = ({ content, location }) => {
  useEffect(() => {}, []);

  const FigureBlock = ({ id }) => {
    const style = id === undefined ? '' : `figure ${customClasses}`;
    return (
      <div id={id} className={style}>
        {map(content[blocksLayoutFieldname].items, (block) => {
          const isTitleBlock =
            content[blocksFieldname]?.[block]?.['@type'] === 'title';

          let Block = isTitleBlock
            ? (props) => <FigureTitleView {...props} />
            : config.blocks.blocksConfig[
                content[blocksFieldname]?.[block]?.['@type']
              ]?.['view'] || null;

          return Block !== null ? (
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
    );
  };

  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
  const customClasses = classes([
    {
      val: content.Background ? content.Background.title : null,
      prefix: 'figure--bg-',
    },
  ]);

  return hasBlocksData(content) ? (
    <>
      <div className={`figure ${customClasses}`}>
        <FigureBlock />
      </div>
    </>
  ) : (
    <div>Add Figure Block</div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
FigureViewComponent.propTypes = {
  /**
   * Content of the object
   */
  content: PropTypes.shape({
    /**
     * Title of the object
     */
    title: PropTypes.string,
    /**
     * Description of the object
     */
    description: PropTypes.string,
    /**
     * Text of the object
     */
    text: PropTypes.shape({
      /**
       * Data of the text of the object
       */
      data: PropTypes.string,
    }),
  }).isRequired,
};

export const FigureView = injectIntl(FigureViewComponent);
