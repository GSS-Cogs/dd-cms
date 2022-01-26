import React from 'react';
import { CcHeroHeaderView } from '../CcHeroHeader/CcHeroHeaderView';
import { DashboardTileView } from "../DashboardTile/DashboardTileView";
import { TileGroup } from "../DashboardTile/TileGroup";

export const CcV2Preview = () => (
  <div>
    <CcHeroHeaderView
      data={{
        title: 'Measuring greenhouse gas emissions',
        summary: 'The UK is required to report its estimated greenhouse gas (GHG) emissions on a range of different bases to fulfil a wide range of international agreements as well as for domestic policy making purposes.',
      }}
    />
    <TileGroup>
      <DashboardTileView
        data={{
          topic: 'A topic',
          title: 'A l;onger title that works',
        }}
      />
      <DashboardTileView
        data={{
          topic: 'A topic',
          title: 'A l;onger title that works',
        }}
      />
    </TileGroup>
  </div>
)
