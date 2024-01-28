# XStates

This project implements an interactive location selection component that dynamically populates country, state, and city dropdown menus based on API data. The component provides a seamless user experience for selecting a city, state, and country.

## Application Requirements

### API Endpoints

- **Get All Countries:**
  - Endpoint: `https://crio-location-selector.onrender.com/countries`

- **Get States of a Specific Country:**
  - Endpoint: `https://crio-location-selector.onrender.com/country={countryName}/states`

- **Get Cities of a Specific State in a Specific Country:**
  - Endpoint: `https://crio-location-selector.onrender.com/country={countryName}/state={stateName}/cities`
