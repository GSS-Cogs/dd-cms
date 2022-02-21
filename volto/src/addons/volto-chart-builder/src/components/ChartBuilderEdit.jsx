import React, { useEffect, useContext } from 'react';
import { SidebarPortal } from '@plone/volto/components';
import ChartContextProvider from 'chart-builder/src/context/ChartContextProvider';
import SidePanel from 'chart-builder/src/components/side-panel/SidePanel';
import ChartPanel from 'chart-builder/src/components/chart-panel/ChartPanel';
import ChartContext from 'chart-builder/src/context/ChartContext';
import CSVUploader from 'chart-builder/src/components/side-panel/csv-uploader/CSVUploader';

const View = () => {
  const { previewMode } = useContext(ChartContext);

  return previewMode ? <ChartPanel /> : <CSVUploader />;
};

const Edit = (props) => {
  const { selected, onChangeBlock, data, block, } = props;
  const { chartDefinition } = useContext(ChartContext);

  useEffect(() => {
    onChangeBlock(block, {
      ...data,
      'chartDefinition': JSON.stringify(chartDefinition),
    });

  }, [chartDefinition]);

  console.log('chart definition is', chartDefinition);

  return (
    <SidebarPortal selected={selected}>
      <div id="chart-builder">
        <SidePanel />
      </div>
    </SidebarPortal>
  );
}

export const ChartBuilderEdit = (props) => {

  return (
    <ChartContextProvider>
      <Edit {...props} />
      <View />
    </ChartContextProvider>
  );
};
