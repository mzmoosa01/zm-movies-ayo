# ZM Movies

This project was created as part of the tech check assessment for Ayo holdings. It is a simple movie searching application that uses the
[open movie database api](http://omdbapi.com/). The application is mobile and desktop responsive (mobile-first) and is a progressive web application (PWA). 

## Packages used
This application is built using the following packages: 
- Angular
- Angular material
- Angular flexLayout

## Running the application locally
1. Install the http package globally (ng serve does not support PWAs)
> `npm i -g http`
2. Install the npm packages for the application
> `npm i`
3. Run the start command
> `npm run start-pwa`

## Feature list

1. Search shows(movies/series/episode)
2. Display show details
3. Dark mode toggle
4. Cached responses for offline usage

## Architecture
The architecture is divided into the following layers: 
1. core - This is where the root injected services will live. All business logic should occur in this layer
2. modules - Feature modules live here. These modules contain routing and presentational logic but delegate all business logic to the core layer

The core layer is divided into the following sections: 
1. services - This where the http calls are made and should the need arise any connection outside of the application live in this layer
2. states - This where the state management occurs. The states depend on the service layer, map retrieved data and store the data in RXJS observables
3. facades - This is an abstraction layer between the state and component. Should a state observable need to be used in multiple ways, the trasformation can happen here. 

Feature modules contain two types of components
1. pages - these are the container/smart components and handle the business logic and pass data to the presentational components
2. components - These are the presentational/dumb components that are used to build the UI 



