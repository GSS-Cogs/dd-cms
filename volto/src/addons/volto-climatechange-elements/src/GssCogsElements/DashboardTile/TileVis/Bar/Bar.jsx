import './bar.scss';
import ValuesBlock from '../ValuesBlock/ValuesBlock';

// Bar takes the following parameters:
// data: array of objects with keys: category, value, color - where:
// - category is the x axis category label
// - value is the percentage value of the bar
// - color is the color of the bar
// height: string with height of bar in pixels
// Note: the first object in the data array is the first bar and the second object is the second bar

const Bar = ({ data, height }) => {
	const bars = data.map((bar, index) => {
		return (
			<div
				style={{ 'backgroundColor': `${bar.color}`, 'width': `${bar.value}%` }}
				key={index}
			/>
		);
	});
	return (
		<div className="cc-bar-container">
			<div style={{ 'height': `${height}` }} className="cc-bar">
				{bars}
			</div>
			<ValuesBlock
				xStart={data[0].category}
				xEnd={data[1].category}
				yStart={`${data[0].value}%`}
				yEnd={`${data[1].value}%`}
				xColor={data[0].color}
				yColor={data[0].color}
			/>
		</div>
	);
};
export default Bar;
