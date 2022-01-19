import React from 'react';
import { ScalarGroup } from './ScalarGroup';
import { TileScalar } from './TileScalar';
import { COLOR_RED, COLOR_GREEN } from '../../colors';

export const Eg1 = () => (
    <ScalarGroup>
        <TileScalar data={{ label: '1884', value: '7.8', href: '#', }}/>
        <TileScalar data={{ label: '2020', value: '9.3', href: '#' }}/>
        <TileScalar data={{ label: 'Difference', value: '+1.5', valueColor: COLOR_RED }}/>
    </ScalarGroup>
);


export const Eg2 = () => (
    <ScalarGroup>
        <TileScalar data={{ label: '1990', value: '2635', href: '#', }}/>
        <TileScalar data={{ label: '2019', value: '1598', href: '#' }}/>
        <TileScalar data={{ label: 'Difference', value: '-1037', valueColor: COLOR_GREEN }}/>
    </ScalarGroup>
);
