import React, { useEffect, useContext, useState, useCallback } from 'react';
import { SidebarPortal } from '@plone/volto/components';
import { useChartContext } from 'chart-builder/src/context/ChartContextProvider';
import initialChartState from 'chart-builder/src/context/initialChartState';
import SidePanel from 'chart-builder/src/components/side-panel/SidePanel';
import ChartPanel from 'chart-builder/src/components/chart-panel/ChartPanel';
import ChartContext from 'chart-builder/src/context/ChartContext';
import CSVUploader from 'chart-builder/src/components/side-panel/csv-uploader/CSVUploader';
import { NO_FILE_SELECTED_TEXT } from 'chart-builder/src/components/constants/Common-constants';

const View = () => {
  const {previewMode} = useContext(ChartContext);

  return previewMode ? <ChartPanel/> : <CSVUploader/>;
};

const Edit = (props) => {
  const {selected} = props;

  return (
    <SidebarPortal selected={selected}>
      <div id="chart-builder">
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
  const [chartDefinition, setChartDefinition] = useVoltoBlockDataState(data, 'chartDefinition', {});
  const [chartProperties, setChartProperties] = useVoltoBlockDataState(data, 'chartProperties', initialChartState);
  const [selectedFilename, setSelectedFilename] = useVoltoBlockDataState(data, 'selectedFilename', NO_FILE_SELECTED_TEXT,);
  const [previewMode, setPreviewMode] = useVoltoBlockDataState(data, 'previewMode', false);
  const [columnNames, setColumnNames] = useVoltoBlockDataState(data, 'columnNames', []);
  const [dataSelection, setDataSelection] = useVoltoBlockDataState(data, 'dataSelection', null);
  const [fullScreenMode, setFullScreenMode] = useVoltoBlockDataState(data, 'fullScreenMode', false);
  const [availableDimensions, setAvailableDimensions] = useVoltoBlockDataState(data, 'availableDimensions', []);
  const [selectedColumns, setSelectedColumns] = useVoltoBlockDataState(data, 'selectedColumns', [])
  const [selectedDimensions, setSelectedDimensions] = useVoltoBlockDataState(data, 'selectedDimensions', [])

  // everytime any of the values change, serialize all the values
  // into the volto block data.
  // we store everything in a single effect here because there are
  // several places that call multiple setX functions directly
  // after each other, and you get into closure problems caused
  // by stale ...data spreads otherwise.
  // so by doing them all in the same effect, we can be sure they
  // all spread off the one "data" value.
  useEffect(() => {
    onChangeBlock(block, {
      ...data,
      tidyData: JSON.stringify(tidyData),
      chartDefinition: JSON.stringify(chartDefinition),
      chartProperties: JSON.stringify(chartProperties),
      selectedFilename: JSON.stringify(selectedFilename),
      previewMode: JSON.stringify(previewMode),
      columnNames: JSON.stringify(columnNames),
      dataSelection: JSON.stringify(dataSelection),
      fullScreenMode: JSON.stringify(fullScreenMode),
      availableDimensions: JSON.stringify(availableDimensions),
      selectedColumns: JSON.stringify(selectedColumns),
      selectedDimensions: JSON.stringify(selectedDimensions),
    });
  }, [
    // data, // don't include, we only want to include our changes
    // onChangeBlock, // isn't memoized :(
    tidyData,
    chartDefinition,
    chartProperties,
    selectedFilename,
    previewMode,
    columnNames,
    dataSelection,
    fullScreenMode,
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
    previewMode,
    setPreviewMode,
    columnNames,
    setColumnNames,
    dataSelection,
    setDataSelection,
    fullScreenMode,
    setFullScreenMode,
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
