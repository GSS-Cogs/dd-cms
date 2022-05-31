import React from 'react';
import { H3, H4 } from 'govuk-react';

export const CcRelatedLinks = ({ properties = {}, limit }) => (
  <div className="cc-related-links">
    <H3>Related Links</H3>
    <ul className="cc-related-links--list">
      {(properties.relatedItems || []).map((data) => (
        <li key={data['@id']} className="cc-related-links--item">
          <H4>
            <a href={data['@id']}>{data.title}</a>
          </H4>
          <div>{data.description}</div>
        </li>
      ))}
    </ul>
  </div>
);
