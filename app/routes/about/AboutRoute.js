// @flow

import About from './components/About';
import { connect } from 'react-redux';
import type { State } from 'app/types';

const mapStateToProps = (state: State) => ({
  foo: state.ui.get('foo')
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(About);
