import React, { Component, Fragment } from 'react';

//Components;
import WeatherCard from './WeatherCard';
import WeatherCardLoading from './WeatherCardLoading';
import Select from './Select';
import FilterGroup from './FilterGroup';
import FilterMenuButton from './FilterMenuButton';
import HeaderPortal from './HeaderPortal';

//Utilities;
import { get } from '../utils/fetch';

//Constants;
import cities from '../constants/cities';
import sortOptions from '../constants/sortOptions';
import filterOptions from '../constants/filterOptions';
import {
  weatherIconApiEndpoint,
  locationForecastApiEndpoint,
  toponymSearchApiEndpoint
} from '../constants/apiEndpoints';

class WeatherData extends Component {
  state = {
    weatherData: [],
    isFetchingData: true,
    sortType: sortOptions.options[0].value,
    filters: {},
    isFilterMenuOpen: false
  };

  async componentDidMount() {
    const weatherData = await this.getWeatherData();
    this.setState({ weatherData: weatherData, isFetchingData: false });
  }

  async getCitiesCoordinates() {
    const citiesWithCoordinates = cities.map(async city => {
      return await get(toponymSearchApiEndpoint(city)).then(data => {
        const stedsnavn = data.stedsnavn;
        const cityData = Array.isArray(stedsnavn) ? stedsnavn[0] : stedsnavn;
        return { longitude: cityData.nord, latitude: cityData.aust, name: cityData.stedsnavn };
      });
    });

    return await Promise.all(citiesWithCoordinates);
  }

  async getWeatherData() {
    const citiesWithCoordinates = await this.getCitiesCoordinates();

    const citiesWithWeatherData = citiesWithCoordinates.map(async ({ latitude, longitude, name }) => {
      return await get(locationForecastApiEndpoint(latitude, longitude)).then(data => {
        const weatherData = data.product.time[0].location;
        const rainData = data.product.time[1].location;

        return {
          name,
          temperature: weatherData.temperature.value,
          symbol: rainData.symbol,
          rain: {
            value: rainData.precipitation.value,
            unit: rainData.precipitation.unit
          },
          wind: {
            label: weatherData.windSpeed.name,
            mps: weatherData.windSpeed.mps
          }
        };
      });
    });

    return await Promise.all(citiesWithWeatherData);
  }

  changeSortType = event => this.setState({ sortType: event.target.value });

  toggleFilterMenu = isFilterMenuOpen => this.setState({ isFilterMenuOpen });

  toggleFilter = (category, value) => {
    const { filters } = this.state;

    category in filters && filters[category] === value ? delete filters[category] : (filters[category] = value);

    this.setState({ filters });
  };

  getSortMethod = sortType => {
    const sortMethod = {
      asc: (cityA, cityB) => cityA.name.localeCompare(cityB.name, 'nb'),
      desc: (cityA, cityB) => cityB.name.localeCompare(cityA.name, 'nb'),
      warmest: (cityA, cityB) => (parseFloat(cityA.temperature) < parseFloat(cityB.temperature) ? 1 : -1),
      coldest: (cityA, cityB) => (parseFloat(cityA.temperature) > parseFloat(cityB.temperature) ? 1 : -1),
      rainy: (cityA, cityB) => (parseFloat(cityA.rain.value) < parseFloat(cityB.rain.value) ? 1 : -1),
      notRainy: (cityA, cityB) => (parseFloat(cityA.rain.value) > parseFloat(cityB.rain.value) ? 1 : -1),
      windy: (cityA, cityB) => (parseFloat(cityA.wind.mps) < parseFloat(cityB.wind.mps) ? 1 : -1),
      notWindy: (cityA, cityB) => (parseFloat(cityA.wind.mps) > parseFloat(cityB.wind.mps) ? 1 : -1)
    };

    return sortMethod[sortType];
  };

  getFilterMethod = method => {
    const filterMethods = {
      warm: city => parseFloat(city.temperature) > 0,
      cold: city => parseFloat(city.temperature) <= 0,
      rainy: city => parseFloat(city.rain.value) > 0,
      notRainy: city => parseFloat(city.rain.value) <= 0,
      windy: city => parseFloat(city.wind.mps) > 0,
      notWindy: city => parseFloat(city.wind.mps) <= 0
    };

    return filterMethods[method];
  };

  filterWeatherData = city => {
    const { filters } = this.state;
    const activeFilters = Object.keys(filters);
    const cityMeetsAllFilterCriterias = true;

    if (!activeFilters.length) return true;

    for (const category of activeFilters) {
      const filterValue = filters[category];
      const filterBy = this.getFilterMethod(filterValue);
      const doCityMeetFilterCriteria = filterBy(city);

      if (!doCityMeetFilterCriteria) return false;
    }

    return cityMeetsAllFilterCriterias;
  };

  getWeatherCardsMarkup = () => {
    const { weatherData, sortType } = this.state;
    const sortMethod = this.getSortMethod(sortType);

    const weatherCardsMarkup = weatherData
      .filter(this.filterWeatherData)
      .sort(sortMethod)
      .map((city, index) => (
        <WeatherCard
          key={`${city.name}-${index}`}
          name={city.name}
          temperature={city.temperature}
          wind={city.wind}
          rain={city.rain}
          iconUrl={`${weatherIconApiEndpoint}${city.symbol.number}`}
          iconAlt={city.symbol.id}
        />
      ));

    return weatherCardsMarkup.length ? (
      weatherCardsMarkup
    ) : (
      <p className="no-data-found-message">Fant desverre ingen data som møter kriteriene dine.</p>
    );
  };

  getWeatherCardsLoadingMarkup = () => {
    return cities.map((city, index) => <WeatherCardLoading key={`${city}-loading-${index}`} />);
  };

  render() {
    const { isFetchingData, isFilterMenuOpen } = this.state;
    return (
      <Fragment>
        <HeaderPortal>
          <FilterMenuButton clickHandler={this.toggleFilterMenu} />
        </HeaderPortal>
        <section className={`filter-menu ${isFilterMenuOpen ? 'open' : ''}`}>
          <Select name={sortOptions.name} options={sortOptions.options} onChangeHandler={this.changeSortType} />
          <div className="filter-groups-wrapper">
            <FilterGroup
              category={'temperature'}
              legend={filterOptions.temperature.legend}
              options={filterOptions.temperature.options}
              onCheckHandler={this.toggleFilter}
            />
            <FilterGroup
              category={'rain'}
              legend={filterOptions.rain.legend}
              options={filterOptions.rain.options}
              onCheckHandler={this.toggleFilter}
            />

            <FilterGroup
              category={'wind'}
              legend={filterOptions.wind.legend}
              options={filterOptions.wind.options}
              onCheckHandler={this.toggleFilter}
            />
          </div>
        </section>
        <section className="weather-data">
          {isFetchingData ? this.getWeatherCardsLoadingMarkup() : this.getWeatherCardsMarkup()}
        </section>
      </Fragment>
    );
  }
}

export default WeatherData;
