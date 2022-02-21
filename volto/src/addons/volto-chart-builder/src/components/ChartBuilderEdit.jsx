import React, { useContext } from 'react';
import { SidebarPortal } from '@plone/volto/components';
import ChartContextProvider from 'chart-builder/src/context/ChartContextProvider';
import SidePanel from 'chart-builder/src/components/side-panel/SidePanel';
import ChartPanel from 'chart-builder/src/components/chart-panel/ChartPanel';
import ChartContext from 'chart-builder/src/context/ChartContext';
import CSVUploader from 'chart-builder/src/components/side-panel/csv-uploader/CSVUploader';

export const ChartBuilderEdit = ({ selected }) => {
  const { previewMode } = useContext(ChartContext);
  
  return (
    <ChartContextProvider>
        <SidebarPortal selected={selected}>
          <div id="chart-builder">
            <SidePanel />
          </div>
        </SidebarPortal>


        {previewMode ? <ChartPanel /> : <CSVUploader />}
    </ChartContextProvider>
  );
};