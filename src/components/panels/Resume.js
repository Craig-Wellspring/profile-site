import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colorScheme from '../../JSON/globalVars/colorScheme.json';
import resume from '../../resources/CraigWellspringResume2021.pdf';
import cv from '../../resources/CraigWellspringCV2021.pdf';

const ResumePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 325px;
  height: 305px;
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
  top: 10px;
  z-index: -1;
  width: 300px;
  height: 280px;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${colorScheme.backgroundColorFaded};

  color: ${colorScheme.textColor};
  -webkit-text-fill-color: ${colorScheme.textColor};
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: ${colorScheme.backgroundColor};
  font-size: 300%;
  font-weight: 1200;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 30px;
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

export default function Resume({ type }) {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <ResumePanel className="section">
      <PreviewImage
        src={
          type === 'resume'
            ? 'https://i.imgur.com/xfWTxKe.png'
            : 'https://i.imgur.com/xfWTxKe.png'
        }
        alt="Resume Preview"
        className="beveled-border"
      />
      <ImageOverlay
        onClick={() => setShowOverlay(true)}
      >{type === 'resume' ? 'Tech Resume' : 'Curriculum Vitae'}
      </ImageOverlay>
      {showOverlay && (
        <Overlay
          className="beveled-border"
          onClick={() => setShowOverlay(false)}
        >
          <Title>
            {type === 'resume' ? 'Resume' : 'CV'}
          </Title>
          <DownloadLink href={type === 'resume' ? resume : cv} target="_blank">
            View
          </DownloadLink>
          <DownloadLink href={type === 'resume' ? resume : cv} download>
            Download
          </DownloadLink>
        </Overlay>
      )}
    </ResumePanel>
  );
}

Resume.propTypes = {
  type: PropTypes.string.isRequired,
};
