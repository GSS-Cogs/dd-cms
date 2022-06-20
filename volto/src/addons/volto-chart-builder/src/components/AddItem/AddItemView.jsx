import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChartView } from '../Chart/ChartView';
import { FigureView } from '../Figure/FigureView';
import { ImageView } from '../Image/ImageView';

import { getAddItemBlockData } from '../../actions';

export const AddItemView = (props) => {
  const item = props.data.item && props.data.item[0];
  const dispatch = useDispatch();

  if (item == null) return <div>Add an item</div>;

  let content = {};
  let contentType = '';

  const addItemData = useSelector((state) => {
    return item ? state.addItemBlockData.get(props.data.item[0]['@id']) : null;
  });

  if (item && addItemData) {
    content = addItemData.data;
    contentType = content.type;
  }

  useEffect(() => {
    if (item) {
      dispatch(getAddItemBlockData(props.data.item[0]['@id']));
    }
  }, [props.data.item]);

  const ViewBlockMap = {
    chart: ChartView,
    figure: FigureView,
    Image: ImageView,
  };

  const View = ViewBlockMap[contentType];

  return View ? <View content={content} /> : null;
};
