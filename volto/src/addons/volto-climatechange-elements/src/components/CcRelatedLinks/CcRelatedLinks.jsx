import React from 'react';
import { H3, H4 } from 'govuk-react';

export const CcRelatedLinks = ({ items }) => (
  <div className="cc-related-links">
    <H3>Related Links</H3>
    <ul className="cc-related-links--list">
      {(items || []).map((data) => (
        <li key={data['@id']} className="cc-related-links--item">
          <H4>
            <a href={data['@id']} className="cc-related-links">
              {data.title}
            </a>
          </H4>
          <div className="cc-related-links-description">{data.description}</div>
        </li>
      ))}
    </ul>
  </div>
);
