# ember-firebase-project

Use this repo as the basis for any Ember project that also needs to use Firebase for authentication.

## Overview

This repository contains some basic configuration useful for any Ember project, including:

- ESLint instead of JSHint
- my standard ESLint config in [.eslintrc.js](.eslintrc.js)
- async/await support via Babel
- better defaults in [ember-cli-build.js](ember-cli-build.js)
- the libs for Firebase and [FirebaseUI for Web](https://github.com/firebase/firebaseui-web)
- authentication code for Firebase
- Moment via [ember-cli-moment-shim](https://github.com/jasonmit/ember-cli-moment-shim)

It should be easy to remove anything that's not wanted.

## Authentication Walkthrough

There's a fair bit of code written to allow for Firebase authentication. Here's how it works:

First, inside of [app/index.html](app/index.html) I've included `firebase.js`, which is necessary for getting Firebase to work. I've also included `firebaseui.js` and `firebaseui.css`, which are necessary for FirebaseUI for Web, the library I'm using for 3rd-party authentication.

I've created an initializer ([app/initializers/initialize-firebase-app.js](app/initializers/initialize-firebase-app.js)) that initializes Firebase based on config options (found in [config/environment.js](config/environment.js)) for the Firebase project being used.

The `index` route redirects to the `sign-in` route, which renders two components used for signing in: The `email-sign-in` component uses the basic Firebase library and a form I coded up to handle signing in via email/password. The `firebase-ui` component uses the FirebaseUI for Web library to handle signing in via a 3rd-party provider. (Note that it *can* handle email/password sign-in as well, but it sucks at that, which is why I'm not using it.)

Once the user uses either component to successfully sign in, the `sign-in` controller pings the `session` service to update its state to reflect the fact the new authentication. It then redirects to the `private` route, which is only accessible to authenticated users.

## Instructions for Using This Repo

This section explains how to set up a new project with this project as its base.

### 1. Clone the repository.

Use git to clone this repository elsewhere.

FIXME: How do you give it a new name? Include the exact git command.

### 2. Rename the Ember project.

The Ember project will still be named `ember-firebase-project`, so you'll probably want to rename it. To do so, simply change the `name` property in [package.json](package.json), then run `ember init` from the command line. Update any files that Ember CLI points out.

Finally, do a global find-and-replace for `ember-firebase-project`.

### 3. Create a Firebase project.

Begin by navigating to the [Firebase console](https://console.firebase.google.com) and creating a new project. By default, this repo uses a dummy project called [ember-firebase-project](https://console.firebase.google.com/project/ember-firebase-project/overview).

Make sure to update the appropriate appropriate variables in [config/environment.js](config/environment.js) to match the new Firebase project. Here are the default values:

```
ENV.firebase.apiKey = 'AIzaSyDRaYc8tph-Zqgz7FtQT-r_PjQ2AyPwGHM';
ENV.firebase.authDomain = 'ember-firebase-project.firebaseapp.com';
ENV.firebase.databaseURL = 'https://ember-firebase-project.firebaseio.com';
ENV.firebase.storageBucket = 'ember-firebase-project.appspot.com';
ENV.firebase.messagingSenderId = '510055927933';
```

### 4. Set up Firebase authentication.

In the console for your Firebase project, click into the authentication section, then follow the instructions in the *Before You Begin* sections for the following sign-in providers:

- [Email/Password](https://firebase.google.com/docs/auth/web/password-auth#before_you_begin)
- [Google](https://firebase.google.com/docs/auth/web/google-signin#before_you_begin)
- [Facebook](https://firebase.google.com/docs/auth/web/facebook-login#before_you_begin)
- [Twitter](https://firebase.google.com/docs/auth/web/twitter-login#before_you_begin)
- [Github](https://firebase.google.com/docs/auth/web/github-auth#before_you_begin)

By default, the project only has email/password authentication enabled.

### 5. Install ESLint.

This Ember project assumes you have ESLint installed globally. If you don't you'll need to run `npm install -g eslint`. You'll also need to globally install some of the plugins being used for a particular rule: `npm install -g babel-eslint eslint-plugin-sort-imports-es6`.

### 6. Update the README.

This README file will no longer be relevant in your new project, so don't forget to update it!
