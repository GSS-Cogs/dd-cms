import React from 'react';
import { CcArticleHeader } from '../CcArticleHeader/CcArticleHeader';
import { DashboardTileView } from '../DashboardTile/DashboardTileView';
import { TileGroup } from '../DashboardTile/TileGroup';
import { CcArticleList } from '../CcArticleList/CcArticleList';
import { RelatedLinks } from '../RelatedLinks/RelatedLinks';
import { Paragraph } from 'govuk-react';

export const CcV2ArticleView = () => (
  <div>
    <CcArticleHeader
      data={{
        title: 'Measuring greenhouse gas emissions',
        summary: 'The UK is required to report its estimated greenhouse gas (GHG) emissions on a range of different bases to fulfil a wide range of international agreements as well as for domestic policy making purposes.',
        href: '#',
        linkTitle: 'All climate and weather data',
      }}
    />
    <div className="govuk-width-container">
      <Paragraph>
        The report found unequivocal evidence that observed warming of the climate is a consequence of emissions from human activity that has increased the concentration of greenhouse gases in the global atmosphere. Human induced climate change has already affected the severity and frequency of many types of extreme weather and climate events.
      </Paragraph>
    </div>
  </div>
);
