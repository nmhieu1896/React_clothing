import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import PreviewCollection from "../collection-preview/collection-preview.component";
import { selectCollectionsForPreview } from '../../redux/shop/shop.selector';

import "./collections-overview.styles.scss";

const CollectionsOverview = ({ collections }) => (
  <div className="collections-overview">
    {collections.map(({ id, ...collection }) => (
      <PreviewCollection key={id} {...collection} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);
