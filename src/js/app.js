import React from 'react';
import ReactDOM from 'react-dom';

//Components;
import WeatherData from './components/WeatherData';

const renderTarget = document.querySelector('#app');

ReactDOM.render(<WeatherData />, renderTarget);
