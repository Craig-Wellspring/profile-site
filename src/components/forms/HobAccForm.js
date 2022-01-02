import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colorScheme from '../../JSON/globalVars/colorScheme.json';
import { createHobAcc, updateHobAcc } from '../../api/data/hobacc-data';

const Card = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${colorScheme.backgroundColorFaded};
  &:hover {
    background-color: ${colorScheme.backgroundColor};
  }
  max-width: 200px;

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
`;

const Title = styled.input`
  width: 98%;
  margin-bottom: 10px;
`;

const Description = styled.textarea`
  width: 98%;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  gap: 5px;
  padding: 10px 5px 0px 5px;
`;

const initialState = {
  name: '',
  desc: '',
  type: '',
  firebaseKey: '',
};

export default function HobAccForm({
  editObj,
  setHobAccs,
  setShowCreateForm,
  setShowEditForm,
}) {
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (editObj.firebaseKey) {
      setFormInput(editObj);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editObj.firebaseKey) {
      updateHobAcc(formInput).then(setHobAccs);
      setShowEditForm(false);
    } else {
      createHobAcc(formInput).then(setHobAccs);
      setShowCreateForm(false);
      setShowEditForm(false);
    }
  };

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const clearForm = () => {
    setFormInput(initialState);
    if (editObj.firebaseKey) {
      setShowEditForm(false);
    } else {
      setShowCreateForm(false);
    }
  };

  return (
    <Card onSubmit={handleSubmit}>
      <Title
        type="text"
        name="name"
        value={formInput.name}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <Description
        name="desc"
        value={formInput.desc}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <ButtonContainer>
        <button type="submit" className="blue-button">
          {null}
        </button>
        <button type="button" className="orange-button" onClick={clearForm}>
          {null}
        </button>
      </ButtonContainer>
    </Card>
  );
}

HobAccForm.propTypes = {
  editObj: PropTypes.shape({
    name: PropTypes.string,
    desc: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
  setHobAccs: PropTypes.func.isRequired,
  setShowCreateForm: PropTypes.func,
  setShowEditForm: PropTypes.func,
};

HobAccForm.defaultProps = {
  editObj: {},
  setShowCreateForm: () => {},
  setShowEditForm: () => {},
};
