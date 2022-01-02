import React from 'react';
import styled from 'styled-components';
import Footer from '../components/panels/Footer';
import About from './About';
import Portfolio from './Portfolio';
import Technologies from './Technologies';

const HomeScroll = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  align-items: center;
  width: 100%;

  margin: 0px 0px 150px 0px;
`;

export default function Home() {
  return (
    <HomeScroll>
      <div id="home" />
      <About />
      <Portfolio />
      <Technologies />
      <Footer />
    </HomeScroll>
  );
}
