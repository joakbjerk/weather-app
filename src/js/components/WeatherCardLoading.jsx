import React from 'react';

const WeatherCardLoading = () => {
  return (
    <article className="weather-card">
      <span role="presentation" className="loading loading-title"></span>
      <span role="presentation" className="loading loading-text"></span>
      <span role="presentation" className="loading loading-text"></span>
    </article>
  );
};

export default WeatherCardLoading;
