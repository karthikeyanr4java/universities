import React from 'react'
import axios from 'axios'

const countries = [{ value: "chocolate", label: "Chocolate" }];

export class Service {
  getCountries() {
    return countries;
  };
}
