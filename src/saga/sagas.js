
import { takeLatest, all } from 'redux-saga/effects';
import { fetchNews, getDetailedNews, getSearchInputData, clearNewsFeed, clearFilterData, getsources } from "./sagaApiServices";
import { GET_NEWS, GET_DETAILED_NEWS, SEARCH_BY_INPUT_PENDING, NEWS_CLEAR, CLEAR_FILTER, GET_SOURCES } from '../actions/actionTypes';

function* newsWatcher() {
     yield takeLatest(GET_NEWS, fetchNews)
}

function* DetailednewsWatcher() {
     yield takeLatest(GET_DETAILED_NEWS, getDetailedNews)
}

function* searchByInput() {
  yield takeLatest(SEARCH_BY_INPUT_PENDING, getSearchInputData)
}

function* clearNews() {
  yield takeLatest(NEWS_CLEAR, clearNewsFeed)
}

function* clearFilter(){
  yield takeLatest(CLEAR_FILTER,clearFilterData)
}

function* getSources() {
  yield takeLatest(GET_SOURCES, getsources)
}

export default function* rootSaga() {
   yield all([
   newsWatcher(),
   DetailednewsWatcher(),
   searchByInput(),
   clearNews(),
   getSources(),
   clearFilter()
   ]);
}