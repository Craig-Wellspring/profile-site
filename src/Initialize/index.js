import React, { useEffect } from 'react';
import styled from 'styled-components';
import SpaceScene from '../three/SpaceScene';
import Navigation from '../components/panels/Navigation';
import Routes from '../routes';

const App = styled.div`
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Initialize() {
  useEffect(() => {
    // DOM ANIMATION
    const sliders = document.querySelectorAll('.slide-in');
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
      threshold: 0,
      rootMargin: '-35% 0px -25% 0px',
    };

    const appearOnScroll = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('on-left')) {
            entry.target.classList.remove('on-left');
            entry.target.classList.add('showingFL');
          }
          if (entry.target.classList.contains('on-right')) {
            entry.target.classList.remove('on-right');
            entry.target.classList.add('showingFR');
          }
          if (entry.target.classList.contains('fade-in')) {
            entry.target.classList.add('showing');
          }
        } else {
          if (entry.target.classList.contains('showingFL')) {
            entry.target.classList.remove('showingFL');
            entry.target.classList.add('on-right');
          }
          if (entry.target.classList.contains('showingFR')) {
            entry.target.classList.remove('showingFR');
            entry.target.classList.add('on-left');
          }
          if (entry.target.classList.contains('fade-in')) {
            entry.target.classList.remove('showing');
          }
        }
      });
    }, appearOptions);

    sliders.forEach((slider) => {
      appearOnScroll.observe(slider);
    });
    faders.forEach((fader) => {
      appearOnScroll.observe(fader);
    });
  }, []);

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
