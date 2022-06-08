import * as d3 from 'd3';
import { useRef, useEffect } from 'react';
import useResizeObserver from '@react-hook/resize-observer';

// SparkLine takes the following parameters:
//	- data: array of arrays with two elements, the first element is the x value and the second element is the y value
//	- lineColor: string that sets the color of the spark-line
const SparkLine = ({ data, lineColor }) => {
  const svgRef = useRef();
  const divRef = useRef();

  const refreshChart = () => {
    const { height } = divRef.current.getBoundingClientRect();
    const { width } = svgRef.current.getBoundingClientRect();

    const svg = d3.select(svgRef.current);

    // Update svg height based on the height of the containing div
    svg.attr('height', height);

    // Calculate the x scale assuming categorical string values for x.
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([2, width - 2]); // Pad each end of the path by 2px

    // Calculate the minimum and maximum values of y
    const yValues = data.map((d) => parseInt(d[1], 10));
    const [yMin, yMax] = d3.extent(yValues);

    // Calculate the y scale using the minimum and maximum values of y
    const yScale = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .range([height - 2, 2]); // Pad top and bottom of the path by 2px

    // Line function that calculates the pixel coordinates for the line from the scales
    // yScale takes the y value and xScale takes the index of the current observation
    const line = d3
      .line()
      .curve(d3.curveBasis)
      .x((d, i) => xScale(i))
      .y((d, i) => yScale(d[1]));

    svg
      .selectAll('path')
      .data([data])
      .join('path')
      .attr('d', line(data))
      .attr('stroke', lineColor)
      .attr('stroke-width', 4)
      .attr('fill', 'none');
  };

  useEffect(() => {
    refreshChart();
  }, [data, lineColor]);

  useResizeObserver(divRef, () => refreshChart());

  return (
    <div
      ref={divRef}
      className="cc-spark-line-wrapper"
      data-testid="spark-line"
    >
      <svg ref={svgRef} className="cc-spark-line" />
    </div>
  );
};

export default SparkLine;
