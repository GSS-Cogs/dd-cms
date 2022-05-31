import { Fragment, useRef, useEffect } from 'react';
import './spark-line.scss';
import ValuesBlock from '../ValuesBlock/ValuesBlock';
import useResizeObserver from '@react-hook/resize-observer';
import SparkLine from './SparkLine';

const useSize = (target) => {
  const [size, setSize] = React.useState();

  useEffect(() => {
    setSize(target.current.getBoundingClientRect());
  }, [target]);

  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};

// SparkLine takes the following parameters:
//	- data: array of arrays with two elements, the first element is the x value and the second element is the y value
//	- lineColor: string that sets the color of the spark line and also the color of the Y values for the values block
const SparkLineContainer = ({ data, lineColor }) => {
  // Ref for the rezise observer
  const containerRef = useRef();

  // Get width from the resize observer (we need this for the svg width and x scale)
  const size = useSize(containerRef);
  const width = size ? size.width : 0;
  const height = size ? size.height : 0;

  // Get the start and end values for x and y. These will be rendered under the sparkline
  const xStart = data[0][0];
  const xEnd = data[data.length - 1][0];
  const yStart = data[0][1];
  const yEnd = data[data.length - 1][1];

  return (
    <Fragment>
      <div
        className="cc-spark-line-container"
        ref={containerRef}
        data-testid="spark-line"
      >
        <SparkLine
          data={data}
          lineColor={lineColor}
          width={width}
          height={height}
        />
      </div>
      <ValuesBlock
        xStart={xStart}
        xEnd={xEnd}
        yStart={Number(yStart).toFixed(2)}
        yEnd={Number(yEnd).toFixed(2)}
        xColor={lineColor}
        yColor={lineColor}
      />
    </Fragment>
  );
};
export default SparkLineContainer;
