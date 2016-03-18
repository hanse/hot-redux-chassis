import 'babel-polyfill';

import sinon from 'sinon';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;

// Include all .js files under `app`, except app.js
// This is for isparta code coverage
const context = require.context('../app', true, /^((?!index).)*\.js$/);
context.keys().forEach(context);
