import React from 'react';
import { Eg1, Eg2 } from './examples';

import './DashboardTile.scss';

export const DashboardTileView = ({ data }) => {
    return (
        <div className="cc-dashboard-tile">
            <div className="cc-dashboard-tile--topic">{data.topic}</div>
            <div className="cc-dashboard-tile--title">{data.title}</div>
            <Eg2 />
        </div>
    );
};
