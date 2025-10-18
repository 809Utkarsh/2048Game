import React from 'react';

const Title = ({ value }) => (
  <div className={`tile ${value ? 'filled' : ''} tile-${value}`}>
    {value !== 0 ? value : ''}
  </div>
);

export default Title;
