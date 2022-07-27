import React from 'react';
import styled from 'styled-components';
import Biography from '../panels/Biography';
import Footer from '../panels/Footer';
import HobbyPanel from '../panels/HobbyPanel';
import Timeline from '../panels/Timeline';
import Contact from '../panels/Contact';
import Projects from '../panels/Projects';
import Technologies from '../panels/Technologies';

const HomeScroll = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  row-gap: 40px;
  margin: 0px 0px 50px 0px;

  @media only screen and (min-width: 800px) {
    height: 8500px;
    /* height: 7830px; */
  }
`;

export default function Home() {
  return (
    <HomeScroll id="homescroll">
      <div style={{ height: '800px', width: '100%' }} />
      <Biography />
      <Projects />
      <Technologies />
      <Timeline />
      <HobbyPanel />
      <Contact />
      {/* <div style={{ height: '200px', width: '100%' }} /> */}
      <Footer />
    </HomeScroll>
  );
}
