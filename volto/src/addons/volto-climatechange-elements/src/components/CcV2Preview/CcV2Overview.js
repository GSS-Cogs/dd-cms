import React from 'react';
import { ErrorSummary } from 'govuk-react-jsx';

export const CcV2Overview = () => (
  <div>
    <ErrorSummary
      description="Please change the layout to cc_preview"
      errors={[
        {
          targetName: 'description',
          text: 'This error is due to selecting an unsupported view',
        },
      ]}
      heading="This view layout is no longer in use"
    />
  </div>
);
