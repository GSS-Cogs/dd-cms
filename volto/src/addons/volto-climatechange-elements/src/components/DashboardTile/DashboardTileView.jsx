import Bar from './TileVis/Bar/Bar';
import { useTileVisData } from '../../hooks';
import { VIS_SPARK_LINE, VIS_BAR } from './schema';
import SparkLineContainer from './TileVis/SparkLine/SparkLineContainer';

export const DashboardTileView = ({ data }) => {
  const { sparkLineData, barData } = useTileVisData(data.data_source);

  return (
    <div className="cc-dashboard-tile">
      <div className="cc-dashboard-tile--header">
        <div className="cc-dashboard-tile--topic">{data.topic}</div>
        <div className="cc-dashboard-tile--title">{data.title}</div>
      </div>

      {/* Include an empty div that fills the space in the middle of the tile if the data vis hasn't loaded yet */}
      {!sparkLineData && !barData && <div style={{ flexGrow: 1 }} />}

      {sparkLineData && data.vis_type === VIS_SPARK_LINE ? (
        <SparkLineContainer data={sparkLineData} lineColor={'#1D70B8'} />
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
