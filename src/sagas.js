
import { put, takeLatest,take, all } from 'redux-saga/effects';
import {APIKEY,BASE_URL} from './helper';

function* fetchNews(count) {
  try {
    const json = yield fetch(BASE_URL+"/everything?q=all&page="+count.data,{
      headers: {
        "X-Api-Key": APIKEY
      }
    })
      .then(response => response.json());    
    yield put({ type: "NEWS_RECEIVED", json: json.articles, });
  } catch (e) {
    console.log(e)
  }
}

function* getSearchInputData(data) {
  try {
    let datas = BASE_URL+"/everything?q="+data.keyword+"&page="+data.count
    console.log(datas)
    const json = yield fetch(BASE_URL+"/everything?q="+data.data.keyword+"&page="+data.data.count,{
      headers: {
        "X-Api-Key": APIKEY
      }
    })
      .then(response => response.json());    
    yield put({ type: "SEARCH_BY_INPUT_SUCESS", json: json.articles, });
  } catch (e) {
    console.log(e)
  }
}

function* getDetailedNews(data) {
  yield put({ type: "DETAILED_NEWS_RECEIVED", payload: data, });
}

function* clearNewsFeed() {
  yield put({ type: "NEWS_CLEARED" });
}

function* newsWatcher() {
     yield takeLatest('GET_NEWS', fetchNews)
}

function* DetailednewsWatcher() {
     yield takeLatest('GET_DETAILED_NEWS', getDetailedNews)
}

function* searchByInput() {
  yield takeLatest('SEARCH_BY_INPUT_PENDING', getSearchInputData)
}

function* clearNews() {
  yield takeLatest('NEWS_CLEAR', clearNewsFeed)
}

export default function* rootSaga() {
   yield all([
   newsWatcher(),
   DetailednewsWatcher(),
   searchByInput(),
   clearNews()
   ]);
}