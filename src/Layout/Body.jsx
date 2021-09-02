import React, { useState, useLayoutEffect } from "react";
import Searchable from "react-searchable-dropdown";
import DataTable from "react-data-table-component";
import axios from "axios";

const columns = [
  {
    name: "name",
    selector: row => row.name,
    sortable: true,
  },
  {
    name: "Country",
    selector: row => row.country,
    sortable: true,
  },
  {
    name: "State / Province",
    selector: row => row.stateprovince,
    sortable: true,
  },
  {
    name: "Website",
    selector: row => <a href={row.webpages} target="_blank">{row.webpages}</a>,
    sortable: true,
  },
  {
    name: "Domains",
    selector: row => row.domains,
    sortable: true,
  },
];

const paginationOptions = {
	rowsPerPageText: 'Rows per Page',
	rangeSeparatorText: 'Of',
	selectAllRowsItem: true,
	selectAllRowsItemText: 'All',
};

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
    axios
      .get(`http://universities.hipolabs.com/search?country=${country}`)
      .then((response) => {
        const list = [];
        for (var i = 0; i < response.data.length; i++) {
          list.push({
            name: response.data[i].name,
            country: response.data[i].country,
            stateprovince: response.data[i].state,
            webpages: response.data[i].web_pages[0],
            domains: response.data[i].domains[0],
          });
        }
        setUniversityList(list);
      });
  };

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState();
  const [universityList, setUniversityList] = useState();

  useLayoutEffect(() => {
    getCountries();
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
        <DataTable columns={columns} data={universityList} pagination paginationComponentOptions={paginationOptions} />
      </div>
    </div>
  );
}
