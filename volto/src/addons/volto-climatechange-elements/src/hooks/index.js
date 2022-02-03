import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getArticleList } from '../actions';

export function useArticleList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticleList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useSelector((state) => state.articleList);
}