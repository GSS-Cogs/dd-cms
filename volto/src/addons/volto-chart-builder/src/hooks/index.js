import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ChartContext from "chart-builder/src/context/ChartContext";
import { getCsvData } from "../actions";

export function usePloneCsvData(file_path) {
  const { validateData } = useContext(ChartContext);
  const dispatch = useDispatch();

  const file = file_path.length ? file_path[0] : null;
  const fileId = file?.['@id'];

  const fileData = useSelector((state) =>
    state.chartBuilderRawData.get(fileId),
  );

  useEffect(() => {
    if (fileId != null) {
      dispatch(getCsvData(fileId));
    }
  }, [fileId, dispatch]);

  useEffect(() => {
    if (fileData != null) {
      const { content, loaded } = fileData;
      if (loaded) {
        validateData(content, fileId);
      }
    }
  }, [fileData, fileId, validateData]);
}