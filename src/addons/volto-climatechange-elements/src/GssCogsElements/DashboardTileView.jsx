import React from 'react';
import styled from 'styled-components';
import { spacing, typography } from '@govuk-react/lib';
import { PANEL_TEXT } from 'govuk-colours';
import { DASHBOARD_TILE_BACKGROUND, COLOR_SECONDARY, COLOR_PRIMARY } from '../colors';


const DashboardTileContainer = styled('div')(
    {
        background: `${DASHBOARD_TILE_BACKGROUND}`,
        color: `${PANEL_TEXT}`,
    },
    typography.font({ size: 16 }),
    spacing.withWhiteSpace({
        padding: [
            { size: 3, },
        ],
    }),
    {
        display: 'flex',
        flexDirection: 'column',
    },
);

const DashboardTileTopic = styled('div')(
    {
        color: COLOR_SECONDARY,
        ...typography.font({ size: 16, weight: 400. }),
    },
    spacing.withWhiteSpace({
        padding: [
            { size: 0, },
        ],
    }),
);

const DashboardTileTitle = styled('div')(
    {
        color: COLOR_PRIMARY,
        ...typography.font({ size: 19, weight: 'bold' }),
    },
    spacing.withWhiteSpace({
        padding: [
            { size: 1, direction: 'top' },
        ],
    }),
);


export const DashboardTileView = ({ data }) => {
    return (
        <DashboardTileContainer>
            <DashboardTileTopic>{data.topic}</DashboardTileTopic>
            <DashboardTileTitle>{data.title}</DashboardTileTitle>
        </DashboardTileContainer>
    );
};
