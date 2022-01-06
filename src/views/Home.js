import React from 'react';
import styled from 'styled-components';
import Biography from '../components/panels/Biography';
import Footer from '../components/panels/Footer';
import HobAccPanel from '../components/panels/HobAccPanel';
import Timeline from '../components/panels/Timeline';
import Contact from '../components/panels/Contact';
import Portfolio from '../components/panels/Portfolio';
import Technologies from '../components/panels/Technologies';

const HomeScroll = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 40px;
  align-items: center;
  width: 100%;
  height: 7705px;

  margin: 0px 0px 50px 0px;
`;

export default function Home() {
  return (
    <HomeScroll>
      <div id="home" style={{ height: '100px' }} />
      <Biography />
      <Portfolio />
      <Technologies />
      <HobAccPanel />
      <Timeline />
      <Contact />
      <Footer />
    </HomeScroll>
  );
}
