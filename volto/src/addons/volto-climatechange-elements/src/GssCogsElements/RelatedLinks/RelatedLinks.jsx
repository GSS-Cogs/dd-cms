import React from 'react';
import { H3, H4 } from 'govuk-react';

import './RelatedLinks.scss';

const TEST_ITEMS = [
  {
    title: 'PMD - Publish My Data',
    content:
      'IDS is bringing together data from across the UK government and ' +
      'Devolved Administrations, with the Data Explorer providing new ways to ' +
      'search across and filter datasets to give you the data you need.',
  },
  {
    title: 'Met Office',
    content:
      'Met Office weather forecasts for the UK. World leading weather services for the public.',
  },
  {
    title: 'Forestry Research',
    content:
      "Forest Research is Great Britain's principal organisation for forestry and tree related research and is internationally renowned for the provision of evidence...",
  },
  {
    title: 'Department for Business, Energy & Industrial Strategy',
    content:
      'Building a stronger, greener future by fighting coronavirus, tackling climate change, unleashing innovation and making the UK a great place to work and do business...',
  },
];

export const RelatedLinks = () => (
  <div className="cc-related-links">
    <H3>Related Links</H3>
    <ul className="cc-related-links--list">
      {TEST_ITEMS.map((data, i) => (
        <li key={i} className="cc-related-links--item">
          <H4>
            <a href="#">{data.title}</a>
          </H4>
          <div>{data.content}</div>
        </li>
      ))}
    </ul>
  </div>
);
