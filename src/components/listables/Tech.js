import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { userIsAdmin } from '../../api/auth';
import { updateTechData } from '../../api/data/tech-data';

const Panel = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 120%;
  text-decoration: underline;
`;

const ListContent = styled.div``;

const Button = styled.button`
  display: flex;
  justify-content: right;
  align-items: right;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export default function Tech({ tech, setTechs }) {
  const [showForm, setShowForm] = useState(false);
  const [formInput, setFormInput] = useState('');

  useEffect(() => {
    setFormInput(tech[1]);
  }, [showForm]);

  const handleChange = (e) => {
    setFormInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTechData([tech[0], formInput]).then(setTechs);
    setShowForm(false);
  };

  return (
    <Panel>
      <ListTitle>
        {tech[0]}:
        {userIsAdmin() && !showForm && (
          <Button
            type="button"
            className="blue-button"
            onClick={() => setShowForm(true)}
          >
            {null}
          </Button>
        )}
        {showForm && (
          <ButtonContainer>
            <Button
              type="button"
              className="blue-button"
              onClick={handleSubmit}
            >
              {null}
            </Button>
            <Button
              type="button"
              className="orange-button"
              onClick={() => setShowForm(false)}
            >
              {null}
            </Button>
          </ButtonContainer>
        )}
      </ListTitle>
      {showForm ? (
        <input
          type="text"
          name={tech[0]}
          value={formInput}
          onChange={handleChange}
          style={{ textAlign: 'left' }}
        />
      ) : (
        <ListContent>{tech[1]}</ListContent>
      )}
    </Panel>
  );
}

Tech.propTypes = {
  tech: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTechs: PropTypes.func.isRequired,
};
