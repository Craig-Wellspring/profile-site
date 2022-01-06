import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colorScheme from '../../JSON/globalVars/colorScheme.json';

const Card = styled.div`
  position: relative;

  width: 350px;
  height: 300px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div``;

const Overlay = styled.div`
  position: absolute;
  top: 2%;
  width: 96%;
  height: 96%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  padding: 10px;
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

  background-color: ${colorScheme.backgroundColorFadedDark};
`;

const Description = styled.div`
  font-size: 85%;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
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
`;

const NavIcon = styled.a`
  font-size: 200%;
  padding: 10px;
`;

const noImgFound = 'https://www.flexx.co/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png';

export default function ProjectCard({ projectObj }) {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <Card>
      <CoverImage
        src={projectObj.images ? projectObj.images[0] : noImgFound}
        alt="Project Preview"
        onClick={() => setShowOverlay(true)}
        className={showOverlay ? 'blur-filter' : ''}
      />
      {showOverlay && (
      <Overlay onClick={() => setShowOverlay(false)}>
        <Title>{projectObj.name}</Title>
        <Description>{projectObj.desc}</Description>
        <div>
          <NavIcon
            href={`/projects/${projectObj.firebaseKey}`}
            className="navlink"
          >
            <i className="fas fa-eye" />
          </NavIcon>
          <NavIcon
            href={projectObj.githubLink}
            className="navlink"
            target="_blank"
          >
            <i className="fas fa-code-branch" />
          </NavIcon>
          <NavIcon
            href={projectObj.deployedLink}
            className="navlink"
            target="_blank"
          >
            <i className="fas fa-laptop" />
          </NavIcon>
        </div>
      </Overlay>
      )}
    </Card>
  );
}

ProjectCard.propTypes = {
  projectObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    desc: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    techs: PropTypes.arrayOf(PropTypes.string),
    lessons: PropTypes.arrayOf(PropTypes.string),
    githubLink: PropTypes.string,
    deployedLink: PropTypes.string,
  }).isRequired,
};
