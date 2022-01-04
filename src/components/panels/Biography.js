import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import colorScheme from '../../JSON/globalVars/colorScheme.json';
import { userIsAdmin } from '../../api/auth';
import { getBioData, updateBioData } from '../../api/data/bio-data';

const Bio = styled.div`
  text-align: left;
`;

const BioInfo = styled.span``;

const EditBioButton = styled.button`
  position: absolute;
  bottom: 0px;
  right: 0px;
`;

const BioEditInput = styled.textarea`
  background-color: ${colorScheme.panelColor};
  color: ${colorScheme.textColor};
  width: 100%;
  height: 100%;

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
    <Bio className="section" id="biography">
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
  );
}
