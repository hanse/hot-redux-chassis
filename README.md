# hot-redux-chassis

This repo is a playground for modern web development techniques with a focus on the [React](https://facebook.github.io/react/) eco-system. It is rapidly changing to adopt new versions of popular packages and ideas from the community. The code shows how one can glue a mix of these packages together to create cool projects. In addition, the repo itself can serve as a starting point for new projects.

A live production build is always available on [https://hot-redux-chassis.herokuapp.com](https://hot-redux-chassis.herokuapp.com) (admin:admin).

## Features

- Latest React
- Next-generation JavaScript using [Babel 7](http://babeljs.io/)
- [React Hot Loader](https://github.com/gaearon/react-hot-loader)
- Module bundling using [webpack 4](https://github.com/webpack/webpack/)
- Painless testing using [Jest](https://facebook.github.io/jest/)
- ~~Static type-checking using [Flow](https://flowtype.org)~~ (Rewritten to TypeScript!)
- [ESLint](http://eslint.org/) for linting and [Prettier](https://prettier.org) for auto-formatting
- [Redux](https://github.com/rackt/redux) and [react-router](https://github.com/rackt/react-router)
- [redux-observable](https://github.com/redux-observable/redux-observable) and RxJS for managing async actions and side effects
- [CSS Modules](https://github.com/css-modules/css-modules) + [PostCSS](https://github.com/postcss/postcss) for next generation scoped CSS modules

## GitHub Actions

A CI/CD pipeline is set up with GitHub Actions. The pipeline runs tests, linters, build docker images and publish them to the Package Registry and to Heroku.

## Start a New Project

This is not intended as a boilerplate, but rather to show how to use different things in the JavaScript/React eco-system. When starting out you **should not add every bits and pieces at once**, unless you know what you are doing. If you want everything setup and ready to go, use [create-react-app](https://github.com/facebook/create-react-app)!

## License

MIT
