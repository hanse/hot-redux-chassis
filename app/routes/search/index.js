// @flow

import { connect } from 'react-redux';
import qs from 'query-string';
import { search } from 'app/state/search';
import Search from './components/Search';

const mapStateToProps = (state, ownProps) => ({
  query: qs.parse(ownProps.location.search).q,
  results: state.search
});

const mapDispatchToProps = {
  search
};

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  mapDispatchToProps
)(Search);
