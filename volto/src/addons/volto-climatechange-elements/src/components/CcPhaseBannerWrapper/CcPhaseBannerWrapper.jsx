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

  const phaseData = useSelector((state) => {
    const blocks = state.rawPhaseBanner?.phaseBanner?.data ?? '';
    return blocks;
  });

  useEffect(() => {
    dispatch(getPhaseBannerContent());
    console.log('loading phase banner: ' + phaseBannerDisplay);
  }, []);

  useEffect(() => {
    var obj = phaseData;
    setPhaseBannerStage(obj.bannerStage);
    setPhaseBannerDisplay(obj.bannerDisplay);
    if (obj.bannerLinkType == 'mailto') {
      setPhaseBannerLink('mailto:' + obj.bannerLink);
    } else {
      setPhaseBannerLink(obj.bannerLink);
    }
  }, [phaseData]);

  if (phaseBannerDisplay === false || phaseBannerDisplay === undefined) {
    return <div style={{ height: 75 }}></div>;
  }

  return (
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
            //'mailto:climate.change@ons.gov.uk';
            window.open(phaseBannerLink, '_blank', 'noopener,noreferrer');
            e.preventDefault();
          }}
          style={{ textDecorationLine: 'underline' }}
        >
          feedback
        </Link>{' '}
        will help us improve it.
      </PhaseBanner>
    </div>
  );
};
