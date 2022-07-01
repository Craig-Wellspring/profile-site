import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import colorScheme from '../../JSON/globalVars/colorScheme.json';
import { userIsAdmin } from '../../api/auth';
import { getBioData, updateBioData } from '../../api/data/bio-data';

const Bio = styled.div`
  text-align: left;
  max-width: 500px;
  margin: 10px;
`;

const BioInfo = styled.span`
  white-space: pre-wrap;
`;

const EditBioButton = styled.button`
  position: absolute;
  bottom: 0px;
  right: 0px;
`;

const BioEditInput = styled.textarea`
  background-color: ${colorScheme.panelColor};
  color: ${colorScheme.textColor};
  min-width: 300px;
  min-height: 400px;

  text-align: left;
`;

export default function Biography() {
  const [bio, setBio] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [bioInput, setBioInput] = useState('');

  useEffect(() => {
    let isMounted = true;
    getBioData().then((data) => {
      if (isMounted) setBio(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const BioEdit = (e) => {
    e.preventDefault();
    if (showForm) {
      setShowForm(false);
      updateBioData({ bio: bioInput }).then(setBio);
    } else {
      setBioInput(bio);
      setShowForm(true);
    }
  };

  const handleChange = (e) => {
    setBioInput(e.target.value);
  };

  return (
    <div id="about" style={{ scrollMarginTop: '50px' }}>
      <div className="slide-in on-left">
        <h2>Bio</h2>
        <Bio className="section">
          {showForm ? (
            <BioEditInput value={bioInput} onChange={handleChange} />
          ) : (
            <BioInfo>{bio}</BioInfo>
          )}
          {userIsAdmin() && (
          <EditBioButton
            type="button"
            className={showForm ? 'orange-button' : 'blue-button'}
            onClick={BioEdit}
          >
            <i className={`fas fa-${showForm ? 'check' : 'edit'}`} />
          </EditBioButton>
          )}
        </Bio>
      </div>
    </div>
  );
}
