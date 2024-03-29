import React, { useCallback, useEffect, useState } from 'react';
import { Field, SidebarPortal } from '@plone/volto/components';
import { Form } from 'semantic-ui-react';
import {
  ChartContext,
  ChartPreview,
  getInitialChartProperties,
  ChartPropertiesSchema,
  SidePanel,
  useChartContext,
} from 'gss-cogs-chart-builder';
import { usePloneCsvData, usePloneGeoJson } from '../hooks';
import debounce from 'lodash.debounce';
import migrateChartProperties from '../utils/chartPropertiesMigrator';

const View = () => {
  return <ChartPreview />;
};

const Edit = (props) => {
  const { selected, onChangeBlock, block, data, properties } = props;

  const { error: dataError } = usePloneCsvData(
    properties.parent,
    data.file_path || [],
  );
  // this error does not seem to be being set, despite there being a problem in usePloneCsvData
  const { error: geoJsonError } = usePloneGeoJson(
    properties.parent,
    data.geojson_path || [],
  );

  return (
    <SidebarPortal selected={selected}>
      <div id="chart-builder">
        <SidePanel
          renderDataSelector={() => (
            <>
              <header className="header pulled">
                <h2>Data</h2>
              </header>
              <Form>
                <Field
                  id="file_path"
                  widget="object_browser"
                  mode="link"
                  title="Data file"
                  error={dataError}
                  widgetOptions={{
                    pattern_options: {
                      selectableTypes: [
                        'File',
                        'sparql_dataconnector',
                        'csv_type',
                      ],
                    },
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
            </>
          )}
          renderGeoJsonSelector={() => (
            <Form>
              <Field
                id="geojson_path"
                widget="object_browser"
                mode="link"
                title="GEOJSON file"
                error={geoJsonError}
                widgetOptions={{
                  pattern_options: {
                    selectableTypes: ['csv_type', 'sparql_dataconnector'],
                  },
                }}
                value={data.geojson_path || []}
                onChange={(id, value) => {
                  onChangeBlock(block, {
                    ...data,
                    [id]: value,
                  });
                }}
              />
            </Form>
          )}
        />
      </div>
    </SidebarPortal>
  );
};

// try to extract the initialValue for the react state hook
// from the block config.
// we store the values in the block config down in the effect
// in useBlockChartContextState
function useVoltoBlockDataState(data, id, initialValue) {
  const [value, updater] = useState(() => {
    const result = data.hasOwnProperty(id)
      ? JSON.parse(data[id])
      : initialValue;

    if (id === 'chartProperties') {
      // For newly created charts we use getInitialChartProperties(ChartPropertiesSchema) to generate
      // a new set of properties with default values based on ChartPropertiesSchema which is the our
      // source of truth for chart properties. Note newly created charts are identified by the fact that
      // their shape is a function or an array.

      const isANewChart = typeof result === 'function' || Array.isArray(result);
      if (isANewChart) return getInitialChartProperties(ChartPropertiesSchema);

      // For existing charts we need to migrate the properties and sections to match the ChartPropertiesSchema
      return migrateChartProperties(result, ChartPropertiesSchema);
    }

    if (result === initialValue && typeof initialValue === 'function') {
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
  const [chartProperties, setAllChartProperties] = useVoltoBlockDataState(
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

  const setChartProperties = useCallback(
    (section, field, value) => {
      setAllChartProperties((existing) => {
        return {
          ...existing,
          [section]: {
            ...existing[section],
            [field]: value,
          },
        };
      });
    },
    [setAllChartProperties],
  );

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
