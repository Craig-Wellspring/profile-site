import React from 'react';
import styled from 'styled-components';
import about from '../../resources/JSON/listableData/about-data.json';
import PanelHeader from '../GenericComponents';
// import Podcast from './Podcast';

const Bio = styled.div`
  text-align: left;
  max-width: 500px;
  margin: 10px;
`;

const BioInfo = styled.span`
  white-space: pre-wrap;
`;

export default function Biography() {
  return (
    <div id="about" style={{ scrollMarginTop: '100px' }}>
      <div className="slide-in on-left">
        <PanelHeader>Bio</PanelHeader>
        <Bio className="section">
          <BioInfo>{about.bio}</BioInfo>
        </Bio>
      </div>
      {/* <Podcast /> */}
    </div>
  );
}
