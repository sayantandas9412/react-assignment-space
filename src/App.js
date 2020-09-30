import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";

import MainContent from "./components/Main-Content/MainContent";
import Result from "./components/Result/Result";
import Header from "./components/Header/Header";
import Error from "./components/Error/Error";
import CustomAlert from "./components/customAlert/CustomAlert";
import Footer from "./components/Footer/Footer";
import Story from "./components/TheStory/Story";

const INITIAL_STATE = {
  TotalNumberOfDestination: [
    { name: "Destination-1", id: "AAA1111", disabled: false },
    { name: "Destination-2", id: "BBB2222", disabled: false },
    { name: "Destination-3", id: "CCC3333", disabled: false },
    { name: "Destination-4", id: "DDD4444", disabled: false },
  ],
  loading: true,
  planets: [],
  vehicles: [],
  selectedPlanets: [],
  selectedPlanet: "",
  selectedVehicles: [],
  showVehicles: false,
  selectedId: "AAA1111",
  VehicleTimeArrayForSelectedPlanet: [],
  vehicleDisabled: false,
  timeTaken: 0,
  token: "",
  status: "",
  planetFound: "",
  hasError: false,
  errorMessage: "",
  showAlert: false,
  selectDisabled: false,
  customMessage: "",
  selectedVehicle: "",
  selectionComplete: false,
  showSelections: false,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
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
      let vehiclesData = await vehiclesResponse.json();

      let vehiclesDataUpdated = vehiclesData.map((vehicle) => {
        return { ...vehicle, vehicleDisabled: true };
      });

      this.setState({
        loading: false,
        planets: planetsData,
        vehicles: vehiclesDataUpdated,
        token: token,
      });
    } catch (error) {
      this.setState({ hasError: true, errorMessage: error.message });
      this.props.history.push("/error");
    }
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

    this.setState(
      {
        selectedPlanet: e.target.value,
        selectedPlanets,
        planets: updatedPlanets,
        showVehicles: true,
        vehicleDisabled: false,
        vehicles: updatedVehicles2,
        selectedId,
        VehicleTimeArrayForSelectedPlanet: selectedPlanetVehicleTime,
        selectedVehicle: "",
      },
      () => {
        let numberOfVehiclesAvailable = this.state.vehicles.filter(
          (vehicle) => {
            return vehicle.vehicleDisabled !== true;
          }
        );
        let customMessage = "";
        if (numberOfVehiclesAvailable.length < 1) {
          customMessage = "Oops no vehicles available, reset to continue";
        } else if (numberOfVehiclesAvailable.length === 4) {
          customMessage = `All 4 vehicles available for planet ${this.state.selectedPlanet}`;
        } else if (numberOfVehiclesAvailable.length === 3) {
          customMessage = `Only 3 vehicles can go to this planet ${this.state.selectedPlanet}`;
        } else if (numberOfVehiclesAvailable.length === 2) {
          customMessage = `Only 2 vehicles can go to this planet ${this.state.selectedPlanet}`;
        } else {
          customMessage = `Only 1 vehicle can go to ${this.state.selectedPlanet}`;
        }

        this.setState({ customMessage: customMessage });
      }
    );
  };

  handleVehicleChange = (e) => {
    let selectedVehicle = e.target.value;
    e.target.disabled = true;
    const { vehicles, VehicleTimeArrayForSelectedPlanet } = this.state;
    const VehicleTimeArrayForSelectedPlanetCopy = JSON.parse(
      JSON.stringify(VehicleTimeArrayForSelectedPlanet)
    );

    let timeTakenByVehicleArray = VehicleTimeArrayForSelectedPlanet.length
      ? VehicleTimeArrayForSelectedPlanetCopy.filter((vehicleTime) => {
          return e.target.value === vehicleTime.name;
        })
      : 0;
    let timeTaken = timeTakenByVehicleArray.length
      ? timeTakenByVehicleArray[0].timeTaken
      : 0;

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
      selectedVehicle: selectedVehicle,
    }));
  };
  handleSubmitButton = () => {
    this.setState({ showSelections: true, showAlert: true });
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
        showSelections: false,
        showAlert: false,
      });

      if (this.state.status) {
        this.props.history.push("/result");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleSelectClick = (e) => {
    if (
      this.state.selectedPlanets.length >= 1 &&
      this.state.selectedPlanets.length > this.state.selectedVehicles.length
    ) {
      this.setState({ showAlert: true, selectDisabled: true });
    }
    if (
      this.state.selectedPlanets.length === 4 &&
      this.state.selectedVehicles.length === 4
    ) {
      this.setState({
        showAlert: true,
        selectDisabled: true,
        selectionComplete: true,
      });
    }
  };

  handleAlertClick = () => {
    this.setState({ showAlert: false, selectDisabled: false });
  };

  render() {
    return (
      <div className="App">
        <Header selectedPlanets={this.state.selectedPlanets} />
        {this.state.showAlert ? (
          <CustomAlert
            handleAlertClick={this.handleAlertClick}
            selectedPlanet={this.state.selectedPlanet}
            selectionComplete={this.state.selectionComplete}
            handleFindButton={this.handleFindButton}
            {...this.state}
          />
        ) : null}

        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <MainContent
                {...this.state}
                handleSelectChange={this.handleSelectChange}
                handleSelectClick={this.handleSelectClick}
                handleVehicleChange={this.handleVehicleChange}
                handleSubmitButton={this.handleSubmitButton}
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

          <Route path="/story" render={() => <Story />} />

          <Route
            path="/error"
            render={() => <Error message={this.state.errorMessage} />}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
