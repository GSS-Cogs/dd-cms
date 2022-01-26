import React from 'react';
import { CcHeroHeaderView } from '../CcHeroHeader/CcHeroHeaderView';
import { DashboardTileView } from '../DashboardTile/DashboardTileView';
import { TileGroup } from '../DashboardTile/TileGroup';

export const CcV2Preview = () => (
    <div>
        <CcHeroHeaderView
            data={{
                title: 'Measuring greenhouse gas emissions',
                summary: 'The UK is required to report its estimated greenhouse gas (GHG) emissions on a range of different bases to fulfil a wide range of international agreements as well as for domestic policy making purposes.',
                href: '#',
                linkTitle: 'All climate and weather data',
            }}
        />
        <TileGroup columns={3}>
            <DashboardTileView
                data={{
                    topic: 'Climate and weather',
                    title: 'Annual mean temperature (°C) for the UK',
                    href: '#',
                    linkTitle: 'All climate and weather data',
                }}
            />
            <DashboardTileView
                data={{
                    topic: 'Emissions',
                    title: 'Greenhouse gas emissions (Mt CO2e)',
                    href: '#',
                    linkTitle: 'All emissions data',
                }}
            />
            <DashboardTileView
                data={{
                    topic: 'Drivers',
                    title: 'Annual mean temperature (°C) for the UK',
                    href: '#',
                    linkTitle: 'All drivers data',
                }}
            />
            <DashboardTileView
                data={{
                    topic: 'Impacts',
                    title: 'Ecological status of surface waters in England, 2019',
                    href: '#',
                    linkTitle: 'All impacts data',
                }}
            />
            <DashboardTileView
                data={{
                    topic: 'Mitigation',
                    title: 'Renewable energy share in total energy consumption, UK, 2020',
                    href: '#',
                    linkTitle: 'All mitigation data',
                }}
            />
            <DashboardTileView
                data={{
                    topic: 'Adaptation',
                    title: 'New planting of UK woodlands, thousand hectares',
                    href: '#',
                    linkTitle: 'All adaptation data',
                }}
            />
        </TileGroup>
    </div>
);
