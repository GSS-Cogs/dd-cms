import { Fragment, useRef, useEffect } from 'react';
import './spark-line.scss';
import * as d3 from 'd3';
import ValuesBlock from '../ValuesBlock/ValuesBlock';
import useResizeObserver from '@react-hook/resize-observer'

const useSize = (target) => {
		const [size, setSize] = React.useState()
	
		useEffect(() => {
			setSize(target.current.getBoundingClientRect())
		}, [target])
	
		useResizeObserver(target, (entry) => setSize(entry.contentRect))
		return size
	}

// SparkLine takes the following parameters:
//	- data: array of arrays with two elements, the first element is the x value and the second element is the y value
//	- height: string with height of spark line visualisation in pixels
//	- lineColor: string that sets the color of the spark line and also the color of the Y values for the values block
const SparkLine = ({ data, height, lineColor }) => {
	// Keep a reference to the SVG element for d3 to control
	const svgRef = useRef();

	// Ref for the rezise observer
	const containerRef = useRef();

	// Get width from the resize observer (we need this for the svg width and x scale)
	const size = useSize(containerRef);
	const width = size? size.width : 0;

	// Get the start and end values for x and y. These will be rendered under the sparkline
	const xStart = data[0][0];
	const xEnd = data[data.length - 1][0];
	const yStart = data[0][1];
	const yEnd = data[data.length - 1][1];

	useEffect(() => {
		refreshChart();
	}, [data, height, lineColor, width]);

	const refreshChart = () => {
		const svg = d3
			.select(svgRef.current)
			.attr('width', "100%")
			.attr('height', height - 65	);

		// Calculate the x scale assuming categorical string values for x
		const xScale = d3
			.scaleLinear()
			.domain([0, data.length - 1])
			.range([0, width]);

		// Calculate the minimum and maximum values of y
		const yValues = data.map((d) => d[1]);
		const [yMin, yMax] = d3.extent(yValues);

		// Calculate the y scale using the minimum and maximum values of y
		const yScale = d3
			.scaleLinear()
			.domain([yMin, yMax])
			.range([height - 65, 0])
			.nice();

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

	return (
		<Fragment>
			<div
				className="cc-spark-line-container cc-dashboard-tile--content"
				style={{ 'height': `${height}px` }}
				ref={containerRef}
				data-testid="spark-line"
			>
				<svg ref={svgRef} />
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
export default SparkLine;
