import React from 'react';
import { Eg1, Eg2 } from './examples';

// example static data - to be replaced with data from volto and removed
import { emissionsData } from './TileVis/mock/data';
import { renewablesData } from './TileVis/mock/data';

import './DashboardTile.scss';
import SparkLine from './TileVis/SparkLine/SparkLine';
import Bar from './TileVis/Bar/Bar';
import { useSparkLineData } from '../../hooks';

export const DashboardTileView = ({ data }) => {
    const { sparkLineData } = useSparkLineData(data.data_source);

    return (
        <div className="cc-dashboard-tile">
            <div className="cc-dashboard-tile--header">
                <div className="cc-dashboard-tile--topic">{data.topic}</div>
                <div className="cc-dashboard-tile--title">{data.title}</div>
            </div>

            <Eg2/>
            
            {/* Uncomment below for example SparkLine and horizontal Bar data vis */}
            {/* <SparkLine data={emissionsData} 
            				lineColor={'#1D70B8'}
                            height={150}
            
            /> */}
			{/* <Bar data={renewablesData} height={'24px'} /> */}
            {
                data.href
                    ? <div className="cc-dashboard-tile--footer">
                        <a href={data.href}>{data.linkTitle}</a>
                    </div>
                    : null
            }
        </div>
    );
};
