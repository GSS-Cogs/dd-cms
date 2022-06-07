import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChartContext, convertSparqlToGeoJson } from 'gss-cogs-chart-builder';
import { getChartBuilderData } from '../actions';

export function usePloneCsvData(plone_ref) {
  const [error, setError] = useState([]);
  const {
    importCsvData,
    importEeaData,
    chartProperties,
    setMapData,
  } = useContext(ChartContext);
  const dispatch = useDispatch();

  const chartType = chartProperties?.chartTypes?.chartType;

  const contentRef = plone_ref.length ? plone_ref[0] : null;

  const response = useSelector((state) =>
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
    if (response != null && contentRef != null && response.loaded) {
      setError([]);
      if (chartType === 'Map') {
        setMapData(response.content.data);
      } else {
        switch (contentRef['@type']) {
          case 'File':
            importCsvData(response.content, contentRef['@id']);
            break;
          case 'discodataconnector':
          case 'sparql_dataconnector':
          case 'csv_type':
            importEeaData({
              id: response.content.id,
              data: response.content.data.results,
            }, contentRef['@id']);
            break;
        }
      }
    }

    if (response != null && contentRef != null && response.error) {
      setError([response.error.message]);
    }

  }, [
    response,
    contentRef,
    importCsvData,
    importEeaData,
    setMapData,
    chartType,
  ]);

  return { error }
}

export function usePloneGeoJson(plone_ref) {
  const [error, setError] = useState([]);
  const { setGeoJson } = useContext(ChartContext);
  const contentRef = plone_ref.length ? plone_ref[0] : null;
  const dispatch = useDispatch();

  useEffect(() => {
    setError([]);
    if (contentRef != null) {
      dispatch(getChartBuilderData(contentRef['@id'], '@connector-data'));
    }
  }, [contentRef, dispatch]);

  const response = useSelector((state) =>
    contentRef ? state.chartBuilderRawData.get(contentRef['@id']) : null,
  );

  useEffect(() => {
    if (response != null && contentRef != null && response.loaded) {
      if (response.content?.data?.boundary) {
        // content.content.data: { boundary: string[] } the strings are json fragments
        setGeoJson(
          convertSparqlToGeoJson({
            boundary: response.content.data.boundary.map((x) => JSON.parse(x)),
          }),
        );
        setError([]);
      } else {
        setError(['GEOJSON data must have a "boundary" property']);
      }
    }
    if (response != null && contentRef != null && response.error) {
      setError([response.error.message]);
    }
  }, [response, contentRef, setGeoJson]);

  return {
    error,
  };
}
