import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colorScheme from '../../resources/JSON/globalVars/colorScheme.json';

const Card = styled.div`
  width: 300px;
  height: 300px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const Title = styled.div`
  font-size: 120%;
  padding-bottom: 5px;
  border-bottom: 1px solid ${colorScheme.textColor};
`;

// const Icon = styled.i`
//   font-size: 50px;
//   padding-bottom: 10px;
// `;

const Description = styled.div`
  padding: 10px;
`;

export default function HobbyCard({ obj }) {
  return (
    <Card className="section">
      {/* <Icon className={`fas fa-${obj[1].icon || 'ban'}`} /> */}
      <Title>{obj[0]}</Title>
      <Description>{obj[1].desc}</Description>
    </Card>
  );
}

HobbyCard.propTypes = {
  obj: PropTypes.shape({
    icon: PropTypes.string,
    desc: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};
