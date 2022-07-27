import React from 'react';
import styled from 'styled-components';
import ProjectCard from '../listables/ProjectCard';
import PanelHeader from '../GenericComponents';
import projects from '../../resources/JSON/listableData/project-data.json';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const ProjectPanel = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;

  max-width: 800px;
`;

export default function Projects() {
  return (
    <div id="projects" style={{ scrollMarginTop: '100px' }}>
      <Body className="slide-in on-left">
        <PanelHeader>Projects</PanelHeader>
        <ProjectPanel>
          {Object.entries(projects).map((project) => (
            <ProjectCard key={project.id} projectObj={project} />
          ))}
        </ProjectPanel>
      </Body>
    </div>
  );
}
