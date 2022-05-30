import React from 'react';

export const CcMasthead = ({ children, className }) => (
  <div className={`cc-masthead-wrapper ${className || ''}`}>
    {children}
  </div>
)