// migrateChartProperties is a function that takes the stored properties of existing chart content (i.e. Volto blocks JSON)
// and updates the properties to conform to the ChartPropertiesSchema (which is the up to date source of truth on chart
// the properties and sections). Specifically it will add any sections and properties that are missing in the stored properties
// applying default values to any properties that are added. It will also remove any sections and properties from the
// storedProperties that are not in the ChartPropertiesSchema.

// Properties in Chart Builder are arranged in sections (both in the side panel in the UI and in the data structures that
// are used to represent the properties). Each section has a name and one or more properties. Properties in turn
// each have a name and a value (a key-value pair).

// IMPORTANT! The structure and content of the ChartPropertiesSchema and the storedProperties are different to each other.
// Examples of each are given at the end of this file and a summary of the differences is given below.

// **ChartPropertiesSchema** - source of truth for the structure of properties and property sections

// ChartPropertiesSchema is an array of section objects, each section has at minimum a name and an array of property objects.
// The properties in turn have at minimum a name, value and a default value. ChartPropertiesSchema also contains other properties
// that are used to generate the property controls in the side-panel (e.g. property display name, type, options, etc).

// **storedProperties** - source of truth for the values of properties in the current chart instance

// storedProperties is an object with one or more sections that have a name (key) and a value that is an object
// containing the properties for that section in key-value pairs. storedProperties is a much leaner representation of the
// properties than ChartPropertiesSchema. It stores the currently selected values for each property and nothing else.

// The top level reducer iterates through the sections of the chart properties schema and checks if there is a
// corresponding section in the stored properties.

// The nested reducer iterates through the properties of the current section and checks if there is a corresponding
// property in the stored properties. If there is it keeps the stored value, otherwise we use the default value from
// the chart properties schema.

// The returned migrated properties will have the section-property structure specified in ChartPropertiesSchema.
// As a consequence any sections or properties that are not in ChartPropertiesSchema will be removed during
// the migration.

function migrateChartProperties(storedProperties, ChartPropertiesSchema) {
  // Get the sections and properties from the stored properties object
  const sections = Object.keys(storedProperties);
  const properties = Object.values(storedProperties);

  const migratedProperties = ChartPropertiesSchema.reduce((acc, section) => {
    const storedSection = sections.find(
      (x) => x.toLowerCase() === section.name.toLowerCase(),
    );

    acc[section.name] = section.properties.reduce((acc, property) => {
      const storedValue = storedSection
        ? properties[sections.indexOf(storedSection)][property.name]
        : undefined;
      acc[property.name] = storedValue ? storedValue : property.defaultValue;
      return acc;
    }, {});
    return acc;
  }, {});

  return migratedProperties;
}

export default migrateChartProperties;

// Example of the storedProperties object

// {
//   "chartTypes": {
//       "chartType": "Stacked Bar"
//   },
//   "orientationProperties": {
//       "orientation": "vertical"
//   },
//   "chartDimensionProperties": {
//       "height": "400",
//       "marginLeft": "50",
//       "marginRight": "0",
//       "marginTop": "0",
//       "marginBottom": "0"
//   },
//   "xAxisProperties": {
//       "xAxisTitle": "",
//       "xAxisGridLines": true,
//       "xAxisType": "auto",
//       "xAxisRangeMode": "normal",
//       "xAxisTickAngle": "0",
//       "xAxisTickMode": "auto",
//       "xAxisTickLabelLength": 40,
//       "xAxisTickInterval": 1,
//       "xAxisFirstTickLabel": "",
//       "xAxisLastTickLabel": "",
//       "xAxisNTicks": ""
//   },
//   "yAxisProperties": {
//       "yAxisTitle": "Degrees Centigrade",
//       "yAxisGridLines": true,
//       "yAxisType": "auto",
//       "yAxisRangeMode": "normal",
//       "yAxisTickAngle": "0",
//       "yAxisTickMode": "auto",
//       "yAxisTickLabelLength": 40,
//       "yAxisTickInterval": 1,
//       "yAxisFirstTickLabel": "",
//       "yAxisLastTickLabel": "",
//       "yHoverInfoPrecision": "2",
//       "yAxisNTicks": ""
//   },
//   "LegendSection": {
//       "showLegend": true,
//       "xAxisOffset": "-0.1",
//       "mode": "lines"
//   },
//   "colorBarProperties": {
//       "colorBarTitle": "Percentage <br>of area",
//       "colorBarWidth": "25",
//       "colorscale": "Sequential",
//       "autocolorscale": false
//   },
//   "Interactivity": {
//       "interactivity": "x+y",
//       "hoverInfoUnit": "%"
//   },
//   "compactBarChartProperties": {
//       "valuePrefix": "",
//       "unitOfMeasurement": "",
//       "decimalPrecision": ""
//   },
//   "Gridlines": {
//       "showGridLines": true
//   }
// }

