# hot-redux-chassis

Just some simple structure to get me started on new projects, because in our world everything is currently a mess.

## Features

* Next-generation JavaScript using [Babel 6](http://babeljs.io/)
* Hot Reloading ([babel-plugin-react-transform](https://github.com/gaearon/babel-plugin-react-transform) + [react-transform-hmr](https://github.com/gaearon/react-transform-hmr), the new stuff)
* Module bundling using [webpack](https://webpack.github.io/) (both dev and prod)
* Basic testing infrastructure using [mocha](https://mochajs.org/), [expect](https://github.com/mjackson/expect) and [jsdom](https://github.com/tmpvar/jsdom).
* [ESLint](http://eslint.org/) for source code linting
* [Redux](https://github.com/rackt/redux), [react-router](https://github.com/rackt/react-router) and [Immutable.js](https://facebook.github.io/immutable-js/)
* [CSS Modules](https://github.com/css-modules/css-modules) + [PostCSS](https://github.com/postcss/postcss) for sane CSS management
* A simple token authentication flow implementation
* HTTP requests using [`window.fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) + a tiny convenience wrapper for JSON requests.

## Start a New Project

To use it, just clone the repo and remove the `.git` folder and start over using your version control system of choice. No stupid generators. Remember to update your `package.json`, though.

```bash
git clone git@github.com:Hanse/hot-redux-chassis.git new-project-name
cd new-project-name
rm -rf .git
git init
vim package.json # Edit package.json before committing
git add .
git commit -m "Initial commit"
```
