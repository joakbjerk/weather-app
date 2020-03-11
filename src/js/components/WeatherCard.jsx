import React from 'react';

const WeatherCard = ({ name, temperature, wind, rain, iconUrl, iconAlt }) => {
  const isRaining = parseFloat(rain.value) > 0.0;
  const temperaturClass = parseFloat(temperature) > 0 ? 'positive-temperature' : 'negative-temperature';

  return (
    <article className="weather-card">
      <h2 className="weather-card-title">{name}</h2>
      <section className="weather-card-text-row">
        <p className={temperaturClass}>{temperature} &#8451;</p>
        <img
          className="weather-icon"
          src={iconUrl}
          alt={`${iconAlt} i ${name}`}
          title={`${iconAlt}: ${temperature} grader celsius med ${rain.value}${rain.unit} regn og ${wind.mps} m/s ${wind.label}`}
        />
        {isRaining && (
          <p className="weather-card-rain">
            {rain.value} {rain.unit}
          </p>
        )}
      </section>
      <section className="weather-card-text-row">
        <p className="weather-card-wind">
          {wind.label} {wind.mps} m/s
        </p>
      </section>
    </article>
  );
};

export default WeatherCard;
