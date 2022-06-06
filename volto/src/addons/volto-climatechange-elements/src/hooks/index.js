import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChartBuilderData } from 'volto-chart-builder/src/actions';
import { VIS_SPARK_LINE, VIS_BAR } from '../components/DashboardTile/schema';

const barColors = [
  'rgba(29, 112, 184, 1)',
  'rgba(29, 112, 184, 0.64)',
];

// I'm sure there's a hook in the EEA stuff that abstracts this
// or maybe a HOC.  Worth a look to remove this random use of the
// chart builder machinery...
export function useTileVisData(plone_ref) {
  const [sparkLineData, setSparkLineData] = useState(null);
  const [barData, setBarData] = useState(null);

  const contentRef = plone_ref?.length ? plone_ref[0] : null;
  const dispatch = useDispatch();

  useEffect(() => {
    if (contentRef != null) {
      dispatch(getChartBuilderData(contentRef['@id'], '@connector-data'));
    }
  }, [contentRef, dispatch]);

  const response = useSelector((state) =>
    contentRef ? state.chartBuilderRawData.get(contentRef['@id']) : null,
  );

  useEffect(() => {
    if (
      response != null &&
      contentRef != null &&
      response.loaded
    ) {
      if (
        response?.content?.data != null
        && typeof response.content.data === 'object'
        && Array.isArray(response.content.data?.results?.x)
        && Array.isArray(response.content.data?.results?.y)
      ) {
        setSparkLineData(response.content.data.x.map((xVal, index) => [xVal, response.content.data.y[index]]));
      }

      if (
        response?.content?.data != null
        && typeof response.content.data === 'object'
        && Array.isArray(response.content.data?.results?.label)
        && Array.isArray(response.content.data?.results?.total)
      ) {
        setBarData(response.content.data.results.label.slice(0, 2).map((category, index) => ({
          category,
          value: response.content.data.results.total[index],
          color: barColors[index],
        })));
      }
    }
  }, [response, contentRef]);

  return {
    sparkLineData, barData,
  };
}

export function useTileVisValidation(plone_ref, vis_type) {
  // rely on the DashboardTileView calling useTileVisData
  // to actually load the data; just wait for it to arrive
  // and then validate it.
  // this will only be useful in the editor anyway.
  const [error, setError] = useState([]);

  const contentRef = plone_ref?.length ? plone_ref[0] : null;
  const dispatch = useDispatch();

  useEffect(() => {
    setError([]);
  }, [contentRef, dispatch]);

  const content = useSelector((state) =>
    contentRef ? state.chartBuilderRawData.get(contentRef['@id']) : null,
  );

  useEffect(() => {
    if (
      content != null &&
      contentRef != null &&
      content.loaded
    ) {
      let nextError = [];

      if (typeof content.content.data !== 'object') {
        // this is weird; did we not fetch @connector-data compatible data?
        nextError = ['Expected \'data\' key'];
      } else {
        // we have requirements to map data to certain vis_types
        switch (vis_type) {
          case VIS_SPARK_LINE:
            if (!Array.isArray(content.content.data?.results?.x) || !Array.isArray(content.content.data?.results?.y)) {
              nextError =['Data must contain \'x\' and \'y\' fields'];
            }
            break;
          case VIS_BAR:
            if (!Array.isArray(content.content.data?.results?.label) || !Array.isArray(content.content.data?.results?.total)) {
              nextError = ['Data must contain \'label\' and \'total\' fields'];
            }
            break;
        }
      }
      setError(nextError);
    }
    if (
      content != null &&
      contentRef != null &&
      content.error
    ) {
      setError([content.error.message]);
    }
  }, [content, contentRef, vis_type]);

  return {
    error,
  };
}
