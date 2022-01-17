import React from 'react';

export const DashboardTileView = ({ data }) => {
    return (
        <div>
            {data.topic}<br/>
            {data.title}<br/>
        </div>
    );
};
