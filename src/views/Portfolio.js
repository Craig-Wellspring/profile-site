import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { userIsAdmin } from '../api/auth';
import { getProjects } from '../api/data/project-data';
import ProjectForm from '../components/forms/ProjectForm';
import ProjectCard from '../components/listables/ProjectCard';

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

export default function Portfolio() {
  const [showForm, setShowForm] = useState(false);

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    let isMounted = true;
    getProjects().then((prjs) => {
      if (isMounted) setProjects(prjs);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Body id="portfolio">
      <ProjectPanel>
        {projects.map((project) => (
          <ProjectCard key={project.firebaseKey} projectObj={project} />
        ))}
      </ProjectPanel>
      {showForm && (
        <ProjectForm setShowForm={setShowForm} setProjects={setProjects} />
      )}
      {userIsAdmin() && !showForm && (
        <button
          type="button"
          className="blue-button"
          onClick={() => setShowForm(true)}
        >
          <i className="fas fa-plus" />
        </button>
      )}
    </Body>
  );
}
