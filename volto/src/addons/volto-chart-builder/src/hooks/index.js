import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChartContext, convertSparqlToGeoJson } from 'gss-cogs-chart-builder';
import { getChartBuilderData } from '../actions';

import { replaceUrl } from '../../../../helpers';

export function usePloneCsvData(parent_ref, plone_ref) {
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

  const updatedUrl = replaceUrl(contentRef?.['@id'], parent_ref?.['@id']);
  const response = useSelector((state) =>
    contentRef ? state.chartBuilderRawData.get(updatedUrl) : null,
  );

  useEffect(() => {
    if (contentRef != null) {
      switch (contentRef['@type']) {
        case 'File':
          dispatch(getChartBuilderData(updatedUrl, '@@download'));
          break;
        case 'discodataconnector':
        case 'sparql_dataconnector':
        case 'csv_type':
          dispatch(getChartBuilderData(updatedUrl, '@connector-data'));
          break;
      }
    }
  }, [contentRef, dispatch]);

  useEffect(() => {
    if (response != null && contentRef != null && response.loaded) {
      setError([]);
      if (chartType === 'Map') {
        setMapData(response.content.data.results);
      } else {
        switch (contentRef['@type']) {
          case 'File':
            importCsvData(response.content, updatedUrl);
            break;
          case 'discodataconnector':
          case 'sparql_dataconnector':
          case 'csv_type':
            // can we capture errors from this call more elegantly?
            importEeaData(
              {
                id: response.content.id,
                data: response.content.data.results,
              },
              updatedUrl,
            );
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

  return { error };
}

export function usePloneGeoJson(parent_ref, plone_ref) {
  const [error, setError] = useState([]);
  const { setGeoJson } = useContext(ChartContext);
  const contentRef = plone_ref.length ? plone_ref[0] : null;
  const dispatch = useDispatch();

  const updatedUrl = replaceUrl(contentRef?.['@id'], parent_ref?.['@id']);
  const response = useSelector((state) =>
    contentRef ? state.chartBuilderRawData.get(updatedUrl) : null,
  );

  useEffect(() => {
    setError([]);
    if (contentRef != null) {
      dispatch(getChartBuilderData(updatedUrl, '@connector-data'));
    }
  }, [contentRef, dispatch]);

  useEffect(() => {
    if (response != null && contentRef != null && response.loaded) {
      if (response.content?.data?.results?.boundary) {
        const geoJson = convertSparqlToGeoJson({
          boundary: response.content.data.results.boundary.map((x) =>
            JSON.parse(x),
          ),
        });
        setGeoJson(geoJson);
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
