import { useEffect, useState } from "react";
import Select, { OptionTypeBase } from "react-select";

import api from "../api";
import City from "../models/city";
import Country from "../models/country";

type Model = Country | City;

const mappingResponse = (data: Array<string>): Model[] =>
  data.map((name) => ({ name } as Model));
const optionLabel = (option: OptionTypeBase): string => option.name;
const optionValue = (option: OptionTypeBase): string =>
  option.name.toLowerCase();

const Main = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [country, setCountry] = useState<Country | null>();
  const [city, setCity] = useState<City | null>();
  const [searchCountry, setSearchCountry] = useState(false);
  const [searchCity, setSearchCity] = useState(false);
  const [population, setPopulation] = useState("");
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingPopulation, setLoadingPopulation] = useState(false);

  const [isInvalid, setInvalid] = useState(false);

  useEffect(() => {
    setLoadingCountries(true);

    api
      .get("/getCountries")
      .then((response) => {
        setCountries(mappingResponse(response.data));
      })
      .finally(() => setLoadingCountries(false));
  }, []);

  useEffect(() => {
    if (country) {
      setLoadingCities(true);

      api
        .get(`/getCities/${country.name}`)
        .then((response) => {
          setCities(mappingResponse(response.data));
        })
        .finally(() => setLoadingCities(false))
        .catch(() => {
        });
    }
  }, [country]);

  useEffect(() => {
    if (city) {
      setLoadingPopulation(true);
      api
        .get(`/getPopulation/${city.name}`)
        .then((response) => {
          console.log("populaaaation: ", city.name);
          if (city.name && response.data === "") {
            setInvalid(true);
            return;
          }
          setPopulation(response.data);
          console.log("population: ", population);
        })
        .finally(() => setLoadingPopulation(false));
    }
  }, [city]);
  useEffect(() => {}, [isInvalid]);

  const handleInputChange = (model: string) => (value: string) => {
    const flag = value.length >= 3;
    if (model === "country") {
      setSearchCountry(flag);
    } else if (model === "city") {
      setSearchCity(flag);
    }
  };

  return (
    <div className="main_card">
      <h1>Autocomplete</h1>
      <Select
        className="comboInput"
        isSearchable
        placeholder="Country"
        value={country}
        onChange={(option) => {
          setCountry(option);
          setCity(null);
          setInvalid(false);
        }}
        options={searchCountry ? countries : []}
        isLoading={loadingCountries}
        onInputChange={handleInputChange("country")}
        getOptionLabel={optionLabel}
        getOptionValue={optionValue}
      />
      <Select
        className="comboInput"
        isSearchable
        placeholder="City"
        value={city}
        onKeyDown={() => {
          console.log("typing:");
          setPopulation("");
          setInvalid(false);
        }}
        onChange={(option) => setCity(option)}
        options={searchCity ? cities : []}
        isLoading={loadingCities}
        onInputChange={handleInputChange("city")}
        getOptionLabel={optionLabel}
        getOptionValue={optionValue}
      />
      <input
        className="textInput"
        readOnly
        placeholder="Latest population count"
        type="text"
        value={population}
      />
      <div className="underline">
        {isInvalid ? "No records. Try again." : null}
      </div>
    </div>
  );
};

export default Main;