// Example of ChartPropertiesSchema
// [
//   {
//     name: 'chartTypes',
//     displayName: 'Chart type',
//     sectionFor: 'all',
//     properties: [
//       {
//         name: 'chartType',
//         displayName: '',
//         showPropertyLabel: false,
//         type: 'radio',
//         options: [
//           'Line',
//           'Bar',
//           'Stacked Bar',
//           'Compact Bar',
//           'Map',
//           'Filled Area',
//           'Stacked Filled Area',
//           'Table',
//         ],
//         defaultValue: 'Line',
//       },
//     ],
//   },
//   {
//     name: 'orientationProperties',
//     displayName: 'Chart orientation',
//     sectionFor: 'charts',
//     properties: [
//       {
//         name: 'orientation',
//         displayName: 'Bar chart orientation',
//         type: 'radio',
//         options: ['vertical', 'horizontal'],
//         defaultValue: 'vertical',
//       },
//     ],
//   },
//   {
//     name: 'chartDimensionProperties',
//     displayName: 'Chart dimensions',
//     sectionFor: 'all',
//     properties: [
//       {
//         name: 'height',
//         displayName: 'Height(px)',
//         type: 'text',
//         defaultValue: '400',
//       },
//       {
//         name: 'marginLeft',
//         displayName: 'Left margin(px)',
//         type: 'text',
//         defaultValue: '50',
//       },
//       {
//         name: 'marginRight',
//         displayName: 'Right margin(px)',
//         type: 'text',
//         defaultValue: '0',
//       },
//       {
//         name: 'marginTop',
//         displayName: 'Top margin(px)',
//         type: 'text',
//         defaultValue: '0',
//       },
//       {
//         name: 'marginBottom',
//         displayName: 'Bottom margin(px)',
//         type: 'text',
//         defaultValue: '0',
//       },
//     ],
//   },
//   {
//     name: 'xAxisProperties',
//     displayName: 'X axis',
//     sectionFor: 'charts',
//     properties: [
//       {
//         name: 'xAxisTitle',
//         displayName: 'Title',
//         type: 'text',
//         defaultValue: '',
//       },
//       {
//         name: 'xAxisGridLines',
//         displayName: 'Show gridlines',
//         type: 'checkbox',
//         defaultValue: true,
//       },
//       {
//         name: 'xAxisType',
//         displayName: 'Type',
//         type: 'radio',
//         options: ['auto', 'linear', 'log', 'date', 'category', 'multicategory'],
//         defaultValue: 'auto',
//       },
//       {
//         name: 'xAxisRangeMode',
//         displayName: 'Range mode',
//         type: 'radio',
//         options: ['normal', 'tozero', 'nonnegative'],
//         defaultValue: 'normal',
//       },
//       {
//         name: 'xAxisTickAngle',
//         displayName: 'Label rotation',
//         type: 'radio',
//         options: ['0', '45', '-45', '-90'],
//         defaultValue: '0',
//       },
//       {
//         name: 'xAxisTickMode',
//         displayName: 'Tick label mode',
//         type: 'radio',
//         options: ['auto', 'manual'],
//         defaultValue: 'auto',
//       },
//       {
//         name: 'xAxisTickLabelLength',
//         displayName: 'Tick label max. length',
//         type: 'text',
//         defaultValue: 40,
//       },
//       {
//         name: 'xAxisTickInterval',
//         displayName: 'Tick interval',
//         type: 'text',
//         defaultValue: 1,
//       },
//       {
//         name: 'xAxisFirstTickLabel',
//         displayName: 'First tick label',
//         type: 'text',
//         defaultValue: '',
//       },
//       {
//         name: 'xAxisLastTickLabel',
//         displayName: 'Last tick label',
//         type: 'text',
//         defaultValue: '',
//       },
//       {
//         name: 'xAxisNTicks',
//         displayName: 'Show N ticks',
//         type: 'text',
//         defaultValue: '',
//       },
//     ],
//   },
//   {
//     name: 'yAxisProperties',
//     displayName: 'Y axis',
//     sectionFor: 'charts',
//     properties: [
//       {
//         name: 'yAxisTitle',
//         displayName: 'Title',
//         type: 'text',
//         defaultValue: '',
//       },
//       {
//         name: 'yAxisGridLines',
//         displayName: 'Show gridlines',
//         type: 'checkbox',
//         defaultValue: true,
//       },
//       {
//         name: 'yAxisType',
//         displayName: 'Type',
//         type: 'radio',
//         options: ['auto', 'linear', 'log', 'date', 'category', 'multicategory'],
//         defaultValue: 'auto',
//       },
//       {
//         name: 'yAxisRangeMode',
//         displayName: 'Range mode',
//         type: 'radio',
//         options: ['normal', 'tozero', 'nonnegative'],
//         defaultValue: 'normal',
//       },
//       {
//         name: 'yAxisTickAngle',
//         displayName: 'Label rotation',
//         type: 'radio',
//         options: ['0', '45', '-45', '-90'],
//         defaultValue: '0',
//       },
//       {
//         name: 'yAxisTickMode',
//         displayName: 'Tick label mode',
//         type: 'radio',
//         options: ['auto', 'manual'],
//         defaultValue: 'auto',
//       },
//       {
//         name: 'yAxisTickLabelLength',
//         displayName: 'Tick label max. length',
//         type: 'text',
//         defaultValue: 40,
//       },
//       {
//         name: 'yAxisTickInterval',
//         displayName: 'Tick interval',
//         type: 'text',
//         defaultValue: 1,
//       },
//       {
//         name: 'yAxisFirstTickLabel',
//         displayName: 'First tick label',
//         type: 'text',
//         defaultValue: '',
//       },
//       {
//         name: 'yAxisLastTickLabel',
//         displayName: 'Last tick label',
//         type: 'text',
//         defaultValue: '',
//       },
//       {
//         name: 'yHoverInfoPrecision',
//         displayName: 'Hoverinfo decimal precision',
//         type: 'text',
//         defaultValue: '2',
//       },
//       {
//         name: 'yAxisNTicks',
//         displayName: 'Show N ticks',
//         type: 'text',
//         defaultValue: '',
//       },
//     ],
//   },
//   {
//     name: 'LegendSection',
//     displayName: 'Legend',
//     sectionFor: 'charts',
//     properties: [
//       {
//         name: 'showLegend',
//         displayName: 'Show legend',
//         type: 'checkbox',
//         defaultValue: true,
//       },
//       {
//         name: 'xAxisOffset',
//         displayName: 'X axis offset',
//         type: 'text',
//         defaultValue: -0.11,
//       },
//       {
//         name: 'mode',
//         displayName: 'Lines and markers',
//         type: 'radio',
//         options: ['lines', 'lines+markers', 'markers'],
//         defaultValue: 'lines',
//       },
//     ],
//   },
//   {
//     name: 'colorBarProperties',
//     displayName: 'Colorbar',
//     sectionFor: 'maps',
//     properties: [
//       {
//         name: 'colorBarTitle',
//         displayName: 'Title',
//         type: 'text',
//         defaultValue: '',
//       },
//       {
//         name: 'colorBarWidth',
//         displayName: 'Width(px)',
//         type: 'text',
//         defaultValue: '25',
//       },
//       {
//         name: 'colorscale',
//         displayName: 'Color scale',
//         type: 'radio',
//         options: ['Sequential', 'Diverging'],
//         defaultValue: 'Sequential',
//       },
//       {
//         name: 'autocolorscale',
//         displayName: 'Auto color scale',
//         type: 'checkbox',
//         defaultValue: false,
//       },
//     ],
//   },
//   {
//     name: 'Interactivity',
//     displayName: 'Interactivity',
//     sectionFor: 'all',
//     properties: [
//       {
//         name: 'interactivity',
//         displayName: 'Series tooltip',
//         type: 'radio',
//         options: ['x+y', 'none'],
//         defaultValue: 'x+y',
//       },
//       {
//         name: 'hoverInfoUnit',
//         displayName: 'Hoverinfo unit',
//         type: 'text',
//         defaultValue: '',
//       },
//     ],
//   },
//   {
//     name: 'compactBarChartProperties',
//     displayName: 'Compact bar chart',
//     sectionFor: 'compactBarCharts',
//     properties: [
//       {
//         name: 'valuePrefix',
//         displayName: 'Prefix',
//         type: 'text',
//         defaultValue: '',
//       },
//       {
//         name: 'unitOfMeasurement',
//         displayName: 'Unit',
//         type: 'text',
//         defaultValue: '',
//       },
//       {
//         name: 'decimalPrecision',
//         displayName: 'Decimal precision',
//         type: 'text',
//         defaultValue: '',
//       },
//     ],
//   },
// ];
