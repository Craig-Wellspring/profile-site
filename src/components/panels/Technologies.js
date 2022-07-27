import React from 'react';
import styled from 'styled-components';
import colorScheme from '../../resources/JSON/globalVars/colorScheme.json';
import techIcons from '../../resources/JSON/listableData/techIcons.json';
import techs from '../../resources/JSON/listableData/tech-data.json';
import Tech from '../listables/Tech';
import PanelHeader from '../GenericComponents';

const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;

  text-align: left;
  padding: 10px;
`;

const TechsPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
`;

const IconsPanel = styled.div`
  background-color: ${colorScheme.backgroundColorFaded};
  clip-path: polygon(
    0 10px,
    10px 0,
    Calc(100% - 10px) 0,
    100% 10px,
    100% Calc(100% - 10px),
    Calc(100% - 10px) 100%,
    10px 100%,
    0% Calc(100% - 10px),
    0 10px
  );

  display: flex;
  max-width: 20%;
  @media only screen and (max-width: 900px) {
    max-width: 400px;
  }

  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;

const Icon = styled.i`
  color: ${colorScheme.textColor};
  font-size: 64px;
  margin: 10px;
`;

export default function Technologies() {
  return (
    <div id="technologies" style={{ scrollMarginTop: '100px' }}>
      <div className="slide-in on-left">
        <PanelHeader>Technologies</PanelHeader>
        <Body>
          <TechsPanel className="section">
            {Object.entries(techs).map((entry) => (
              <Tech key={entry[0]} tech={entry} />
            ))}
          </TechsPanel>

          <IconsPanel>
            {Object.values(techIcons).map((icon) => (
              <Icon key={icon.label} className={icon.icon} />
            ))}
          </IconsPanel>
        </Body>
      </div>
    </div>
  );
}
