# WallMap

## Short description of the project

This is an application where users can create a personal digital traveller map, to pin, store and show the images, information and dates of the places they have visited worldwide, and share that with friends. Friends can then comment and chat with user about each visited place. Pins can be categorised depending on travel reason (business, vacation, etc). 

## What has been done

We have done the main components and layout, user creation and login (authentication), and adding new visited places (not images yet). The places show up on the map as pins which can be clicked on and then pops up a place view/modal with the info of the place (with currently a temp random photo). Also the user can click on List button that shows the list of places visited. The app is connected to Firebase (Authentication and Realtime Database) and deployed (demo) on Firebase.  

## What needs to be done

- Protected Routes
- Continue work on Places view (correct style, more than one image, chatfunction)
- User control (Add/Remove images)
- Fix Map stretching when reload
- Place location should be a geolocation helper. User should be able to search with names.
- User Profile Page
- Create public page that user can share.
- Viewing places from the list view, being able to delete/edit them from there.
- Adding content to About
- Styling and UX (Disticnt look for site and the map)

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
