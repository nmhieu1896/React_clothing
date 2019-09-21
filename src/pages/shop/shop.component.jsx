import React from "react";
import { Route } from "react-router-dom";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { fetchCollectionStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionsFetching } from '../../redux/shop/shop.selector';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {

  componentDidMount() {
    this.props.fetchCollectionStartAsync();
  }

  render() {
    const {match, isCollectionsFetching} = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={props => <CollectionsOverviewWithSpinner isLoading={isCollectionsFetching} {...props} />} />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={props => <CollectionPageWithSpinner isLoading={isCollectionsFetching} {...props} />}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionsFetching: selectIsCollectionsFetching
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
