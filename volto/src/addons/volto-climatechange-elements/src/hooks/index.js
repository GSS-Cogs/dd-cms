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

  const content = useSelector((state) =>
    contentRef ? state.chartBuilderRawData.get(contentRef['@id']) : null,
  );

  useEffect(() => {
    if (
      content != null &&
      contentRef != null &&
      content.loaded
    ) {
      if (
        content?.content?.data != null
        && typeof content.content.data === 'object'
        && Array.isArray(content.content.data.x)
        && Array.isArray(content.content.data.y)
      ) {
        setSparkLineData(content.content.data.x.map((xVal, index) => [xVal, content.content.data.y[index]]));
      }

      if (
        content?.content?.data != null
        && typeof content.content.data === 'object'
        && Array.isArray(content.content.data.label)
        && Array.isArray(content.content.data.total)
      ) {
        setBarData(content.content.data.label.slice(0, 2).map((category, index) => ({
          category,
          value: content.content.data.total[index],
          color: barColors[index],
        })));
      }
    }
  }, [content, contentRef]);

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
      if (typeof content.content.data !== 'object') {
        // this is weird; did we not fetch @connector-data compatible data?
        setError(['Expected \'data\' key']);
      } else {
        // we have requirements to map data to certain vis_types
        switch (vis_type) {
          case VIS_SPARK_LINE:
            if (!Array.isArray(content.content.data.x) || !Array.isArray(content.content.data.y)) {
              setError(['Data must contain \'x\' and \'y\' fields']);
            }
            break;
          case VIS_BAR:
            if (!Array.isArray(content.content.data.label) || !Array.isArray(content.content.data.total)) {
              setError(['Data must contain \'label\' and \'total\' fields']);
            }
            break;
        }
      }
    }
  }, [content, contentRef]);

  return {
    error,
  };
}
