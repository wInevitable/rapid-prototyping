# wInevitable Rapid Prototyping

A prototyping platform built with React, Redux and Firebase for rapidly delivering high quality user experiences in order to validate key features prior to full-scale implementation. Hosted live on the web with a free SSL cert via Firebase Hosting.

## Project/Machine Setup

`$ git clone`

`$ cd winevitable-rapid-prototyping`

Create a file `config.env` in the root directory and fill in the proper credentials. See wInevitable for more information:
```
API_KEY=your-firebase-project-api-key
FACEBOOK_SCOPES=email
HEAP_API_KEY=your-heap-api-key
NODE_ENV=development-or-production
PROJECT_ID=your-firebase-project-id
PROJECT_ID_FOR_BUCKET=your-firebase-bucket-id
SENTRY_API_KEY=your-sentry-api-key
```

`$ npm install`

`$ npm start`

## Deployments

Build the project for deployments to Firebase Hosting:

`$ npm run build`

Install the Firebase CLI on your local machine:

`$ npm install -g firebase-tools`

Authenticate with the Firebase CLI before performing any Firebase-specific options:

`$ firebase login`

Deploy the project with the Firebase CLI (ask to be added to the project first!):

`$ firebase deploy`

## Tech Stack

[Babel](https://babeljs.io/)<br/>
[ClassNames](https://github.com/JedWatson/classnames)<br/>
[JSS](https://github.com/cssinjs/jss)<br/>
[ESLint](http://eslint.org/)<br/>
[Firebase](https://firebase.google.com/)<br/>
[FontAwesome](http://fontawesome.io/examples/)<br/>
[Modular Scale](https://github.com/modularscale/modularscale-sass)<br/>
[Normalize CSS](https://github.com/necolas/normalize.css)<br/>
[React](https://facebook.github.io/react/)<br/>
[React-JSS](https://github.com/cssinjs/react-jss)<br/>
[React-MDL](https://react-mdl.github.io/react-mdl/)<br/>
[Redux](http://redux.js.org/)<br/>
[Vertical Rhythmic](https://github.com/pyrsmk/vertical-rhythmic)<br/>
[Webpack](http://webpack.github.io/docs/)<br/>
