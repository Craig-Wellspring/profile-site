import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colorScheme from '../../JSON/globalVars/colorScheme.json';
import { createProject, updateProject } from '../../api/data/project-data';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  width: 350px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SubDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: left;
  align-items: center;
  width: 100%;
`;

const Separator = styled.div`
  width: 100%;
  padding-bottom: 10px;
  /* border-bottom: 1px solid ${colorScheme.textColor}; */
  margin-bottom: 10px;
`;

const ListHeader = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const ListItem = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
`;

// const notFound = 'https://pbs.twimg.com/profile_images/1354379504920256513/4Ox0Xqft_400x400.jpg';

const initialState = {
  name: '',
  desc: '',
  features: [],
  techs: [],
  lessons: [],
  images: [],
  githubLink: '',
  deployedLink: '',
  firebaseKey: '',
};

export default function ProjectForm({
  projectObj,
  setShowForm,
  setProjects,
  setProject,
}) {
  const [formInput, setFormInput] = useState(initialState);

  // Images
  const [images, setImages] = useState([]);
  useEffect(() => {
    setFormInput((prevState) => ({
      ...prevState,
      images,
    }));
  }, [images]);
  const handleImagesChange = (i, e) => {
    const newImages = [...images];
    newImages[i] = e.target.value;
    setImages(newImages);
  };
  const addImage = () => {
    if (images) {
      setImages([...images, '']);
    } else {
      setImages(['']);
    }
  };
  const removeImage = (i) => {
    const newImages = [...images];
    newImages.splice(i, 1);
    setImages(newImages);
  };

  // Features
  const [features, setFeatures] = useState([]);
  useEffect(() => {
    setFormInput((prevState) => ({
      ...prevState,
      features,
    }));
  }, [features]);
  const handleFeaturesChange = (i, e) => {
    const newFeatures = [...features];
    newFeatures[i] = e.target.value;
    setFeatures(newFeatures);
  };
  const addFeature = () => {
    if (features) {
      setFeatures([...features, '']);
    } else {
      setFeatures(['']);
    }
  };
  const removeFeature = (i) => {
    const newFeatures = [...features];
    newFeatures.splice(i, 1);
    setFeatures(newFeatures);
  };

  // Technologies
  const [techs, setTechs] = useState([]);
  useEffect(() => {
    setFormInput((prevState) => ({
      ...prevState,
      techs,
    }));
  }, [techs]);
  const handleTechsChange = (i, e) => {
    const newTechs = [...techs];
    newTechs[i] = e.target.value;
    setTechs(newTechs);
  };
  const addTech = () => {
    if (techs) {
      setTechs([...techs, '']);
    } else {
      setTechs(['']);
    }
  };
  const removeTech = (i) => {
    const newTechs = [...techs];
    newTechs.splice(i, 1);
    setTechs(newTechs);
  };

  // Lessons
  const [lessons, setLessons] = useState([]);
  useEffect(() => {
    setFormInput((prevState) => ({
      ...prevState,
      lessons,
    }));
  }, [lessons]);
  const handleLessonsChange = (i, e) => {
    const newLessons = [...lessons];
    newLessons[i] = e.target.value;
    setLessons(newLessons);
  };
  const addLesson = () => {
    if (lessons) {
      setLessons([...lessons, '']);
    } else {
      setLessons(['']);
    }
  };
  const removeLesson = (i) => {
    const newLessons = [...lessons];
    newLessons.splice(i, 1);
    setLessons(newLessons);
  };

  useEffect(() => {
    if (projectObj.firebaseKey) {
      setFormInput(projectObj);
      setImages(projectObj.images);
      setFeatures(projectObj.features);
      setTechs(projectObj.techs);
      setLessons(projectObj.lessons);
    }
  }, [projectObj]);

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormInput(initialState);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectObj.firebaseKey) {
      updateProject(formInput).then(setProject);
    } else {
      createProject(formInput).then(setProjects);
    }
    resetForm();
  };

  return (
    <Form className="section" onSubmit={handleSubmit}>
      <ListHeader>
        <i className="fas fa-heading" />
        Title
      </ListHeader>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={formInput.name}
        required
      />
      <Separator />

      <ListHeader>
        <i className="fas fa-images" />
        Images
        <button type="button" className="transparent-button" onClick={addImage}>
          <i className="fas fa-plus-circle navlink" />
        </button>
      </ListHeader>
      {images?.map((image, index) => {
        const i = index;
        return (
          <ListItem key={i}>
            <input
              type="text"
              name="images"
              onChange={(e) => handleImagesChange(index, e)}
              value={image || ''}
              style={{ textAlign: 'left' }}
              required
            />
            <button
              type="button"
              className="transparent-button"
              onClick={() => removeImage(index)}
            >
              <i className="fas fa-times-circle navlink" />
            </button>
          </ListItem>
        );
      })}
      <Separator />

      <ListHeader>
        <i className="fas fa-book" />
        Project Synopsis
      </ListHeader>
      <textarea
        name="desc"
        onChange={handleChange}
        value={formInput.desc}
        style={{ width: '100%' }}
        rows="4"
        required
      />
      <Separator />

      <SubDiv>
        <ListHeader>
          <i className="fas fa-list-ul" />
          Features
          <button
            type="button"
            className="transparent-button"
            onClick={addFeature}
          >
            <i className="fas fa-plus-circle navlink" />
          </button>
        </ListHeader>
        {features?.map((feature, index) => {
          const i = index;
          return (
            <ListItem key={i}>
              <input
                type="text"
                name="features"
                onChange={(e) => handleFeaturesChange(index, e)}
                value={feature || ''}
                style={{ textAlign: 'left' }}
                required
              />
              <button
                type="button"
                className="transparent-button"
                onClick={() => removeFeature(index)}
              >
                <i className="fas fa-times-circle navlink" />
              </button>
            </ListItem>
          );
        })}
        <Separator />

        <ListHeader>
          <i className="fas fa-list-ul" />
          Technologies
          <button
            type="button"
            className="transparent-button"
            onClick={addTech}
          >
            <i className="fas fa-plus-circle navlink" />
          </button>
        </ListHeader>
        {techs?.map((tech, index) => {
          const i = index;
          return (
            <ListItem key={i}>
              <input
                type="text"
                name="techs"
                onChange={(e) => handleTechsChange(index, e)}
                value={tech || ''}
                style={{ textAlign: 'left' }}
                required
              />
              <button
                type="button"
                className="transparent-button"
                onClick={() => removeTech(index)}
              >
                <i className="fas fa-times-circle navlink" />
              </button>
            </ListItem>
          );
        })}
        <Separator />

        <ListHeader>
          <i className="fas fa-list-ul" />
          Lessons
          <button
            type="button"
            className="transparent-button"
            onClick={addLesson}
          >
            <i className="fas fa-plus-circle navlink" />
          </button>
        </ListHeader>
        {lessons?.map((lesson, index) => {
          const i = index;
          return (
            <ListItem key={i}>
              <input
                type="text"
                name="lessons"
                onChange={(e) => handleLessonsChange(index, e)}
                value={lesson || ''}
                style={{ textAlign: 'left' }}
                required
              />
              <button
                type="button"
                className="transparent-button"
                onClick={() => removeLesson(index)}
              >
                <i className="fas fa-times-circle navlink" />
              </button>
            </ListItem>
          );
        })}
        <Separator />

        <ListItem>
          <i className="fab fa-github" />
          GitHub Link
        </ListItem>
        <input
          type="text"
          name="githubLink"
          onChange={handleChange}
          value={formInput.githubLink}
          style={{ textAlign: 'left' }}
          required
        />

        <ListItem>
          <i className="fas fa-laptop" />
          Site Link
        </ListItem>
        <input
          type="text"
          name="deployedLink"
          onChange={handleChange}
          value={formInput.deployedLink}
          style={{ textAlign: 'left' }}
          required
        />
        <Separator />
      </SubDiv>
      <ButtonContainer>
        <button type="submit" className="blue-button">
          <i
            className={`fas fa-${
              projectObj.firebaseKey ? 'check-double' : 'check'
            }`}
          />
        </button>
        <button type="button" className="orange-button" onClick={resetForm}>
          <i className="fas fa-times" />
        </button>
      </ButtonContainer>
    </Form>
  );
}

ProjectForm.propTypes = {
  projectObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    features: PropTypes.arrayOf(PropTypes.string),
    techs: PropTypes.arrayOf(PropTypes.string),
    lessons: PropTypes.arrayOf(PropTypes.string),
    githubLink: PropTypes.string,
    deployedLink: PropTypes.string,
  }),
  setShowForm: PropTypes.func.isRequired,
  setProjects: PropTypes.func,
  setProject: PropTypes.func,
};

ProjectForm.defaultProps = {
  projectObj: {},
  setProjects: () => {},
  setProject: () => {},
};
