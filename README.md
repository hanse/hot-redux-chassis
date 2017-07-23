# hot-redux-chassis [![CircleCI](https://circleci.com/gh/Hanse/hot-redux-chassis/tree/master.svg?style=svg)](https://circleci.com/gh/Hanse/hot-redux-chassis/tree/master)

This repo is a playground for modern web development techniques with a focus on the [React](https://facebook.github.io/react/) eco-system. It is rapidly changing to adopt new versions of popular npm packages and ideas from the community. The code shows how one can glue a mix of these packages together to create cool projects. In addition, the repo itself can serve as a starting point for new projects.

A live production build is always available on [http://hot-redux-chassis.herokuapp.com](http://hot-redux-chassis.herokuapp.com).

## Features

* Next-generation JavaScript using [Babel 6](http://babeljs.io/)
* [React Hot Loader 3](https://github.com/gaearon/react-hot-loader)
* Module bundling using [webpack 2](https://gist.github.com/sokra/27b24881210b56bbaff7)
* Painless esting using [Jest](https://facebook.github.io/jest/) and [enzyme](https://github.com/airbnb/enzyme)
* Static type-checking using [flow](https://flowtye.org)
* [ESLint](http://eslint.org/) for source code linting
* [Redux](https://github.com/rackt/redux), [react-router v4](https://github.com/rackt/react-router) and [Immutable.js](https://facebook.github.io/immutable-js/)
* [redux-observable](https://github.com/redux-observable/redux-observable) for managing async actions and side effects
* Code Splitting with [react-loadable](https://github.com/thejameskyle/react-loadable)
* [CSS Modules](https://github.com/css-modules/css-modules) + [PostCSS](https://github.com/postcss/postcss) for next generation scoped CSS modules

## Start a New Project

To use it, just clone the repo and remove the `.git` folder and start over using your version control system of choice. No friggin' generators. Remember to update your `package.json` and `LICENSE.md`, though.

```bash
git clone git@github.com:Hanse/hot-redux-chassis.git new-project-name
cd new-project-name
rm -rf .git
git init
vim package.json # Edit package.json before committing
git add .
git commit -m "Initial commit"
```

## Atom
[Atom](https://atom.io) is a great editor for modern JavaScript development. With these additional packages it becomes even greater:

* [nuclide](https://atom.io/packages/nuclide)
* [pigments](https://atom.io/packages/pigments)
* [linter-stylelint](https://atom.io/packages/linter-stylelint)
* [linter-eslint](https://atom.io/packages/linter-eslint)

## License
MIT
