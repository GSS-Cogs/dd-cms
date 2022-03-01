import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, SidebarPortal } from '@plone/volto/components';
import { Form, Segment } from 'semantic-ui-react';
import { useChartContext } from 'chart-builder/src/context/ChartContextProvider';
import initialChartState from 'chart-builder/src/context/initialChartState';
import SidePanel from 'chart-builder/src/components/side-panel/SidePanel';
import ChartPreview from 'chart-builder/src/components/chart-panel/chart-preview/ChartPreview';
import ChartContext from 'chart-builder/src/context/ChartContext';
import { NO_FILE_SELECTED_TEXT } from 'chart-builder/src/components/constants/Common-constants';
import { getCsvData, setLoadedFileId } from '../actions';

import debounce from 'lodash.debounce';

const View = () => {
  return <ChartPreview />;
};

function usePloneCsvData(file_path) {
  const { validateData } = useContext(ChartContext);
  const dispatch = useDispatch();
  const { content, loaded, loadedId } = useSelector(
    (state) => state.chartBuilderRawData,
  );

  const file = file_path.length ? file_path[0] : null;
  const fileId = file?.['@id'];

  useEffect(() => {
    if (fileId != null) {
      dispatch(setLoadedFileId(fileId));
      dispatch(getCsvData(fileId));
    }
  }, [fileId, dispatch]);

  useEffect(() => {
    if (loaded && fileId === loadedId) {
      validateData(content, loadedId);
    }
  }, [content, loaded, loadedId, fileId, validateData]);
}

const Edit = (props) => {
  const { selected, onChangeBlock, block, data } = props;
  usePloneCsvData(data.file_path || []);

  return (
    <SidebarPortal selected={selected} key={block}>
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

  const [tidyData, setTidyData] = useVoltoBlockDataState(data, 'tidyData', []);
  const [chartDefinition, setChartDefinition] = useVoltoBlockDataState(
    data,
    'chartDefinition',
    {},
  );
  const [chartProperties, setChartProperties] = useVoltoBlockDataState(
    data,
    'chartProperties',
    initialChartState,
  );
  const [selectedFilename, setSelectedFilename] = useVoltoBlockDataState(
    data,
    'selectedFilename',
    NO_FILE_SELECTED_TEXT,
  );
  const [columnNames, setColumnNames] = useVoltoBlockDataState(
    data,
    'columnNames',
    [],
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
        tidyData: JSON.stringify(tidyData),
        chartDefinition: JSON.stringify(chartDefinition),
        chartProperties: JSON.stringify(chartProperties),
        selectedFilename: JSON.stringify(selectedFilename),
        columnNames: JSON.stringify(columnNames),
        dataSelection: JSON.stringify(dataSelection),
        availableDimensions: JSON.stringify(availableDimensions),
        selectedColumns: JSON.stringify(selectedColumns),
        selectedDimensions: JSON.stringify(selectedDimensions),
      });
    });
  }, [
    // data, // don't include, we only want to include our changes
    // onChangeBlock, // isn't memoized :(
    tidyData,
    chartDefinition,
    chartProperties,
    selectedFilename,
    columnNames,
    dataSelection,
    availableDimensions,
    selectedColumns,
    selectedDimensions,
  ]);

  return {
    tidyData,
    setTidyData,
    chartDefinition,
    setChartDefinition,
    chartProperties,
    setChartProperties,
    selectedFilename,
    setSelectedFilename,
    columnNames,
    setColumnNames,
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
