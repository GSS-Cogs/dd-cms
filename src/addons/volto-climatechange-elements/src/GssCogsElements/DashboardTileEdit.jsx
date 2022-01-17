import React from 'react';
import { DashboardTileView } from './DashboardTileView';

export const DashboardTileEdit = (props) => {
    return (
        <div>
            Tile editor;
            <DashboardTileView {...props} />
        </div>
    );
};
