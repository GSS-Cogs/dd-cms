import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChartContext from 'chart-builder/src/context/ChartContext';
import { getChartBuilderData } from '../actions';

export function usePloneCsvData(plone_ref) {
  const { importCsvData, importEeaData } = useContext(ChartContext);
  const dispatch = useDispatch();

  const contentRef = plone_ref.length ? plone_ref[0] : null;

  const content = useSelector((state) =>
    contentRef ? state.chartBuilderRawData.get(contentRef['@id']) : null,
  );

  useEffect(() => {
    if (contentRef != null) {
      switch (contentRef['@type']) {
        case 'File':
          dispatch(getChartBuilderData(contentRef['@id'], '@@download'));
          break;
        case 'discodataconnector':
        case 'sparql_dataconnector':
        case 'csv_type':
          dispatch(getChartBuilderData(contentRef['@id'], '@connector-data'));
          break;
      }
    }
  }, [contentRef, dispatch]);

  useEffect(() => {
    if (
      content != null &&
      contentRef != null &&
      content.loaded
    ) {
      switch (contentRef['@type']) {
        case 'File':
          importCsvData(content.content, contentRef['@id']);
          break;
        case 'discodataconnector':
        case 'sparql_dataconnector':
        case 'csv_type':
          importEeaData(content.content, contentRef['@id']);
          break;
      }
    }
  }, [content, contentRef, importCsvData, importEeaData]);
}
