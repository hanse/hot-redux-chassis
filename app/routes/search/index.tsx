import { connect } from 'react-redux';
import qs from 'query-string';
import { search } from 'app/state/search';
import Search from './components/Search';
import { State } from 'app/types';

const mapStateToProps = (state: State, ownProps: any) => ({
  query: qs.parse(ownProps.location.search).q as string | undefined,
  results: state.search.results,
  searching: state.search.searching
});

const mapDispatchToProps = {
  search
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
