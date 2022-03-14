import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChartView } from '../Chart/ChartView';
import { FigureView } from '../Figure/FigureView';

import { getAddItemBlockData } from '../../actions';

export const AddItemView = (props) => {
  const { data } = useSelector((state) => state.addItemBlockData);
  const isItem = props.data.item && props.data.item[0];
  const dispatch = useDispatch();

  let content = {};
  let contentType = '';

  if (isItem && data && data.length >= 1) {
    content =
      data.filter((item) => item.id === props.data.item[0]['getURL'])[0] || {};
    contentType = content.type;
  }

  useEffect(() => {
    if (isItem) {
      dispatch(getAddItemBlockData(props.data.item[0]['@id']));
    }
  }, [props.data.item]);

  const ViewBlockMap = {
    chart: ChartView,
    figure: FigureView,
  };

  const View = ViewBlockMap[contentType];

  return View ? <View content={{ ...content }} /> : <div>Add an item</div>;
};
