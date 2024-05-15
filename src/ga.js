// src/ga.js
import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('G-K5TRBLY7BT');
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
