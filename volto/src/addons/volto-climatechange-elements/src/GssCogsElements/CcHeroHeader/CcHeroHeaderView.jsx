import React from 'react';
import { HERO_HEADER_BG } from '../../colors';
import styled from 'styled-components';
import { Button, Tag } from 'govuk-react';
import { spacing, typography } from '@govuk-react/lib';
import earth from './Earth.svg';

const HeroHeaderWrapper = styled('div')({
  background: HERO_HEADER_BG,
  color: 'white',
  height: '512px',
  display: 'flex',
});

const HeroHeaderImage = styled('div')({
  background: HERO_HEADER_BG,
  border: `50% solid ${HERO_HEADER_BG}`,
  width: '617px',
});

const HeroHeaderContent = styled('div')(
  {},
  spacing.withWhiteSpace({
    padding: [
      { size: 2, direction: 'top' },
      { size: 2, direction: 'bottom' },
      { size: 4, direction: 'left' },
      { size: 4, direction: 'right' },
    ],
  }),
);

const HeroHeaderTitle = styled('div')(
  typography.font({ size: 48 }),
  spacing.withWhiteSpace({
    padding: [
      { size: 2, direction: 'top' },
      { size: 2, direction: 'bottom' },
    ],
  }),
);

const HeroHeaderSummary = styled('div')(
  typography.font({ size: 24 }),
  spacing.withWhiteSpace({
    padding: [
      { size: 2, direction: 'top' },
      { size: 2, direction: 'bottom' },
    ],
  }),
);

export const CcHeroHeaderView = (props) => {
  return (
    <HeroHeaderWrapper>
      <HeroHeaderContent>
        <div>
          <Tag className="red">New Article</Tag> 20 January 2022
        </div>

        <HeroHeaderTitle>{props.data.title}</HeroHeaderTitle>
        <HeroHeaderSummary>{props.data.summary}</HeroHeaderSummary>

        <Button buttonColour="white" buttonTextColour={HERO_HEADER_BG}>
          Read article &raquo;
        </Button>
      </HeroHeaderContent>

      <HeroHeaderImage>
        <img src={earth} />
      </HeroHeaderImage>
    </HeroHeaderWrapper>
  );
};
