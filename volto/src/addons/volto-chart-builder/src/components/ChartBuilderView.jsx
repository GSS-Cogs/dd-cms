import React from 'react';
import { ActualChart } from 'gss-cogs-chart-builder';
import 'gss-cogs-chart-builder/gss-cogs-chart-builder.css';

export const ChartBuilderView = ({ data }) => {
  if (!data.chartDefinition) return null;

  const cd = JSON.parse(data.chartDefinition);
  return (
    <div>
      <ActualChart chartDefinition={cd} />
    </div>
  );
};
