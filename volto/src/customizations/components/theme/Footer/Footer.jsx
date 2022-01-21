/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { injectIntl } from 'react-intl';
import { Footer as GovukFooter } from 'govuk-react';

/**
 * Component to display the footer.
 * @function Footer
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component
 */
const Footer = ({ intl }) => {
  return (
    <GovukFooter
      copyright={{
        image: {
          height: 102,
          src: 'images/govuk-crest.png',
          width: 125,
        },
        link:
          'https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/',
        text: 'Crown copyright',
      }}
      meta={
        <GovukFooter.MetaLinks heading="Support links">
          <GovukFooter.Link href="/">Item 1</GovukFooter.Link>
          <GovukFooter.Link href="/footer-meta-item-2">Item 2</GovukFooter.Link>
          <GovukFooter.Link href="/">Item 3</GovukFooter.Link>
        </GovukFooter.MetaLinks>
      }
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
