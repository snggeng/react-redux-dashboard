# Admin Dashboard Template
This is a template that I often use for many projects that require a dashboard. Since this is a template, other sections of the dashboard have been deliberately left out to make it easy to customize these sections. You may choose to implement this dashboard with any backend API, but for simplicity, I have chosen to include a working example of CRUD and Authentication using [Google's Firebase](https://firebase.google.com/docs/)

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
git clone https://github.com/snggeng/dashboard.git <name_of_repo>
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

If you do not have `yarn` installed, install it globally like this:
```
npm i yarn -g
```
Find out more about yarn [here](https://yarnpkg.com/lang/en/docs/install/)

Alternatively, you may also use `npm`:
```
npm i
npm start
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
