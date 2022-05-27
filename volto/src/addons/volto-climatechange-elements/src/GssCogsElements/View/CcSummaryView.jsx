import React from 'react';
import PropTypes from 'prop-types';
import { UniversalLink } from '@plone/volto/components';
import { Container } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import { CcArticleHeader } from '../CcArticleHeader/CcArticleHeader';
import { CcMasthead } from '../CcMasthead/CcMasthead';
import { H1 } from 'govuk-react';
/**
 * Summary view component class.
 * @function SummaryView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const CcSummaryView = ({ content }) => {
  const firstItem = content.items?.[0];

  return (
    <>
      <CcMasthead className="cc-masthead-wrapper--article">
        <H1>{content.title}</H1>

        {/* styled New Article Formatted Date*/}
        {/* Article title - link to article (item.id) */}
        {/* Author item look in cc_related links */}
        {/* Summary item.summary */}
      </CcMasthead>

      {/* GOVUK 66% 33% layout eg masthead */}

      <Container className="view-wrapper summary-view">
        <article id="content">
          <section id="content-core">
            {/* Summary list (remaining items) Date, title, author  */}
            {content.items.map((item) => (
              <article key={item.url}>
                <h2>
                  <UniversalLink item={item} title={item['@type']}>
                    {item.title}
                  </UniversalLink>
                </h2>

                {item.description && <p>{item.description}</p>}
                <p>
                  <UniversalLink item={item}>
                    <FormattedMessage
                      id="Read More…"
                      defaultMessage="Read More…"
                    />
                  </UniversalLink>
                </p>
              </article>
            ))}
          </section>
        </article>
      </Container>
    </>
  );
};
/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
CcSummaryView.propTypes = {
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

export { CcSummaryView };
