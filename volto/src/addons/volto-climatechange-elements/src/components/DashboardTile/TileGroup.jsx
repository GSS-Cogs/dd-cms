import React from 'react';

export const TileGroup = ({ children, columns }) => (
  <div className={`cc-tile-group cc-tile-group--cols-${columns}`}>{children}</div>
)