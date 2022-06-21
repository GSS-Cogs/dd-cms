import { Fragment, useRef, useEffect } from 'react';
import ValuesBlock from '../ValuesBlock/ValuesBlock';
import SparkLine from './SparkLine';

const SparkLineContainer = ({ data, lineColor }) => {
  // Ref for the rezise observer
  const containerRef = useRef();

  // Get the start and end values for x and y. These will be rendered under the sparkline
  const xStart = data[0][0];
  const xEnd = data[data.length - 1][0];
  const yStart = data[0][1];
  const yEnd = data[data.length - 1][1];

  return (
    <Fragment>
      <SparkLine data={data} lineColor={lineColor} />
      <ValuesBlock
        xStart={xStart}
        xEnd={xEnd}
        yStart={Number(yStart).toFixed(2)}
        yEnd={Number(yEnd).toFixed(2)}
        xColor={lineColor}
        yColor={lineColor}
        isABar={false}
      />
    </Fragment>
  );
};
export default SparkLineContainer;
