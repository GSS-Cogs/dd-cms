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
    const blocks = state.rawPhaseBanner?.phaseBanner?.data ?? null;
    return blocks;
  });

  useEffect(() => {
    if (phaseData === null) {
      dispatch(getPhaseBannerContent());
    }
  }, [phaseData]);

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
    return (
      <div>
        <PhaseBanner
          className={className}
          tag={{
            children: '........',
          }}
        >
          This is a new service your{' '}
          <a
            // href={phaseBannerLink}
            style={{ textDecorationLine: 'underline' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            feedback
          </a>{' '}
          will help us improve it.
        </PhaseBanner>
      </div>
    );
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
        <a
          href={phaseBannerLink}
          style={{ textDecorationLine: 'underline' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          feedback
        </a>{' '}
        will help us improve it.
      </PhaseBanner>
    </div>
  );
};
