import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

const SparkLine = ({ data, lineColor, width, height }) => {
  const svgRef = useRef();

  useEffect(() => {
    refreshChart();
  }, [data, lineColor, width, height]);

  const refreshChart = () => {
    const svg = d3
      .select(svgRef.current)
      .attr('width', '100%')
      .attr('height', height - 8);

    // Calculate the x scale assuming categorical string values for x.
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([2, width - 2]); // Pad each end of the path by 2px

    // Calculate the minimum and maximum values of y
    const yValues = data.map((d) => d[1]);
    const [yMin, yMax] = d3.extent(yValues);

    // Calculate the y scale using the minimum and maximum values of y
    const yScale = d3.scaleLinear().domain([yMin, yMax]).range([height, 0]);

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

  return <svg ref={svgRef} />;
};

export default SparkLine;
