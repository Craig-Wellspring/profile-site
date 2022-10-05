import React from 'react';
import styled from 'styled-components';
import Biography from '../panels/Biography';
import Footer from '../panels/Footer';
import Contact from '../panels/Contact';
import Projects from '../panels/Projects';
import Technologies from '../panels/Technologies';
import Podcast from '../panels/Podcast';

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
    height: 8400px;
    /* height: 7830px; */
  }
`;

export default function Home() {
  return (
    <HomeScroll id="homescroll">
      <div style={{ height: '800px', width: '100%' }} />
      <Biography />
      <Podcast />
      <Projects />
      <Technologies />
      <Contact />
      {/* <div style={{ height: '200px', width: '100%' }} /> */}
      <Footer />
    </HomeScroll>
  );
}
