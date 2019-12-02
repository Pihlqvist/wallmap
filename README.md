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

## Project file structure
```
wallmap
├── public
├── src                     
│   ├── assets                    # Assets used in project
│   ├── components                # Components
│   │   ├── AddPlace              # Form for adding a place and saving it to DB
│   │   ├── App                   # MAIN App of react, used in index.js
│   │   ├── Dropzone              # Dropzone for image files
│   │   ├── ForgotPassword        # Forgot password form
│   │   ├── Landing               # Landing page 
│   │   ├── MapBox                # Main Map component, draws map and adds markers
│   │   ├── Modal                 # Modal wrapper component, displays other components as modals
│   │   ├── Navigation            # Navigation bar, used on landing/login/signup pages
│   │   ├── Place                 # Place view, used to view a users place/pin
│   │   ├── Places                # Statefull component that houses the map and picks modal
│   │   ├── PlacesTable           # Table of all the users places, dislayed in a modal
│   │   ├── Profile               # Contains profile button used in places and a profile form.
│   │   ├── Route                 # Restricts routing when logged in and logged out. controls session
│   │   ├── SignUp                # Sign up component form
│   │   └── SuggestionInput       # Input with debounced suggestion search list
│   ├── data                
│   │   ├── constants             # Houses our constants used in the project
│   │   └── model
│   │       └── PlaceModel.js     # Imports the data from our DB and makes it available for the app
│   ├── styles                    # styles that are used in more than one component
│   ├── util
│   │   ├── Firebase              # Firebase Auth/DB/Storage API
│   │   ├── Debounce.js           # Debounce hook, used to debounce a value
│   │   ├── UserAuth.js           # Stores the current user session info
│   │   └── WindowSize.js         # Window size hook, gives current windowsize as a object
│   └──  index.js                 # Finds root of html and start react
├── README.md
└── .env                          # Environment file, used to store API keys and such

```
