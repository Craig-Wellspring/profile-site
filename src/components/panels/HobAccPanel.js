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
  gap: 20px;
  margin: 20px;

  max-width: 800px;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 20px;

  flex-wrap: wrap;
  justify-content: center;
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
    <div style={{ scrollMarginTop: '50px' }}>
      <div className="slide-in on-left">
        <h2>Hobbies and Accolades</h2>
        <HobbiesContainer>
          <CardContainer>
            {hobAccs.map((hobby) => (
              <HobAccCard
                key={hobby.firebaseKey}
                obj={hobby}
                setHobAccs={setHobAccs}
                setShowCreateForm={setShowCreateForm}
              />
            ))}
            {showCreateForm && (
              <HobAccForm
                setHobAccs={setHobAccs}
                setShowCreateForm={setShowCreateForm}
              />
            )}
          </CardContainer>
          {userIsAdmin() && (
          <button
            type="button"
            className={showCreateForm ? 'orange-button' : 'blue-button'}
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            <i className={`fas fa-${showCreateForm ? 'times' : 'plus'}`} />
          </button>
          )}
        </HobbiesContainer>
      </div>
    </div>
  );
}
