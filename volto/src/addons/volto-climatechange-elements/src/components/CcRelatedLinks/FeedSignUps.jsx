import React from 'react';
import { H3, H4 } from 'govuk-react';
import EmailOutlineIcon from '@icons/material/EmailOutlineIcon';
import RssIcon from '@icons/material/RssIcon';

export const FeedSignUps = ({limit}) => (
  <div className="cc-related-links">
    <H3>Sign up and manage updates</H3>

    <div className='cc-signup-types'>
    <a href='#' className='cc-related-links--link'>
      <EmailOutlineIcon /> Email
    </a>

    <a href='#' className='cc-related-links--link'>
      <RssIcon /> RSS
    </a>
    </div>

  </div>
);
