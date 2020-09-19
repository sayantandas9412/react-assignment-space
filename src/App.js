import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";

import MainContent from "./components/Main-Content/MainContent";
import Result from "./components/Result/Result";
import Header from "./components/Header/Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TotalNumberOfDestination: [
        { name: "Destination-1", id: "AAA1111" },
        { name: "Destination-2", id: "BBB2222" },
        { name: "Destination-3", id: "CCC3333" },
        { name: "Destination-4", id: "DDD4444" },
      ],
      loading: true,
      planets: [],
      vehicles: [],
      selectedPlanets: [],
      selectedPlanet: "",
      selectedVehicles: [],
      showVehicles: false,
      selectedId: "",
      VehicleTimeArrayForSelectedPlanet: [],
      vehicleDisabled: false,
      timeTaken: 0,
      token: "",
      status: "",
      planetFound: "",
    };
  }

  async componentDidMount() {
    const planetsURL = "https://findfalcone.herokuapp.com/planets";
    const vehiclesURL = "https://findfalcone.herokuapp.com/vehicles";
    const APItoken = "https://findfalcone.herokuapp.com/token";
    const user = {};
    try {
      let planetsResponse = await fetch(planetsURL);
      let vehiclesResponse = await fetch(vehiclesURL);
      let APItokenResponse = await fetch(APItoken, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: user,
      });
      let token = await APItokenResponse.json();
      let planetsData = await planetsResponse.json();
      let vehicleData = await vehiclesResponse.json();

      this.setState({
        loading: false,
        planets: planetsData,
        vehicles: vehicleData,
        token: token,
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate() {
    // console.log("componentDidUpdate");
  }

  handleSelectChange = (e) => {
    const { planets, vehicles, TotalNumberOfDestination } = this.state;

    e.target.disabled = true;

    let selected = TotalNumberOfDestination.filter((destination) => {
      return destination.id === e.target.id;
    });
    let selectedId = selected[0].id;

    //adding to the selected planet DISABLED property
    const nestedPlanetsCopy = JSON.parse(JSON.stringify(planets));
    let updatedPlanets = nestedPlanetsCopy.map((planet) => {
      return planet.name === e.target.value
        ? { ...planet, disabled: true }
        : planet;
    });
    let updatedVehicles2 = [];
    const nestedVehiclesCopy2 = JSON.parse(JSON.stringify(vehicles));
    const nestedPlanetsCopy2 = JSON.parse(JSON.stringify(planets));

    let selectedPlanet = nestedPlanetsCopy2.filter((planet) => {
      return planet.name === e.target.value;
    });
    let planetDistance = selectedPlanet[0].distance;
    updatedVehicles2 = nestedVehiclesCopy2.map((vehicle) => {
      return vehicle.max_distance < planetDistance || vehicle.total_no < 1
        ? { ...vehicle, vehicleDisabled: true }
        : { ...vehicle, vehicleDisabled: false };
    });

    const nestedVehiclesCopy3 = JSON.parse(JSON.stringify(vehicles));
    let selectedPlanetVehicleTime = nestedVehiclesCopy3.map(
      ({ name, speed }) => {
        return { name: name, timeTaken: planetDistance / speed };
      }
    );

    let selectedPlanets =
      this.state.selectedPlanets.length < 4
        ? [...this.state.selectedPlanets, e.target.value]
        : [...this.state.selectedPlanets];

    this.setState({
      selectedPlanet: e.target.value,
      selectedPlanets,
      planets: updatedPlanets,
      showVehicles: true,
      vehicleDisabled: false,
      vehicles: updatedVehicles2,
      selectedId,
      VehicleTimeArrayForSelectedPlanet: selectedPlanetVehicleTime,
    });
  };

  handleVehicleChange = (e) => {
    e.target.disabled = true;
    const { vehicles, VehicleTimeArrayForSelectedPlanet } = this.state;
    const VehicleTimeArrayForSelectedPlanetCopy = JSON.parse(
      JSON.stringify(VehicleTimeArrayForSelectedPlanet)
    );

    let timeTakenByVehicleArray = VehicleTimeArrayForSelectedPlanetCopy.filter(
      (vehicleTime) => {
        return e.target.value === vehicleTime.name;
      }
    );
    let timeTaken = timeTakenByVehicleArray[0].timeTaken;

    const nestedVehiclesCopy = JSON.parse(JSON.stringify(vehicles));
    let updatedVehicles = nestedVehiclesCopy.map((vehicle) => {
      return vehicle.name === e.target.value
        ? { ...vehicle, total_no: vehicle.total_no - 1 }
        : { ...vehicle };
    });

    let selectedVehicles =
      this.state.selectedVehicles.length < 4
        ? [...this.state.selectedVehicles, e.target.value]
        : [...this.state.selectedVehicles];
    this.setState((prevState) => ({
      vehicles: updatedVehicles,
      selectedVehicles,
      vehicleDisabled: true,
      timeTaken: prevState.timeTaken + timeTaken,
    }));
  };

  handleFindButton = async () => {
    const { token, selectedPlanets, selectedVehicles } = this.state;
    const findURL = "https://findfalcone.herokuapp.com/find";
    const postObject = {
      token: token.token,
      planet_names: selectedPlanets,
      vehicle_names: selectedVehicles,
    };
    try {
      let findApiResponse = await fetch(findURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postObject),
      });

      let findApiResult = await findApiResponse.json();

      this.setState({
        status: findApiResult.status,
        planetFound: findApiResult.planet_name,
      });

      if (this.state.status) {
        this.props.history.push("/result");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <MainContent
                {...this.state}
                handleSelectChange={this.handleSelectChange}
                handleVehicleChange={this.handleVehicleChange}
                handleFindButton={this.handleFindButton}
              />
            )}
          />

          <Route
            path="/result"
            render={() => (
              <Result
                status={this.state.status}
                timeTaken={this.state.timeTaken}
                planetFound={this.state.planetFound}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
