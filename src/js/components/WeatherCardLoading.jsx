import React, { PureComponent } from 'react';

class WeatherCardLoading extends PureComponent {
  render() {
    return (
      <article className="weather-card">
        <span role="presentation" className="loading loading-title"></span>
        <span role="presentation" className="loading loading-text"></span>
        <span role="presentation" className="loading loading-text"></span>
      </article>
    );
  }
}

export default WeatherCardLoading;
