import React from 'react';
import { ActualChart } from 'chart-builder/src/components/chart-panel/chart-preview/ChartPreview';

export const ChartBuilderView = ({ data }) => {
  if (!data.chartDefinition) return null;

  const cd = JSON.parse(data.chartDefinition);
  return (
    <div>
      <ActualChart chartDefinition={cd} />
    </div>
  );
};
