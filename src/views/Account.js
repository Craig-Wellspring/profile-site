import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserPanel from '../components/panels/UserPanel';
import NonUserPanel from '../components/panels/NonUserPanel';
import { currentUID } from '../api/auth';
import Loading from '../components/icons/Loading';

const Body = styled.div`
  padding: 10px;
`;

export default function Account() {
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
    <Body>
      {user === null && <Loading />}
      {currentUID() ? <UserPanel /> : <NonUserPanel />}
    </Body>
  );
}
