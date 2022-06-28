import React from 'react';
import { H3, H4 } from 'govuk-react';

export const CcRelatedLinks = ({ items, doNotShowAll }) => (
  <div className="cc-related-links">
    <H3>Related Links</H3>
    <ul className="cc-related-links--list">
      {(items || []).map((data) => (
        <li key={data['@id']} className="cc-related-links--item">
          <H4 className="cc-related-links-item-title">
            <a href={data['@id']} className="cc-related-links-item-title">
              {data.title}
            </a>
          </H4>
          <div className="cc-related-links-description">{data.description}</div>
        </li>
      ))}
    </ul>
    {doNotShowAll ? null : (
      <H4>
        <a href="/references" className="cc-related-links--item">
          View All
        </a>
      </H4>
    )}
  </div>
);
