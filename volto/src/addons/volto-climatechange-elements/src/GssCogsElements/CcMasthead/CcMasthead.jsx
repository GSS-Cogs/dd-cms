import React from 'react';
import './CcMasthead.scss';

export const CcMasthead = ({ children, className }) => (
  <div className={`cc-masthead-wrapper ${className || ''}`}>
    {children}
  </div>
)