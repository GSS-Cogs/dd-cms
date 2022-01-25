import React from 'react';
import { Link } from 'react-router-dom';

export const TileScalar = (props) => {
    const { data: { label, value, href, valueColor } } = props;

    return (
        <div className='cc-tile-scalar'>
            <div className='cc-tile-scalar--label'>
                {label}
            </div>
            <div className={`cc-tile-scalar-value ${valueColor || ''}`}>
                {
                    href
                        ? <Link to={href}>{value}</Link>
                        : value
                }
            </div>
        </div>
    );
};
