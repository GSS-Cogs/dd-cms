import React from 'react';
import './CcMasthead.scss';

export const CcMasthead = ({ children, className }) => (
  <div className={`cc-masthead-wrapper cc-masthead-wrapper--bottom-overlap ${className || ''}`}>
    {children}
  </div>
)