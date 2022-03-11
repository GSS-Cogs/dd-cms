import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChartContext from 'chart-builder/src/context/ChartContext';
import { getCsvData } from '../actions';

export function usePloneCsvData(plone_ref) {
  const { importCsvData } = useContext(ChartContext);
  const dispatch = useDispatch();

  const file = plone_ref.length ? plone_ref[0] : null;

  const fileData = useSelector((state) =>
    file ? state.chartBuilderRawData.get(file['@id']) : null,
  );

  useEffect(() => {
    if (file != null) {
      switch (file['@type']) {
        case 'File':
          dispatch(getCsvData(file['@id']));
          break;
      }
    }
  }, [file, dispatch]);

  useEffect(() => {
    if (
      fileData != null &&
      file != null &&
      fileData.loaded &&
      file['@type'] === 'File'
    ) {
      importCsvData(fileData.content, file['@id']);
    }
  }, [fileData, file, importCsvData]);
}
