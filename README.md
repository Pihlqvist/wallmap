# WallMap

**WallMap** is a digital wall map. Users can make pins to any location in the world and save their photos with comments on how their trip went. The dynamic map and customisable pins make it ideal for showing your friends and family where you have been.

**Screenshot**
![Image of WallMap](https://i.imgur.com/jeCSIdY.png)

## Usage
To create your own development server you need `node/npm` installed. The project have been tested on the lastest stable release, `node v11.15.0` and `npm 6.7.0`.

To get started do the following.
```
git clone https://github.com/Pihlqvist/wallmap.git
cd wallmap
npm install
npm start
```

The development server requier certain environment varibles to be set. These are put in the project root dir (wallmap). Just paste this in a `.env` file and fill in the correct keys.
```
# FIREBASE
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DATABASE_URL=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=

# Opencage
REACT_APP_OCD_API_KEY=

# MAPBOX
REACT_APP_MAPBOX_ACCESS_TOKEN=
```

## Contributors

- Fredrik Pihlqvist fpih@kth.se
- Ali El Tom  eltom@kth.se

## Project file structure (short description/purpose of each file)

### Components

Holds our components

#### Places

Contains the state of the users place objects.
Holds the map compontant that also draws the marker coresponding to places.
Perfomres user interactions such as adding places and viewing places.

#### Firebase

The directory that holds the firebase class that is instanciated only once.
Context for the firebase instance that can be used to access specific references to firebase.

#### Navigation

Navigation panels based on authentication (if a user is logged in or not)

#### Modal

A modal (popup) wrapper that takes a compontant and displays it as a modal. This is used for some of our user interactions.

#### Mapbox

Our map compontant that draws the map and it's markers.

#### Map
Depricated, we decided not to use GoogleMaps. Old legacy code.

#### Logout/Login/Signup/ForgotPassword

Compontants for user authentication.

#### Session

Gives us a authentication hook that we can use to get information on the user or even if we have a logged in user.
This is used currently to handel places.

#### AddPlace

Compontant that handels the users creation of a place object. After the user is done it's stored on our database and the map will update dynamicly.


### Data
Holds constants that we use.
