import React from 'react';
import 'firebase/auth';
import styled from 'styled-components';
import SpaceScene from '../three/SpaceScene';
import Navigation from '../components/panels/Navigation';
import Routes from '../routes';

const App = styled.div`
  text-align: center;
  overflow-x: hidden;
  height: 100%;
`;

export default function Initialize() {
  return (
    <>
      <SpaceScene />
      <App id="home">
        <Navigation />
        <Routes />
      </App>
    </>
  );
}
