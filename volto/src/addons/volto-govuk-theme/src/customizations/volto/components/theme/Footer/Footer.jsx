/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { injectIntl } from 'react-intl';
import { Footer as GovukFooter } from 'govuk-react-jsx';

/**
 * Component to display the footer.
 * @function Footer
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component
 */
const Footer = ({ intl }) => {
  return (
    <GovukFooter
      containerClassName="volto-width-container--wide"
      meta={{
        items: [
          {
            children: 'Item 1',
            href: '/'
          },
          {
            children: 'Item 2',
            href: '/footer-meta-item-2'
          },
          {
            children: 'Item 3',
            href: '/'
          }
        ],
        visuallyHiddenTitle: 'Support links'
      }}
    />
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Footer.propTypes = {
  /**
   * i18n object
   */
};

export default injectIntl(Footer);
