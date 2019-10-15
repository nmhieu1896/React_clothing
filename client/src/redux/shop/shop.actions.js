import ShopActionTypes from "./shop.type";
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const updateCollections = collectionsMap => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS,
  payload: collectionsMap
});

export const fetchCollectionStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionStartAsync = () => {
  return (dispatch) => {
    const collectionRef = firestore.collection("collections");
    dispatch(fetchCollectionStart());

    collectionRef.get()
    .then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      dispatch(fetchCollectionSuccess(collectionsMap));
    })
    .catch(error => dispatch(fetchCollectionFailure(error.message)));
  };
};
