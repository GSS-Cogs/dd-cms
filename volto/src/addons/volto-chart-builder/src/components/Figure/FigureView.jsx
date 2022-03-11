/**
 * Document view component.
 * @module components/theme/View/FigureView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';

import { Container, Image } from 'semantic-ui-react';
import { map } from 'lodash';
import config from '@plone/volto/registry';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
  getBaseUrl,
} from '@plone/volto/helpers';

import { classes } from '../../utils';

import './figure.scss';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
});

const FigureViewComponent = ({ content, location }) => {
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);

  const customClasses = classes([
    {
      val: content.Background ? content.Background.title : null,
      prefix: 'figure--bg-',
    },
  ]);

  return hasBlocksData(content) ? (
    <div id="page-document" className={`figure ${customClasses}`}>
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
