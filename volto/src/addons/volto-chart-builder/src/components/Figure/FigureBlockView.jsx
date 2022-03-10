import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FigureView from './FigureView';

import { getFigureBlockData } from '../../actions';

export const FigureBlockView = (props) => {
  const { data } = useSelector((state) => state.figureBlockData);
  const isFigure = props.data.figure && props.data.figure[0];
  const dispatch = useDispatch();

  let content = {};

  if (isFigure) {
    content = data.filter(
      (item) => item.id === props.data.figure[0]['getURL'],
    )[0];
  }

  useEffect(() => {
    if (isFigure) {
      dispatch(getFigureBlockData(props.data.figure[0]['@id']));
    }
  }, [props.data.figure]);

  return (
    <div>
      <FigureView content={{ ...content }} />
    </div>
  );
};
