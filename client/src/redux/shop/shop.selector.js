import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectShopCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectIsCollectionsFetching = createSelector(
  [selectShop],
  shop => shop.collections ? shop.isFetching : true  //data chưa có thì isLoading hết
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectShopCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
  );
