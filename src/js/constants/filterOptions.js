export default {
  temperature: {
    legend: 'Temperatur',
    options: [
      { id: 'filter-warm', value: 'warm', label: 'Varme' },
      { id: 'filter-cold', value: 'cold', label: 'Kulde' }
    ]
  },
  rain: {
    legend: 'Regn',
    options: [
      { id: 'filter-rainy', value: 'rainy', label: 'Regn' },
      { id: 'filter-not-rainy', value: 'notRainy', label: 'Ingen regn' }
    ]
  },
  wind: {
    legend: 'Vind',
    options: [
      { id: 'filter-windy', value: 'windy', label: 'Vind' },
      { id: 'filter-not-windy', value: 'notWindy', label: 'Ingen vind' }
    ]
  }
};
