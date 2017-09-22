# Admin Dashboard Template
This is a template that I often use for many projects that require a dashboard.

Since this is a template, other sections of the dashboard have been deliberately left out to make it easy to customize these sections. You may choose to implement this dashboard with any backend API, but for simplicity, I have chosen to include a working example of CRUD and Authentication using [Google's Firebase](https://firebase.google.com/docs/).

## Stack
This project was made using React and uses Redux for State Management. If you are unfamiliar with React, or Redux, I recommend checking out the wonderful documentation for [React](https://facebook.github.io/react/docs/hello-world.html) and [Redux](http://redux.js.org/).

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find the most recent version of a guide on using Create React App  [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

* [React](https://facebook.github.io/react)
* [Redux](http://redux.js.org/)
* [Redux Thunk](https://github.com/gaearon/redux-thunk)
* [Axios](https://github.com/mzabriskie/axios)
* [Firebase](https://firebase.google.com/docs/)

## How To Use
Clone this project:
```
git clone https://github.com/snggeng/react-redux-dashboard.git <name_of_repo>
```
Change directory into project:
```
cd <name_of_repo>
```
If you already have `yarn` installed, run the following commands:
```
yarn install
yarn start
```

If you do not have `yarn` installed, install it globally using `homebrew` like this:
```
brew install yarn
```
Find out more about yarn [here](https://yarnpkg.com/lang/en/docs/install/) and homebrew [here](https://brew.sh/).

Alternatively, you may also use `npm`:
```
npm i
npm start
```


You should encounter an error since we have not initialized our database yet.

Set up your firebase database by creating a new project in the [firebase console](https://console.firebase.google.com/). Enter your new project and click on `Add Firebase to your web app`. You should see something that looks like this:
```
<script src="https://www.gstatic.com/firebasejs/4.4.0/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: <String>,           (1)
    authDomain: <String>,       (2)
    databaseURL: <String>,      (3)
    projectId: <String>,        (4)
    storageBucket: <String>,    (5)
    messagingSenderId: <String> (6)
  };
  firebase.initializeApp(config);
</script>
```

Create a `.env` file in your project root and update the following keys with the ones that correspond to the unique keys that your firebase project has:
```
REACT_APP_API_KEY="String from (1)"
REACT_APP_AUTH_DOMAIN="String from (2)"
REACT_APP_DB_URL="String from (3)"
REACT_APP_PID="String from (4)"
REACT_APP_STORAGE_BUCKET="String from (5)"
REACT_APP_MESSAGING_ID="String from (6)"
```

Run `yarn start` or `npm start` to start customizing your own dashboard!

## Demo
You can see a demo of this dashboard [here](admin-dashboard-demo.firebaseapp.com)

To login, use the following credentials:
```
username: admin@dashboard.com
password: password
```

## To Dos
* Update action for individual fields in dashboard
* Refactor CSS and implement CSS Pre/post-processing
* Unit Tests
* Webpack Hot Module Reloading
* Turn dashboard into Progressive Web App

## Contribute
Feel free to contribute to this project by filing an issue or making a pull request.

## License
MIT
