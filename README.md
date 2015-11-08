# hot-redux-template

A just works template for [React](https://github.com/facebook/react), [redux](https://github.com/rackt/redux), [react-router](https://github.com/rackt/react-router) inspired by Dan Abramov's [react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate).

## Install
```bash
git clone git@github.com:Hanse/hot-redux-template.git new-project-name
cd new-project-name
rm -rf .git
git init
vim package.json # Edit package.json before committing
git add .
git commit -m "Initial commit"
```

## Features

* Hot Reloading
* Nice and shiny errors displayed directly in a browser overlay
* Webpack configuration for development and production
* Testing environment ([mocha](https://github.com/mochajs/mocha), [jsdom](https://github.com/tmpvar/jsdom), [ReactTestUtils](https://facebook.github.io/react/docs/test-utils.html))
* Linting (using [eslint](https://github.com/eslint/eslint))
