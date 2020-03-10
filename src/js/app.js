import React from 'react';
import ReactDOM from 'react-dom';

//Components;
import WeatherList from './components/WeatherList';

const renderTarget = document.querySelector('#app');

ReactDOM.render(<WeatherList />, renderTarget);
