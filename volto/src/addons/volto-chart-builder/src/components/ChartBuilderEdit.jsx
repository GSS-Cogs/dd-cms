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

function useVoltoBlockDataState(data, id, initialValue) {
  const [value, updater] = useState(() => {
    console.log('init for', id, data[id]);
    return data.hasOwnProperty(id) ? JSON.parse(data[id]) : initialValue;
  });

  return [value, updater];
}

// props here is a bit hac`ky; expect all the props that a Volto block
// receives, and use the onChangeBlock etc to store our chart state.
export function useChartContextState(props) {
  const {block, data, onChangeBlock} = props;

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
  };
}

export const ChartBuilderEdit = (props) => {
  const state = useChartContextState(props);
  const hook = useChartContext(state);

  return (
    <ChartContext.Provider value={hook}>
      <Edit {...props} />
      <View />
    </ChartContext.Provider>
  );
};
