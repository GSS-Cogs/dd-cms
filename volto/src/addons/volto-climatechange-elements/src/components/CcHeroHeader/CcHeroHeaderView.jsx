// Adapted from https://github.com/alphagov/govuk-design-system/blob/main/views/partials/_masthead.njk

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Tag } from 'govuk-react-jsx';
import { CcMasthead } from '../CcMasthead/CcMasthead';

import { getRawContent } from '../../actions';
import earth from './Earth.svg';

export const CcHeroHeaderView = (props) => {
  const [summary, setSummary] = useState('');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');
  const [callToAction, setCallToAction] = useState('');
  const [tag, setTag] = useState('');
  const [marginInset, setMarginInset] = useState(false);
  const [phaseBannerDisplay, setPhaseBannerDisplay] = useState(false);
  const [height, setHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);

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
      if (props.data.call_to_action != '') {
        setCallToAction(props.data.call_to_action);
      }
      if (props.data.tag != '') {
        setTag(props.data.tag);
      }
    } else if (props.data) {
      setTitle(props.data.title);
      setSummary(props.data.summary);
      setCaption(props.data.caption);
      setCallToAction('');
    }
    const image_source = props.data.image_source;
    if (image_source && image_source.length > 0) {
      setImage(props.data.image_source[0]['getURL']);
    } else {
      setImage('');
    }

    if (props.data.margin == true) {
      setMarginInset(true);
    } else {
      setMarginInset(false);
    }
    if (props.data.bannerDisplay === false) {
      setPhaseBannerDisplay(false);
    } else {
      setPhaseBannerDisplay(true);
    }
  }, [content, props.data]);

  useEffect(() => {
    // Handler to call on window resize
    let heightOffset = phaseBannerDisplay ? 100 : 25;
    const handleResize = () => {
      let tempHeight =
        ref.current === null ? 100 : ref.current.clientHeight + heightOffset;
      if (tempHeight >= 700) {
        tempHeight = 700;
      }
      setHeight(tempHeight);
    };
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  });

  const InnerMasthead = () => {
    let className = 'app-masthead__grid-column govuk-grid';
    if (image != '') {
      // if no image, make article full width
      className += '-column-one-half';
    } else {
      className += '-column-full';
    }

    if (summary === '' || summary === undefined) {
      return (
        <div className="govuk-grid-row" style={{ height: 400 }}>
          <h1 className="govuk-heading-xl app-masthead__title"></h1>
        </div>
      );
    }
    return (
      <div className="govuk-grid-row" ref={ref}>
        <div className={className}>
          {content
            ? tag !== '' &&
              tag !== undefined && (
                <Tag className="govuk-tag--grey app-masthead__tag">{tag}</Tag>
              )
            : caption != '' && (
                <span className="app-masthead__caption">{caption}</span>
              )}
          <h1
            onLoad={setIsLoading(false)}
            className="govuk-heading-xl app-masthead__title"
          >
            {title}
          </h1>
          <p className="app-masthead__description">{summary}</p>
          <CallToActionButton />
        </div>
        <HeroHeaderImage />
      </div>
    );
  };

  const CallToActionButton = () => {
    if (callToAction == '' || callToAction == null) {
      return <div className="app-masthead__start" />;
    }
    return (
      <Button
        isStartButton
        className="govuk-button--secondary app-masthead__start"
        href={articlePath}
      >
        {callToAction}
      </Button>
    );
  };

  const HeroHeaderImage = () => {
    if (image == '' || image == undefined || isLoading) {
      return (
        <div className="govuk-grid-column-one-half app-masthead__grid-column"></div>
      );
    }
    let marginOffset = phaseBannerDisplay ? -75 : 0;
    return (
      <div className="govuk-grid-column-one-half app-masthead__grid-column">
        <img
          className="app-masthead__image"
          src={image}
          alt=""
          role="presentation"
          style={{
            position: 'absolute',
            height: height,
            width: height + 100,
            marginTop: marginOffset,
          }}
        />
      </div>
    );
  };

  return (
    <CcMasthead
      className={marginInset && 'app-masthead--bottom-overlap'}
      shouldDisplayPhaseBanner={phaseBannerDisplay}
    >
      <InnerMasthead />
    </CcMasthead>
  );
};
