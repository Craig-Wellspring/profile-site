import React from 'react';
import styled from 'styled-components';
import Biography from '../components/panels/Biography';
import Footer from '../components/panels/Footer';
import HobAccPanel from '../components/panels/HobAccPanel';
import Timeline from '../components/panels/Timeline';
import Contact from '../components/panels/Contact';
import Projects from '../components/panels/Projects';
import Technologies from '../components/panels/Technologies';

const HomeScroll = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 40px;
  align-items: center;
  width: 100%;
  position: relative;
  margin: 0px 0px 50px 0px;
  
  @media only screen and (min-width: 800px) {
    height: 7790px;
  }
`;

export default function Home() {
  return (
    <HomeScroll id="homescroll">
      <div id="home" style={{ position: 'absolute', scrollMarginTop: '200px' }} />
      <div style={{ height: '400px', width: '100%' }} />
      <Biography />
      <Projects />
      <Technologies />
      <HobAccPanel />
      <Timeline />
      <Contact />
      <Footer />
    </HomeScroll>
  );
}
