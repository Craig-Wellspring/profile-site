import React from 'react';
import styled from 'styled-components';
import HobbyCard from '../listables/HobbyCard';
import PanelHeader from '../GenericComponents';
import hobbies from '../../resources/JSON/listableData/hobby-data.json';

const HobbiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px;

  max-width: 800px;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 20px;

  flex-wrap: wrap;
  justify-content: center;
`;

export default function HobbyPanel() {
  return (
    <div style={{ scrollMarginTop: '100px' }}>
      <div className="slide-in on-left">
        <PanelHeader>Hobbies and Accolades</PanelHeader>
        <HobbiesContainer>
          <CardContainer>
            {Object.entries(hobbies).map((hobby) => (
              <HobbyCard key={hobby[0]} obj={hobby} />
            ))}
          </CardContainer>
        </HobbiesContainer>
      </div>
    </div>
  );
}
