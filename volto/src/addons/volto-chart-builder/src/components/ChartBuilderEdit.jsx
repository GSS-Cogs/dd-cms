import React, { useCallback, useEffect, useState } from 'react';
import { Field, SidebarPortal } from '@plone/volto/components';
import { Form, Segment } from 'semantic-ui-react';
import { ChartContext, ChartPreview, getInitialChartProperties, ChartPropertiesSchema, SidePanel, useChartContext } from 'gss-cogs-chart-builder';
import { usePloneCsvData } from '../hooks';
import debounce from 'lodash.debounce';

const View = () => {
  return <ChartPreview />;
};

const Edit = (props) => {
  const { selected, onChangeBlock, block, data } = props;
  usePloneCsvData(data.file_path || []);

  return (
    <SidebarPortal selected={selected}>
      <div id="chart-builder">
        <Segment.Group raised>
          <header className="header pulled">
            <h2>CSV Data</h2>
          </header>
          <Form>
            <Field
              id="file_path"
              widget="object_browser"
              mode="link"
              title="Data file"
              widgetOptions={{
                pattern_options: {
                  selectableTypes: ['File', 'discodataconnector', 'sparql_dataconnector'],
                }
              }}
              value={data.file_path || []}
              onChange={(id, value) => {
                onChangeBlock(block, {
                  ...data,
                  [id]: value,
                });
              }}
            />
          </Form>
        </Segment.Group>

        <SidePanel />
      </div>
    </SidebarPortal>
  );
};

function migrateFromPropertiesSchemaAndValue(chartPropertiesSchema) {
  return chartPropertiesSchema.reduce((acc, section) => {
    acc[section.name] = section.properties.reduce((acc, prop) => {
      acc[prop.name] = prop.value;
      return acc;
    }, {});
    return acc;
  }, {});
}

// try to extract the initialValue for the react state hook
// from the block config.
// we store the values in the block config down in the effect
// in useBlockChartContextState
function useVoltoBlockDataState(data, id, initialValue) {
  const [value, updater] = useState(() => {
    const result = data.hasOwnProperty(id)
      ? JSON.parse(data[id])
      : initialValue;

    if (id === 'chartProperties' && Array.isArray(result)) {
      return migrateFromPropertiesSchemaAndValue(result);
    }

    if (typeof initialValue === 'function') {
      return initialValue();
    }

    return result;
  });

  return [value, updater];
}

// props here is a bit hacky; expect all the props that a Volto block
// receives, and use the onChangeBlock etc to store our chart state.
export function useBlockChartContextState(props) {
  const { block, data, onChangeBlock } = props;

  const [chartDefinition, setChartDefinition] = useVoltoBlockDataState(
    data,
    'chartDefinition',
    {},
  );
  const [chartProperties, setChartProperties] = useVoltoBlockDataState(
    data,
    'chartProperties',
    () => getInitialChartProperties(ChartPropertiesSchema),
  );
  const [selectedFilename, setSelectedFilename] = useVoltoBlockDataState(
    data,
    'selectedFilename',
    'No file selected',
  );
  const [dataSelection, setDataSelection] = useVoltoBlockDataState(
    data,
    'dataSelection',
    null,
  );
  const [selectedColumns, setSelectedColumns] = useVoltoBlockDataState(
    data,
    'selectedColumns',
    [],
  );
  const [selectedDimensions, setSelectedDimensions] = useVoltoBlockDataState(
    data,
    'selectedDimensions',
    [],
  );
  const [sparqlQuery, setSparqlQuery] = useVoltoBlockDataState(
    data,
    'sparqlQuery',
    '',
  );

  const [mapData, setMapData] = useVoltoBlockDataState(data, 'mapData', []);
  const [geoJson, setGeoJson] = useVoltoBlockDataState(data, 'geoJson', []);

  // debounce updates to the block state e.g, for text property changes
  // that can change rapidly
  const debouncedOnChangeBlock = useCallback(
    debounce((callback) => {
      callback();
    }, 100),
    [],
  );

  // everytime any of the values change, serialize all the values
  // into the volto block data.
  // we store everything in a single effect here because there are
  // several places that call multiple setX functions directly
  // after each other, and you get into closure problems caused
  // by stale ...data spreads otherwise.
  // so by doing them all in the same effect, we can be sure they
  // all spread off the one "data" value.
  useEffect(() => {
    debouncedOnChangeBlock(() => {
      onChangeBlock(block, {
        ...data,
        chartDefinition: JSON.stringify(chartDefinition),
        chartProperties: JSON.stringify(chartProperties),
        selectedFilename: JSON.stringify(selectedFilename),
        dataSelection: JSON.stringify(dataSelection),
        selectedColumns: JSON.stringify(selectedColumns),
        selectedDimensions: JSON.stringify(selectedDimensions),
        sparqlQuery: JSON.stringify(sparqlQuery),
      });
    });
  }, [
    // data, // don't include, we only want to include our changes
    // onChangeBlock, // isn't memoized :(
    chartDefinition,
    chartProperties,
    selectedFilename,
    dataSelection,
    selectedColumns,
    selectedDimensions,
    sparqlQuery,
  ]);

  return {
    chartDefinition,
    setChartDefinition,
    chartProperties,
    setChartProperties,
    selectedFilename,
    setSelectedFilename,
    dataSelection,
    setDataSelection,
    selectedColumns,
    setSelectedColumns,
    selectedDimensions,
    setSelectedDimensions,
    mapData,
    setMapData,
    geoJson,
    setGeoJson,
    sparqlQuery,
    setSparqlQuery,
  };
}

export const ChartBuilderEdit = (props) => {
  const state = useBlockChartContextState(props);
  const hook = useChartContext(state);

  return (
    <ChartContext.Provider value={hook}>
      <Edit {...props} />
      <View />
    </ChartContext.Provider>
  );
};
