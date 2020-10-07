## The site is live here https://frosty-archimedes-18871c.netlify.app/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Functionality

To get started you need to select a planet for the 4 Destinations. 

All the 4 select dropdowns are available for selection.

On selecting a planet from the select dropdown, the planet selection for that particular destination is disabled. If you want to select another, please click on the reset button to continue

On selecting a particular planet from the Select dropdown, the vehicles that can travel to that planet will be shown, with those that cannot cover the distance of that planet, those vehicles will be disabled

On selecting a planet for a particular destination, the corresponding vehicle for that planet needs to be chosen first, without selecting a vehicle for that planet if you try selecting another planet, an alert will be shown

On selecting a vehicle, the time taken for that vehicle to react that planet, will be shown in the time taken field, and the quantity of that vehicle will be updated

On selecting all the planets for the 4 destinations and their corresponding vehicles, the Find Falcone button will be enabled, which was earlier disabled

On clicking Find Falcone button, an alert is shown with the planets and vehicles you have chosen

On clicking the Find button on that alert, the result is shown on a different page with either succcess or failure message. 

On the result page, a Start Again button is present, which takes back to the homepage, and the app is reset


## Testing

Enzyme is used for testing and is a part of dev-dependencies, 

`npm run dev` 
`npm run test`
to start the tests



Cypress is also used for integration testing and is a part of dev-dependencies,

`npm run dev` 
`npm run cypress`
to start the tests

Enzyme ->

     fetches data from planets api and returns a successful response
     fetches data from vehicles api and returns a successful response 
     renders 4 PlanetSelection Components 
     renders 6 PlanetOption Components 
     renders 4 VehicleOption Components 
     the default option on select is disabled 

Cypress -> init-spec.js 
                        ->focuses on the select on load
                        ->able to select the planets
                   
        ->app-init-spec.js
                        ->load planets on page load
                        ->load vehicles on page load
                        ->displays an error message on failure
                     
        ->result-spec.js
                        ->clicking on Find Falcone after all the selections and then the Find button
                        
        ->button-spec.js
                        ->Find Falcone button is disabled untill all the planets and vehicles are selected
                        ->the reset button is enabled only when a planet is selected
                        ->the reset button is not present on result page
                        ->The Start Again button is working properly
                        
        ->selection-spec.js
                        ->after selecting a planet selection is disabled for that destination
                        ->after selecting vehicle, all vehicle options for that planet is disabled
                        ->the number of vehicles available changes on selecting a vehicle
                        ->alert shown when vehicle is not selected for particular planet
                        ->alert is removed on clicking button OK
                        ->selected planet option is disabled on next selection
                        
         ->timeTaken-spec.js
                        ->The Time Taken is updated properly
                        ->The Time Taken is updated properly after all selections are completed
                        ->the time taken field is displayed on the results page correctly
                        
                        
                        


