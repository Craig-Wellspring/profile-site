import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { currentUID } from '../../api/auth';
import Loading from '../icons/Loading';
import NonUserPanel from './NonUserPanel';
import UserPanel from './UserPanel';

const ButtonPanel = styled.div`
  position: absolute;
  right: 0px;
  top: 70px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 800px) {
    left: 0;
  }
`;

export default function AccountPanel() {
  const [user, setUser] = useState(null);

  const checkUser = () => {
    const uid = currentUID();
    if (!uid) {
      window.setTimeout(checkUser, 20);
    } else {
      setUser(uid);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <ButtonPanel>
      {user === null && <Loading />}
      {currentUID() ? <UserPanel /> : <NonUserPanel />}
    </ButtonPanel>
  );
}
