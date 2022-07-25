// Adapted from https://github.com/alphagov/govuk-design-system/blob/main/views/partials/_masthead.njk

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Tag } from 'govuk-react-jsx';
import { CcMasthead } from '../CcMasthead/CcMasthead';

import { getRawContent } from '../../actions';
import earth from './Earth.svg';

export const CcHeroHeaderView = (props) => {
  const [summary, setSummary] = useState(props.data.summary);
  const [title, setTitle] = useState(props.data.title);

  let articlePath = '#';

  const dispatch = useDispatch();

  if (props.data.file_path && props.data.file_path.length > 0) {
    articlePath = props.data.file_path[0]['@id'];
  }

  const request = useSelector((state) => state.rawData?.[articlePath]);

  const content = request?.data || null;

  useEffect(() => {
    if (articlePath !== '#') {
      dispatch(getRawContent(articlePath));
    }
  }, [dispatch, articlePath]);

  useEffect(() => {
    if (content) {
      setSummary(content.description);
      setTitle(content.title);
    }
  }, [content]);

  return (
    <CcMasthead
      className="app-masthead--bottom-overlap"
      shouldDisplayPhaseBanner={true}
    >
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-half app-masthead__grid-column">
          <Tag className="govuk-tag--grey app-masthead__tag">NEW ARTICLE</Tag>
          <h1 className="govuk-heading-xl app-masthead__title">{title}</h1>
          <p className="app-masthead__description">{summary}</p>
          <Button
            isStartButton
            className="govuk-button--secondary app-masthead__start"
            href={articlePath}
          >
            Read article
          </Button>
        </div>

        <div className="govuk-grid-column-one-half app-masthead__grid-column">
          <img
            className="app-masthead__image"
            src={earth}
            alt=""
            role="presentation"
          />
        </div>
      </div>
    </CcMasthead>
  );
};
