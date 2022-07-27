import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import colorScheme from '../../resources/JSON/globalVars/colorScheme.json';
import BackButton from '../buttons/BackButton';
import { deleteProject, getProject } from '../../api/data/project-data';
import { userIsAdmin } from '../../api/auth';
import ProjectForm from '../forms/ProjectForm';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 50px;
`;

const Header = styled.div`
  display: flex;

  text-align: center;
  font-size: 200%;
  font-weight: bold;

  padding: 20px;
  border-bottom: 1px solid ${colorScheme.textColor};
`;

const SubHeader = styled.div`
  font-weight: bold;
  font-size: 110%;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid ${colorScheme.textColor};
  margin-bottom: 10px;
`;

const Section = styled.div`
  max-width: 600px;
  text-align: left;
`;

const SubSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  height: 100%;
  padding: 20px;
`;

const Images = styled.div`
`;
const Image = styled.img`
  max-width: 800px;
  max-height: 600px;
  object-fit: contain;
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

const ButtonTray = styled.div`
  display: flex;
  justify-content: center;
`;

const NavIcon = styled.a`
  font-size: 200%;
  padding: 10px;
`;

const initialState = {
  name: '',
  images: [],
  desc: '',
  features: [],
  techs: [],
  lessons: [],
  githubLink: '',
  deployedLink: '',
  firebaseKey: '',
};

export default function ProjectDetails() {
  const { projectKey } = useParams();
  const [project, setProject] = useState(initialState);
  const history = useHistory();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getProject(projectKey).then((prj) => {
      if (isMounted) setProject(prj);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleEdit = () => {
    setShowForm(true);
  };

  const handleDelete = () => {
    deleteProject(projectKey).then(() => {
      history.push('/#projects');
    });
  };

  return (
    <Content>
      <Header>{project.name}</Header>
      <Body>
        <Images>
          <Carousel showThumbs={false}>
            {project.images?.map((img) => (
              <Image key={img} src={img} alt="Project Image" />
            ))}
          </Carousel>
        </Images>

        <Section className="section">
          <SubHeader>Project Synopsis</SubHeader>
          {project.desc}
        </Section>

        <SubSection>
          <Section className="section">
            <SubHeader>Features</SubHeader>
            {project.features?.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </Section>

          <Section className="section">
            <SubHeader>Technologies Utilized</SubHeader>
            {project.techs?.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </Section>
        </SubSection>

        <Section className="section">
          <SubHeader>Lessons Learned</SubHeader>
          {project.lessons?.map((lesson) => (
            <li key={lesson}>{lesson}</li>
          ))}
        </Section>

        {showForm && (
          <ProjectForm
            projectObj={project}
            setShowForm={setShowForm}
            setProject={setProject}
          />
        )}
        {userIsAdmin() && (
          <ButtonTray className="section" style={{ gap: '10px' }}>
            {!showForm && (
              <button
                type="button"
                className="blue-button"
                onClick={handleEdit}
              >
                <i className="fas fa-edit" />
              </button>
            )}
            <button
              type="button"
              className="orange-button"
              onClick={handleDelete}
            >
              <i className="fas fa-trash" />
            </button>
          </ButtonTray>
        )}

        <ButtonTray className="section">
          <BackButton />
          <NavIcon
            href={project.githubLink}
            className="navlink"
            target="_blank"
          >
            <i className="fas fa-code-branch" />
          </NavIcon>
          <NavIcon
            href={project.deployedLink}
            className="navlink"
            target="_blank"
          >
            <i className="fas fa-laptop" />
          </NavIcon>
        </ButtonTray>
      </Body>
    </Content>
  );
}
