import './values-block.scss';

//ValuesBlock takes the following parameters:
// - xStart: string with the start value for the x axis
// - xEnd: string with the end value for the x axis
// - yStart: string with the start value for the y axis
// - yEnd: string with the end value for the y axis
// - xColor: string with the color for the x values
// - yColor: string with the color for the y values

const ValuesBlock = ({ xStart, xEnd, yStart, yEnd, xColor, yColor }) => {
	return (
		<div data-testid = "values-block">
			<div className="cc-start-end-values" style={{ color: `${xColor}` }}>
				<div className="cc-xValue">{xStart}</div>
				<div className="cc-xValue">{xEnd}</div>
			</div>
			<div className="cc-start-end-values" style={{ color: `${yColor}` }}>
				<div className="cc-yValue">{yStart}</div>
				<div className="cc-yValue">{yEnd}</div>
			</div>
		</div>
	);
};

export default ValuesBlock;
