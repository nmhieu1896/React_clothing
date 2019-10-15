import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionOverview from "./collections-overview.component";

import { selectIsCollectionsFetching } from "../../redux/shop/shop.selector";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionsFetching
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionOverview);

export default CollectionsOverviewContainer;
