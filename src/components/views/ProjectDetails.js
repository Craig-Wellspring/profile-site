import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import colorScheme from '../../resources/JSON/globalVars/colorScheme.json';
import BackButton from '../buttons/BackButton';
import projects from '../../resources/JSON/listableData/project-data.json';

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

const Images = styled.div``;
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
};

export default function ProjectDetails() {
  const { projectKey } = useParams();
  const [project, setProject] = useState(initialState);

  useEffect(() => {
    const prjData = Object.entries(projects).find((prj) => prj[1].id === projectKey);

    setProject(prjData);
  }, []);

  return (
    <Content>
      <Header>{project[0]}</Header>
      <Body>
        <Images>
          <Carousel showThumbs={false}>
            {project[1].images?.map((img) => (
              <Image key={img} src={img} alt="Project Image" />
            ))}
          </Carousel>
        </Images>

        <Section className="section">
          <SubHeader>Project Synopsis</SubHeader>
          {project[1].desc}
        </Section>

        <SubSection>
          <Section className="section">
            <SubHeader>Features</SubHeader>
            {project[1].features?.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </Section>

          <Section className="section">
            <SubHeader>Technologies Utilized</SubHeader>
            {project[1].techs?.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </Section>
        </SubSection>

        <Section className="section">
          <SubHeader>Lessons Learned</SubHeader>
          {project[1].lessons?.map((lesson) => (
            <li key={lesson}>{lesson}</li>
          ))}
        </Section>

        <ButtonTray className="section">
          <BackButton />
          <NavIcon
            href={project[1].githubLink}
            className="navlink"
            target="_blank"
          >
            <i className="fas fa-code-branch" />
          </NavIcon>
          <NavIcon
            href={project[1].deployedLink}
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
