import React from 'react';
import styled from 'styled-components';
import { spacing, typography } from '@govuk-react/lib';
import { COLOR_SECONDARY, COLOR_PRIMARY } from '../../colors';
import { Link } from 'react-router-dom';

const Scalar = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const ScalarLabel = styled('div')(
    typography.font({ size: 16 }),
    spacing.withWhiteSpace({
        margin: [
            { size: 2, direction: 'top', },
            { size: 2, direction: 'bottom', },
        ]
    }),
    {
        color: COLOR_SECONDARY,
    }
);

const ScalarValue = styled('div')(
    typography.font({ size: 24, weight: 'bold', }),
    spacing.withWhiteSpace({
        padding: [
            { size: 1, direction: 'top', },
            { size: 2, direction: 'bottom', },
        ]
    }),
    {
        color: ({ data }) => data.valueColor || COLOR_PRIMARY,
    }
);

export const TileScalar = (props) => {
    const { data: { label, value, href } } = props;

    return (
        <Scalar>
            <ScalarLabel>
                {label}
            </ScalarLabel>
            <ScalarValue {...props}>
                {
                    href
                        ? <Link to={href}>{value}</Link>
                        : value
                }
            </ScalarValue>
        </Scalar>
    );
};