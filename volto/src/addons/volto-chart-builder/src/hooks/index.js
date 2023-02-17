import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChartContext, convertSparqlToGeoJson } from 'gss-cogs-chart-builder';
import { getChartBuilderData } from '../actions';

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

  const response = useSelector((state) =>
    contentRef ? state.chartBuilderRawData.get(contentRef['@id']) : null,
  );

  /*
  This is all to avoid errors being thrown by importEeaData when content is an HTML error page instead of data
  primarily happening after a dashboard has been renamed but the chart maintains refrences to old SPARQL dataconnect paths

  contentRef = {
    @id: "/dashboards/climate-and-weather/sparql-annual-mean-temperature-degc-for-the-uk-1884-to-2020-with-long-term-averages"
    @type: "sparql_dataconnector"
    ...
  }
  parent_ref = {
    @id: "/dashboards/name-has-changed"
  }
  response = {
    content: "<!doctype html>\n              <html lang=\"en\" (very long strong, huge page)
    error: null
    loaded: true
    loading: false
  }

  Pseudocode:
  if importEeaData throws an error || contentRef['@id'] = 404 {
      URL format properties.parent['@id'] from Edit function
      get path segment(s) (i.e /dashboard/emissions or /atricles/name)
              
      if parent_segment.startsWith("/dashboard") && contentRef['@id].startsWith("/dashboard")
          then regex the dashboard name over the one in contentRef.id and try fetching response from there    
      }
  }

  This would likely need to be done on reads and writes, as loading the charts within a dashboard is currently failing
  too. But it's not throwing the same errors so could be a different issue.

  // get the parent dashboard name
  const dashboard_name = parent_ref['@id'].match(/(?<=\/dashboards\/).*./) 

  //insert the parent dashboard name into the contentRef for the query
  const possible_url = contentRef['@id'].replace(/(?<=\/dashboards\/).+?(?=\/)/, dashboard_name) 
  */

  console.log("contentRef", contentRef);

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
      console.log("response - how are we here!?", response);
      if (chartType === 'Map') {
        setMapData(response.content.data.results);
      } else {
        switch (contentRef['@type']) {
          case 'File':
            importCsvData(response.content, contentRef['@id']);
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
              contentRef['@id'],
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
