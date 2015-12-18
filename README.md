# hot-redux-chassis

Just some simple structure to get me started on new projects, because in our world everything is currently a mess.

## Install
```bash
git clone git@github.com:Hanse/hot-redux-chassis.git new-project-name
cd new-project-name
rm -rf .git
git init
vim package.json # Edit package.json before committing
git add .
git commit -m "Initial commit"
```

## Features

* Hot Reloading (Babel 6 + react-transform-hmr)
* Webpack (both development and production configurations)
* Testing setup (Shallow and with JSDom)
* ESLint
* Immutable.js
* PostCSS
* Authentication Flow + User profile fetching
* Notification Center
* HTTP requests using `fetch()`.
