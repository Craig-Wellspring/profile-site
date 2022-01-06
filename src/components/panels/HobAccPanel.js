import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { userIsAdmin } from '../../api/auth';
import { getHobAccs } from '../../api/data/hobacc-data';
import HobAccForm from '../forms/HobAccForm';
import HobAccCard from '../listables/HobAccCard';

const HobbiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PanelTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 10px;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 20px;

  flex-wrap: wrap;
  justify-content: center;
  max-width: 500px;
`;

export default function HobAccPanel() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [hobAccs, setHobAccs] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getHobAccs().then((hobbyData) => {
      if (isMounted && hobbyData.length > 0) setHobAccs(hobbyData);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <HobbiesContainer className="section slide-in" id="about" style={{ maxWidth: '85%' }}>
      <PanelTitle>
        Hobbies and Accolades
        {userIsAdmin() && (
          <button
            type="button"
            className={showCreateForm ? 'orange-button' : 'blue-button'}
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            <i className={`fas fa-${showCreateForm ? 'times' : 'plus'}`} />
          </button>
        )}
      </PanelTitle>
      <CardContainer>
        {showCreateForm && (
          <HobAccForm
            setHobAccs={setHobAccs}
            setShowCreateForm={setShowCreateForm}
          />
        )}

        {hobAccs.map((hobby) => (
          <HobAccCard
            key={hobby.firebaseKey}
            obj={hobby}
            setHobAccs={setHobAccs}
            setShowCreateForm={setShowCreateForm}
          />
        ))}
      </CardContainer>
    </HobbiesContainer>
  );
}
