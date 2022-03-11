import React, { useCallback, useEffect, useState } from 'react';
import { Field, SidebarPortal } from '@plone/volto/components';
import { Form, Segment } from 'semantic-ui-react';
import { useChartContext } from 'chart-builder/src/context/ChartContextProvider';
import initialChartProperties from 'chart-builder/src/context/initialChartProperties';
import SidePanel from 'chart-builder/src/components/side-panel/SidePanel';
import ChartPreview from 'chart-builder/src/components/chart-panel/chart-preview/ChartPreview';
import ChartContext from 'chart-builder/src/context/ChartContext';
import { NO_FILE_SELECTED_TEXT } from 'chart-builder/src/components/constants/Common-constants';
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
                  selectableTypes: ['File', 'discodataconnector'],
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

// try to extract the initialValue for the react state hook
// from the block config.
// we store the values in the block config down in the effect
// in useBlockChartContextState
function useVoltoBlockDataState(data, id, initialValue) {
  const [value, updater] = useState(() => {
    return data.hasOwnProperty(id) ? JSON.parse(data[id]) : initialValue;
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
    initialChartProperties,
  );
  const [selectedFilename, setSelectedFilename] = useVoltoBlockDataState(
    data,
    'selectedFilename',
    NO_FILE_SELECTED_TEXT,
  );
  const [dataSelection, setDataSelection] = useVoltoBlockDataState(
    data,
    'dataSelection',
    null,
  );
  const [availableDimensions, setAvailableDimensions] = useVoltoBlockDataState(
    data,
    'availableDimensions',
    [],
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
        availableDimensions: JSON.stringify(availableDimensions),
        selectedColumns: JSON.stringify(selectedColumns),
        selectedDimensions: JSON.stringify(selectedDimensions),
      });
    });
  }, [
    // data, // don't include, we only want to include our changes
    // onChangeBlock, // isn't memoized :(
    chartDefinition,
    chartProperties,
    selectedFilename,
    dataSelection,
    availableDimensions,
    selectedColumns,
    selectedDimensions,
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
    availableDimensions,
    setAvailableDimensions,
    selectedColumns,
    setSelectedColumns,
    selectedDimensions,
    setSelectedDimensions,
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
