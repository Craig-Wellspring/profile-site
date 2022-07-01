import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { userIsAdmin } from '../../api/auth';
import { deleteHobAcc } from '../../api/data/hobacc-data';
import HobAccForm from '../forms/HobAccForm';
import colorScheme from '../../JSON/globalVars/colorScheme.json';

const Card = styled.div`
  width: 300px;
  height: 300px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const Title = styled.div`
  font-size: 120%;
  padding-bottom: 5px;
  border-bottom: 1px solid ${colorScheme.textColor};
`;

const Icon = styled.i`
  font-size: 50px;
  padding-bottom: 10px;
`;

const Description = styled.div`
  padding: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  gap: 5px;
  padding: 0px 5px 10px 5px;
`;

export default function HobAccCard({ obj, setHobAccs }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const handleDelete = () => {
    deleteHobAcc(obj.firebaseKey).then(setHobAccs);
  };

  const handleEdit = () => {
    setShowEditForm(true);
  };

  return (
    <Card className="section">
      {showEditForm ? (
        <HobAccForm
          setHobAccs={setHobAccs}
          editObj={obj}
          setShowEditForm={setShowEditForm}
        />
      ) : (
        <>
          <Icon className={`fas fa-${obj.icon || 'ban'}`} />
          <Title>{obj.name}</Title>
          <Description>{obj.desc}</Description>
          {userIsAdmin() && (
            <ButtonContainer>
              <button
                type="button"
                className="blue-button"
                onClick={handleEdit}
              >
                {null}
              </button>
              <button
                type="button"
                className="orange-button"
                onClick={handleDelete}
              >
                {null}
              </button>
            </ButtonContainer>
          )}
        </>
      )}
    </Card>
  );
}

HobAccCard.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.string,
    desc: PropTypes.string,
    type: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  setHobAccs: PropTypes.func.isRequired,
};
