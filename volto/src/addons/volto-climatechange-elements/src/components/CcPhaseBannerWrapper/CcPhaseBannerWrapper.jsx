import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PhaseBanner } from 'govuk-react-jsx';
import { getPhaseBannerContent } from '../../actions';

export const CcPhaseBannerWrapper = ({ className }) => {
  const [phaseBannerLink, setPhaseBannerLink] = useState('');
  const [phaseBannerStage, setPhaseBannerStage] = useState('alpha');
  const [phaseBannerDisplay, setPhaseBannerDisplay] = useState(false);
  const dispatch = useDispatch();

  // const request = useSelector((state) => state.reduxAsyncConnect);
  // const blocks = request?.content?.blocks || null;
  // const blocks2 = useSelector((state) => state.content?.data?.blocks ?? {});

  const phaseData = useSelector((state) => {
    const blocks = state.rawPhaseBanner?.phaseBanner?.data?.blocks ?? '';
    //console.log(blocks);
    console.log(blocks);
    let phaseBanner = {};
    for (const [key, value] of Object.entries(blocks)) {
      const block = value;
      if (block['@type'] === 'heroHeader') {
        phaseBanner.bannerStage = block.bannerStage;
        phaseBanner.bannerDisplay = block.bannerDisplay;
        if (block.bannerLinkType == 'mailto') {
          phaseBanner.bannerLink = 'mailto:' + block.bannerLink;
        } else {
          phaseBanner.bannerLink = block.bannerLink;
        }
        break;
      }
    }
    return phaseBanner;
  });

  useEffect(() => {
    dispatch(getPhaseBannerContent());
  }, []);

  useEffect(() => {
    console.log('-------------');
    var obj = phaseData;

    setPhaseBannerStage(obj.bannerStage);
    setPhaseBannerDisplay(obj.bannerDisplay);
    if (obj.bannerLinkType == 'mailto') {
      setPhaseBannerLink('mailto:' + obj.bannerLink);
    } else {
      setPhaseBannerLink(obj.bannerLink);
    }
  }, [phaseData]);

  return phaseBannerDisplay ? (
    <div>
      <PhaseBanner
        className={className}
        tag={{
          children: phaseBannerStage,
        }}
      >
        This is a new service your{' '}
        <Link
          to="#"
          onClick={(e) => {
            window.location.href = phaseBannerLink; //'mailto:climate.change@ons.gov.uk';
            e.preventDefault();
          }}
          style={{ textDecorationLine: 'underline' }}
        >
          feedback
        </Link>{' '}
        will help us improve it.
      </PhaseBanner>
    </div>
  ) : null;
};
