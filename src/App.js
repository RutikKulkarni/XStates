import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://crio-location-selector.onrender.com/countries");
        setCountries(response.data);
      } catch (error) {
        setError("Error fetching countries");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (selectedCountry) {
        try {
          setLoading(true);
          const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
          setStates(response.data);
          setSelectedState("");
          setCities([]);
          setSelectedCity("");
        } catch (error) {
          setError("Error fetching states");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedCountry && selectedState) {
        try {
          setLoading(true);
          const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
          setCities(response.data);
          setSelectedCity("");
        } catch (error) {
          setError("Error fetching cities");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCities();
  }, [selectedCountry, selectedState]);

  return (
    <div className="city-selector">
      <h1>Select Location</h1>
      {error && <div className="error">{error}</div>}
      <div className="dropdowns">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="dropdown"
          disabled={loading}
          data-testid="country-dropdown"
        >
          <option value="" disabled>
            {loading ? "Loading Countries..." : "Select Country"}
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="dropdown"
          disabled={!selectedCountry || loading}
          data-testid="state-dropdown"
        >
          <option value="" disabled>
            {loading ? "Loading States..." : "Select State"}
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="dropdown"
          disabled={!selectedCountry || !selectedState || loading}
          data-testid="city-dropdown"
        >
          <option value="" disabled>
            {loading ? "Loading Cities..." : "Select City"}
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectedCity && (
        <h2 className="result">
          You selected{" "}
          <span className="highlight">{selectedCity}</span>
          <span className="fade">
            {" "}
            {selectedState}, {selectedCountry}
          </span>
        </h2>
      )}
    </div>
  );
}

export default App;
