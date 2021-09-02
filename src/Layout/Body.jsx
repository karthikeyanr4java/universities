import React, { useState, useLayoutEffect  } from "react";
import Searchable from "react-searchable-dropdown";
import DataTable, { createTheme } from "react-data-table-component";
import axios from "axios";

createTheme("solarized", {
  text: {
    primary: "#268bd2",
    secondary: "#2aa198",
  },
  background: {
    default: "#002b36",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "#073642",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});

const columns = [
  {
    name: "name",
    selector: "name",
    sortable: true,
    right: true,
  },
  {
    name: "Country",
    selector: "country",
    sortable: true,
  },
  {
    name: "State / Province",
    selector: "stateprovince",
    sortable: true,
    right: true,
  },
  {
    name: "Website",
    selector: "webpages",
    sortable: true,
    right: true,
  },
  {
    name: "Domains",
    selector: "domains",
    sortable: true,
    right: true,
  },
];

// const countries = [{ value: "chocolate", label: "Chocolate" }];

export function Body() {
  const getCountries = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      const list = [];
      for (var i = 0; i < response.data.length; i++) {
        list.push({
          value: response.data[i].name,
          label: response.data[i].name,
        });
      }
      setCountries(list);
      console.log(list);
    });
  };

  const getUniversities = () => {
    axios.get(`http://universities.hipolabs.com/search?country=${country}`).then((response) => {
      const list = [];
      for (var i = 0; i < response.data.length; i++) {
        list.push({
          name: response.data[i].name,
          country: response.data[i].country,
          stateprovince: response.data[i].state,
          webpages: response.data[i].web_pages[0],
          domains: response.data[i].domains[0]
        });
      }
      setUniversityList(list);
    });
  };

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState();
  const [universityList, setUniversityList] = useState();

  useLayoutEffect(() => {
    getCountries()
  }, []);

  return (
    <div className="body">
      <div className="fields">
        <Searchable
          value=""
          placeholder="Search" // by default "Search"
          notFoundText="No result found" // by default "No result found"
          options={countries}
          onSelect={(value) => {
            setCountry(value);
          }}
          listMaxHeight={200} //by default 140
        />
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={getUniversities}
        >
          Search
        </button>
      </div>
      <div className="dataTable">
        <DataTable style={{marginTop: '5%'}} title="Universities" columns={columns} data={universityList} />
      </div>
    </div>
  );
}
