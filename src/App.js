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
import {
  planetsURL,
  vehiclesURL,
  tokenURL,
  findURL,
} from "./constants/api-url";
import { homepage, story, error, result } from "./constants/routes";

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
      selectedId: "AAA1111",
      vehicleTimeArrayForSelectedPlanet: [],
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
  }

  // fetching the planet and vehicle data on componentDidMount along with token initialization
  async componentDidMount() {
    const user = {};
    try {
      let planetsResponse = await fetch(planetsURL);
      let vehiclesResponse = await fetch(vehiclesURL);
      let tokenResponse = await fetch(tokenURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: user,
      });
      let token = await tokenResponse.json();
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
      //handling error on fetch, and redirecting to error component
      this.setState({ hasError: true, errorMessage: error.message });
      this.props.history.push("/error");
    }
  }
  // on selecting a planet option, the particular selection gets disabled
  // and the vehicle options are shown
  handleSelectChange = (e) => {
    const { planets, vehicles, TotalNumberOfDestination } = this.state;
    e.target.disabled = true;

    //getting the selected Destination, to render the vehicle
    //options accordingly
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
    //getting the selected planet option name
    const nestedVehiclesCopy2 = JSON.parse(JSON.stringify(vehicles));
    const nestedPlanetsCopy2 = JSON.parse(JSON.stringify(planets));
    let selectedPlanet = nestedPlanetsCopy2.filter((planet) => {
      return planet.name === e.target.value;
    });

    //setting the vehicles disabled that cannot travel to the selected planet
    let planetDistance = selectedPlanet[0].distance;
    updatedVehicles2 = nestedVehiclesCopy2.map((vehicle) => {
      return vehicle.max_distance < planetDistance || vehicle.total_no < 1
        ? { ...vehicle, vehicleDisabled: true }
        : { ...vehicle, vehicleDisabled: false };
    });
    //setting to an object the name of the vehicle and the time taken for it
    //to travel to the selected planet
    const nestedVehiclesCopy3 = JSON.parse(JSON.stringify(vehicles));
    let selectedPlanetVehicleTime = nestedVehiclesCopy3.map(
      ({ name, speed }) => {
        return { name: name, timeTaken: planetDistance / speed };
      }
    );
    //storing the selected planets in an array, which will be sent further on submission
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
        vehicleTimeArrayForSelectedPlanet: selectedPlanetVehicleTime,
        selectedVehicle: "",
      },
      () => {
        //setting the vehicles that are not available for the selected
        // planet to disabled
        let numberOfVehiclesAvailable = this.state.vehicles.filter(
          (vehicle) => {
            return vehicle.vehicleDisabled !== true;
          }
        );
        //setting customMessage for custom alert component
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

        this.setState({ customMessage });
      }
    );
  };

  // on selecting one vehicle the other vehicles are disabled and the
  // quantity of vehicles available is updated
  handleVehicleChange = (e) => {
    let selectedVehicle = e.target.value;
    e.target.disabled = true;
    const { vehicles, vehicleTimeArrayForSelectedPlanet } = this.state;
    const vehicleTimeArrayForSelectedPlanetCopy = JSON.parse(
      JSON.stringify(vehicleTimeArrayForSelectedPlanet)
    );

    let timeTakenByVehicleArray = vehicleTimeArrayForSelectedPlanet.length
      ? vehicleTimeArrayForSelectedPlanetCopy.filter((vehicleTime) => {
          return e.target.value === vehicleTime.name;
        })
      : 0;
    let timeTaken = timeTakenByVehicleArray.length
      ? timeTakenByVehicleArray[0].timeTaken
      : 0;
    // updating the vehicle quantity on selecting one vehicle
    const nestedVehiclesCopy = JSON.parse(JSON.stringify(vehicles));
    let updatedVehicles = nestedVehiclesCopy.map((vehicle) => {
      return vehicle.name === e.target.value
        ? { ...vehicle, total_no: vehicle.total_no - 1 }
        : { ...vehicle };
    });
    //storing the selected vehicles in an array, which will be sent further on submission
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
  //show an alert with the selected vehicles and selected planets
  handleSubmitButton = () => {
    this.setState({ showSelections: true, showAlert: true });
  };

  //handle the POST request and redirect to Result page
  handleFindButton = async () => {
    const { token, selectedPlanets, selectedVehicles } = this.state;

    //Redirect to Error page if token is not initialized
    if (!token.token) {
      this.setState({ hasError: true, showAlert: false });
      this.props.history.push("/error");
      return;
    }
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
      this.setState({ hasError: true, errorMessage: error.message });
      this.props.history.push("/error");
    }
  };

  handleSelectClick = (e) => {
    const { selectedPlanets, selectedVehicles } = this.state;
    if (
      selectedPlanets.length >= 1 &&
      selectedPlanets.length > selectedVehicles.length
    ) {
      this.setState({ showAlert: true, selectDisabled: true });
    }
    if (selectedPlanets.length === 4 && selectedVehicles.length === 4) {
      this.setState({
        showAlert: true,
        selectDisabled: true,
        selectionComplete: true,
      });
    }
  };
  //On clicking the button in alert, the alert is removed
  handleAlertClick = () => {
    this.setState({ showAlert: false, selectDisabled: false });
  };

  render() {
    const {
      selectedPlanets,
      selectedVehicles,
      status,
      hasError,
      selectedPlanet,
      selectionComplete,
      timeTaken,
      planetFound,
      token,
      errorMessage,
    } = this.state;
    return (
      <div className="App">
        <Header
          selectedPlanets={selectedPlanets}
          selectedVehicles={selectedVehicles}
          status={status}
          hasError={hasError}
        />
        {this.state.showAlert ? (
          <CustomAlert
            handleAlertClick={this.handleAlertClick}
            selectedPlanet={selectedPlanet}
            selectionComplete={selectionComplete}
            handleFindButton={this.handleFindButton}
            {...this.state}
          />
        ) : null}

        <Switch>
          <Route
            exact
            path={homepage}
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
            path={result}
            render={() => (
              <Result
                status={status}
                timeTaken={timeTaken}
                planetFound={planetFound}
                token={token}
              />
            )}
          />

          <Route path={story} render={() => <Story />} />

          <Route
            path={error}
            render={() => <Error message={errorMessage} token={token} />}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
