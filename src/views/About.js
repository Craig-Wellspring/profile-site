import React from 'react';
import styled from 'styled-components';
import Biography from '../components/panels/Biography';
import HobAccPanel from '../components/panels/HobAccPanel';
// import TimelineShort from '../components/panels/TimelineShort';
// import portrait from '../resources/images/portrait.jpeg';

const Body = styled.div`
  display: flex;
  gap: 20px;

  flex-wrap: wrap;
  justify-content: center;
`;

const BioPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: flex-start;
  gap: 20px;

  max-width: 60%;
`;

const InfoSection = styled.div`
  display: flex;
  gap: 20px;
  max-width: 700px;
  align-self: center;

  justify-content: left;

  @media only screen and (max-width: 750px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

// const Photo = styled.img`
//   max-width: 250px;
//   max-height: 250px;
//   width: 100%;
//   clip-path: polygon(
//     0 10px,
//     10px 0,
//     Calc(100% - 10px) 0,
//     100% 10px,
//     100% Calc(100% - 10px),
//     Calc(100% - 10px) 100%,
//     10px 100%,
//     0% Calc(100% - 10px),
//     0 10px
//   );
// `;

const HobAccSection = styled.div`
  display: flex;
  gap: 20px;

  flex-wrap: wrap;
  justify-content: center;
`;

// const TimelinePanel = styled.div`
//   max-width: 400px;
// `;

export default function About() {
  return (
    <div id="about">
      <Body>
        <BioPanel>
          <InfoSection className="section">
            {/* <Photo src={portrait} alt="portrait" /> */}
            <Biography />
          </InfoSection>

          <HobAccSection>
            <HobAccPanel />
          </HobAccSection>
        </BioPanel>

        {/* <TimelinePanel>
          <TimelineShort />
        </TimelinePanel> */}
      </Body>
    </div>
  );
}
