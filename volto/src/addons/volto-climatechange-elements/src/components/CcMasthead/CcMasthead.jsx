import React from 'react';

export const CcMasthead = ({ children, className }) => (
    <div className={`app-masthead ${className || ''}`}>
        <div className="app-width-container">
            <div className="govuk-grid-row">
                {children}
            </div>
        </div>
    </div>
);