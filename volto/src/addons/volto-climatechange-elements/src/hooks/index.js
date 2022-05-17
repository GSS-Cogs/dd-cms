import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChartBuilderData } from 'volto-chart-builder/src/actions';

// I'm sure there's a hook in the EEA stuff that abstracts this
// or maybe a HOC.  Worth a look to remove this random use of the
// chart builder machinery...
export function useSparkLineData(plone_ref) {
  const [sparkLineData, setSparkLineData] = useState(null);

  const contentRef = plone_ref.length ? plone_ref[0] : null;
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
    }
  }, [content, contentRef]);

  return {
    sparkLineData,
  }
}