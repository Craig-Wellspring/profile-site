import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import Initialize from './Initialize';
import { firebaseConfig } from './api/apiKeys';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

firebase.initializeApp(firebaseConfig);

// DOM
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Initialize />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

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
