// Adapted from https://github.com/alphagov/govuk-design-system/blob/main/views/partials/_masthead.njk

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Tag } from 'govuk-react-jsx';
import { CcMasthead } from '../CcMasthead/CcMasthead';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';

import { getRawContent } from '../../actions';
import earth from './Earth.svg';

const HeroHeaderTextBlock = ({ content, props }) => {
  useEffect(() => {}, []);

  return (
    <>
      {content ? (
        <>
          {props?.data?.tag !== '' && props?.data?.tag !== undefined && (
            <Tag className="govuk-tag--grey app-masthead__tag">
              {props?.data?.tag}
            </Tag>
          )}
          <h1 className="govuk-heading-xl app-masthead__title">
            {content ? content?.data?.title : props?.data?.title}
          </h1>
          <p className="app-masthead__description">
            {content?.data?.description}
          </p>
        </>
      ) : (
        <>
          {props?.data?.caption !== '' && (
            <span className="app-masthead__caption">
              {props?.data?.caption}
            </span>
          )}
          <h1 className="govuk-heading-xl app-masthead__title">
            {content ? content?.data?.title : props?.data?.title}
          </h1>
          <p className="app-masthead__description">{props?.data?.summary}</p>
        </>
      )}
    </>
  );
};

const CallToActionButton = ({ props, callToAction, articlePath }) => {
  useEffect(() => {}, []);
  if (callToAction == '' || callToAction == null) {
    return <div className="app-masthead__start" />;
  }
  return (
    <>
      <Button
        isStartButton
        className="govuk-button--secondary app-masthead__start"
        href={articlePath}
      >
        {props?.data?.call_to_action}
      </Button>
    </>
  );
};

const InnerMasthead = ({ content, props, articlePath }) => {
  const [className, setClassName] = useState(
    'app-masthead__grid-column govuk-grid-column-one-half',
  );
  const imgRef = useRef(null);

  useEffect(() => {
    let image_source = props?.data?.image_source;
    if (!image_source || image_source.length === 0) {
      // if no image, make article full width
      setClassName('app-masthead__grid-column govuk-grid-column-full');
    } else {
      setClassName('app-masthead__grid-column govuk-grid-column-one-half');
    }
  }, [props.data.image_source]);

  if (content?.loading || (content === null && articlePath !== '#')) {
    return <div style={{ height: 400 }}></div>;
  }

  return (
    <div className="govuk-grid-row" ref={imgRef}>
      <div className={className}>
        <HeroHeaderTextBlock content={content} props={props} />
        <CallToActionButton
          props={props}
          articlePath={articlePath}
          callToAction={props?.data?.call_to_action}
        />
      </div>
      <HeroHeaderImage
        image={props?.data?.image_source[0]?.['@id']}
        imgRef={imgRef}
        props={props}
      />
    </div>
  );
};

const HeroHeaderImage = ({ image, imgRef, props }) => {
  const [height, setHeight] = useState(700);

  useEffect(() => {
    let heightOffset = props.data.bannerDisplay ? 100 : 25;
    const handleResize = () => {
      let tempHeight =
        imgRef.current === null
          ? 100
          : imgRef.current.clientHeight + heightOffset;
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
  }, []);

  if (image == '' || image == undefined) {
    return (
      <div className="govuk-grid-column-one-half app-masthead__grid-column"></div>
    );
  }

  let marginOffset = props.data.bannerDisplay ? -75 : 0;
  var tempImg = flattenToAppURL(image) + '/@@images/image';

  return (
    <div className="govuk-grid-column-one-half app-masthead__grid-column">
      <img
        className="app-masthead__image"
        //src={image}
        src={tempImg}
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

export const CcHeroHeaderView = (props) => {
  const [marginInset, setMarginInset] = useState(false);
  const [phaseBannerDisplay, setPhaseBannerDisplay] = useState(false);

  let articlePath = '#';

  const dispatch = useDispatch();

  if (props.data.file_path && props.data.file_path.length > 0) {
    articlePath = props.data.file_path[0]['@id'];
  }

  const request = useSelector((state) => state.rawData?.[articlePath]);
  const content =
    props.data.file_path.length > 0
      ? { data: props.data.file_path[0] }
      : request || null;

  useEffect(() => {
    if (content === null) {
      doDispatch();
    }
  }, [dispatch, articlePath]);

  const doDispatch = async () => {
    if (articlePath !== '#') {
      dispatch(getRawContent(articlePath));
    }
  };

  useEffect(() => {
    if (props.data.margin == true) {
      setMarginInset(true);
    } else {
      setMarginInset(false);
    }
    // is this needed here?
    if (props.data.bannerDisplay === false) {
      setPhaseBannerDisplay(false);
    } else {
      setPhaseBannerDisplay(true);
    }
  }, [props.data.margin, props.data.bannerDisplay]);

  return (
    <CcMasthead
      className={marginInset && 'app-masthead--bottom-overlap'}
      shouldDisplayPhaseBanner={phaseBannerDisplay}
    >
      <InnerMasthead
        content={content}
        //content={{ data: props.data.file_path[0] }}
        props={props}
        articlePath={articlePath}
      />
    </CcMasthead>
  );
};
