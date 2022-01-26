import React from 'react';
import { H3, H4 } from 'govuk-react';

import './RelatedLinks.scss';

export const RelatedLinks = () => (
  <div className="cc-related-links">
    <H3>Related Links</H3>
    <ul className="cc-related-links--list">
      <li className="cc-related-links--item">
        <H4>
          <a href="#">PMD - Publish My Data</a>
        </H4>
        <div>
          IDS is bringing together data from across the UK government and
          Devolved Administrations, with the Data Explorer providing new ways to
          search across and filter datasets to give you the data you need.
        </div>
      </li>
      <li className="cc-related-links--item">
        <H4>
          <a href="#">Met Office</a>
        </H4>
        <div>
          Met Office weather forecasts for the UK. World leading weather
          services for the public.
        </div>
      </li>
    </ul>
  </div>
);
