import React from 'react';
import { Eg1, Eg2 } from './examples';

// example static data - to be replaced with data from volto and removed
import { emissionsData } from './TileVis/mock/data';
import { renewablesData } from './TileVis/mock/data';

import SparkLine from './TileVis/SparkLine/SparkLine';
import Bar from './TileVis/Bar/Bar';
import { useTileVisData } from '../../hooks';
import { VIS_SPARK_LINE, VIS_BAR } from './schema';

export const DashboardTileView = ({ data }) => {
  const { sparkLineData, barData } = useTileVisData(data.data_source);

  return (
    <div className="cc-dashboard-tile">
      <div className="cc-dashboard-tile--header">
        <div className="govuk-caption-m">{data.topic}</div>
        <div className="govuk-heading-m govuk-!-margin-bottom-0 govuk-!-margin-top-1">
          {data.title}
        </div>
      </div>

      {/*<Eg2/>*/}

      {sparkLineData && data.vis_type === VIS_SPARK_LINE ? (
        <SparkLine data={sparkLineData} lineColor={'#1D70B8'} height={150} />
      ) : null}
      {barData && data.vis_type === VIS_BAR ? (
        <Bar data={barData} height={'24px'} />
      ) : null}

      {data.href ? (
        <div className="cc-dashboard-tile--footer">
          <a href={data.href}>{data.linkTitle}</a>
        </div>
      ) : null}
    </div>
  );
};
