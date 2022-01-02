import React, { useState } from 'react';
import styled from 'styled-components';
import colorScheme from '../../JSON/globalVars/colorScheme.json';
import resume from '../../resources/CraigWellspringResume2021.pdf';

const ResumePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 350px;
  height: 320px;
`;

const Title = styled.div`
  font-size: 120%;
  text-decoration: underline;
`;

const DownloadLink = styled.a`
  color: ${colorScheme.highlightColor};

  &:hover {
    color: ${colorScheme.warningColor};
  }

  &:active {
    color: ${colorScheme.highlightColor};
  }
`;

const PreviewImage = styled.img`
  position: absolute;
  top: 20px;
  z-index: -1;
  width: 310px;
  height: 280px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 8.5%;
  width: 85%;
  height: 83%;
  background-color: ${colorScheme.backgroundColorFadedDark};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export default function Resume() {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <ResumePanel className="section">
      <PreviewImage
        src="https://i.imgur.com/xfWTxKe.png"
        alt="Resume Preview"
        className="beveled-border"
        onClick={() => setShowOverlay(true)}
      />
      {showOverlay && (
        <Overlay
          className="beveled-border"
          onClick={() => setShowOverlay(false)}
        >
          <Title>Resume</Title>
          <DownloadLink href={resume} target="_blank">
            View
          </DownloadLink>
          <DownloadLink href={resume} download>
            Download
          </DownloadLink>
        </Overlay>
      )}
    </ResumePanel>
  );
}
