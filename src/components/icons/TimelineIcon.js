import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Icon = styled.i`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export default function TimelineIcon({ name }) {
  return <Icon className={`fas fa-${name}`} />;
}

TimelineIcon.propTypes = {
  name: PropTypes.string.isRequired,
};
