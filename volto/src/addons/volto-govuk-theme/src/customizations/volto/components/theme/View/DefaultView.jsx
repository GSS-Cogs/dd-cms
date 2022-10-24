/**
 * Document view component.
 * @module components/theme/View/DefaultView
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

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
});

/**
 * Component to display the default view.
 * @function DefaultView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const DefaultView = ({ content, intl, location }) => {
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);

  const BlockContent = () =>
    map(content[blocksLayoutFieldname].items, (block) => {
      const Block =
        config.blocks.blocksConfig[
          content[blocksFieldname]?.[block]?.['@type']
        ]?.['view'] || null;
      if (Block !== null) {
        return (
          <>
            <Block
              key={block}
              id={block}
              properties={content}
              data={content[blocksFieldname][block]}
              path={getBaseUrl(location?.pathname || '')}
            />
          </>
        );
      }
      return (
        <div key={block}>
          {intl.formatMessage(messages.unknownBlock, {
            block: content[blocksFieldname]?.[block]?.['@type'],
          })}
        </div>
      );
    });

  if (hasBlocksData(content)) {
    if (location.pathname === '/') {
      return (
        <div id="page-document">
          <BlockContent />
        </div>
      );
    }
    return (
      <div id="page-document">
        <div className="app-width-container govuk-!-margin-bottom-9 govuk-!-margin-top-6">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <BlockContent />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Container id="page-document">
      <h1 className="documentFirstHeading">{content.title}</h1>
      {content.description && (
        <p className="documentDescription">{content.description}</p>
      )}
      {content.image && (
        <Image
          className="document-image"
          src={content.image.scales.thumb.download}
          floated="right"
        />
      )}
      {content.remoteUrl && (
        <span>
          The link address is:
          <a href={content.remoteUrl}>{content.remoteUrl}</a>
        </span>
      )}
      {content.text && (
        <div
          dangerouslySetInnerHTML={{
            __html: content.text.data,
          }}
        />
      )}
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
DefaultView.propTypes = {
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

export default injectIntl(DefaultView);
