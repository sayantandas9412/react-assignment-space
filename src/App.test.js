import React from "react";
import PlanetAndVehicle from "./components/Planet-And-Vehicle/PlanetAndVehicle";
import PlanetSelection from "./components/PlanetSelection/PlanetSelection";
import { mount, render, shallow } from "enzyme";
import App from "./App";

import PlanetOption from "./components/PlanetOption/PlanetOption";
import VehicleOption from "./components/VehicleOption/VehicleOption";
import { BrowserRouter as Router } from "react-router-dom";

describe("<App />", () => {
  beforeEach(() => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    const wrapper = mount(
      <Router>
        <App />
      </Router>
    );
  });
  afterEach(() => {
    global.fetch.mockClear();
  });
  it("fetches data from planets api and returns a successful response", (done) => {
    expect(global.fetch).toHaveBeenCalledWith(
      "https://findfalcone.herokuapp.com/planets"
    );
    done();
  });

  it("fetches data from vehicles api and returns a successful response", (done) => {
    expect(global.fetch).toHaveBeenCalledWith(
      "https://findfalcone.herokuapp.com/vehicles"
    );
    done();
  });
});

describe("<PlanetAndVehicle />", () => {
  const TotalNumberOfDestination = [
    { name: "Destination-1", id: "AAA1111" },
    { name: "Destination-2", id: "BBB2222" },
    { name: "Destination-3", id: "CCC3333" },
    { name: "Destination-4", id: "DDD4444" },
  ];
  it("renders 4 PlanetSelection Components", () => {
    const props = {};

    const wrapper = shallow(
      <PlanetAndVehicle TotalNumberOfDestination={TotalNumberOfDestination} />
    );
    expect(wrapper.find(PlanetSelection)).toHaveLength(4);
  });

  const props = {
    planets: ["Donlon", "Enchai", "Jebing", "Sapir", "Lerbin", "Pingasor"],
    vehicles: ["Space pod", "Space rocket", "Space shuttle", "Space ship"],
  };

  it("renders 6 PlanetOption Components", () => {
    const wrapper = shallow(<PlanetSelection {...props} />);
    expect(wrapper.find(PlanetOption)).toHaveLength(6);
    expect(wrapper.find(VehicleOption)).toHaveLength(4);
  });

  it("renders 4 VehicleOption Components", () => {
    const wrapper = shallow(<PlanetSelection {...props} />);
    expect(wrapper.find(VehicleOption)).toHaveLength(4);
  });

  it("the default option on select is disabled", () => {
    const wrapper = mount(<PlanetSelection {...props} />);
    expect(wrapper.find({ disabled: true })).toHaveLength(1);
  });
});
