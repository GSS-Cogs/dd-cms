/**
 * Document view component.
 * @module components/theme/View/SummaryView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { UniversalLink } from '@plone/volto/components';
import { FormattedMessage } from 'react-intl';
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
 * Summary view component class.
 * @function SummaryView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const SummaryView = ({ content }) => (
  <div>
    <div className="view-wrapper summary-view app-width-container">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <article id="content" className="cc-article-list">
            <header>
              <h1 className="documentFirstHeading govuk-heading-l govuk-!-margin-bottom-6">
                {content.title}
              </h1>
              {content.description && (
                <p className="documentDescription">{content.description}</p>
              )}
            </header>
            <section id="content-core">
              {content.items.map((item, index) => (
                <article key={item.url} className="cc-article-preview">
                  <h2 className="govuk-heading-m govuk-!-margin-bottom-5">
                    <UniversalLink item={item} title={item['@type']}>
                      {item.title}
                    </UniversalLink>
                  </h2>
                  {item.image_field && (
                    <PreviewImage
                      item={item}
                      alt={item.image_caption ? item.image_caption : item.title}
                      size="thumb"
                      className="ui image floated right clear"
                    />
                  )}
                  {item.description && (
                    <p className="govuk-body-m govuk-!-margin-bottom-3">
                      {item.description}
                    </p>
                  )}
                  <p className="govuk-heading-s">
                    <UniversalLink item={item}>
                      <FormattedMessage
                        id="Read More"
                        defaultMessage="Read More"
                      />
                    </UniversalLink>
                  </p>
                  {index < content.items.length - 1 && (
                    <hr className="govuk-section-break govuk-section-break--visible govuk-section-break--xl" />
                  )}
                </article>
              ))}
            </section>
          </article>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
SummaryView.propTypes = {
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
     * Child items of the object
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Title of the item
         */
        title: PropTypes.string,
        /**
         * Description of the item
         */
        description: PropTypes.string,
        /**
         * Url of the item
         */
        url: PropTypes.string,
        /**
         * Image of the item
         */
        image: PropTypes.object,
        /**
         * Image caption of the item
         */
        image_caption: PropTypes.string,
        /**
         * Type of the item
         */
        '@type': PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default injectIntl(SummaryView);
