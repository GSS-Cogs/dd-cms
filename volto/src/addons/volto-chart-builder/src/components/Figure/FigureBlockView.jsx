import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FigureView from './FigureView';

import { getFigureBlockData } from '../../actions';

export const FigureBlockView = (props) => {
  const dispatch = useDispatch();
  console.log('props.data.figure', props.data.figure);
  const figureId =
    props.data.figure && props.data.figure[0]
      ? props.data.figure[0]['@id']
      : null;

  const { data } = useSelector((state) => state.figureBlockData);

  let match = {};

  if (props.data.figure && props.data.figure[0]) {
    match = data.filter(
      (item) => item.id === props.data.figure[0]['getURL'],
    )[0];
  }

  useEffect(() => {
    if (props.data.figure && props.data.figure[0]) {
      dispatch(getFigureBlockData(props.data.figure[0]['@id']));
    }
  }, [props.data.figure]);

  return (
    <div>
      <FigureView
        content={{ ...match, Background: { title: 'white-smoke' } }}
      />
    </div>
  );
};
