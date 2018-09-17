
import { put, takeLatest,take, all } from 'redux-saga/effects';
import {APIKEY,BASE_URL} from '../components/helper';

function* fetchNews(params) {
  let url, data = params.data;
  if(data.type == 'filter'){
    url = BASE_URL+"/everything?sources="+data.news_id+"&page="+data.count
  }else{
    url = BASE_URL+"/everything?q=all&page="+data.count
  }
  console.log(url)
  try {
    const json = yield fetch(url,{
      headers: {
        "X-Api-Key": APIKEY
      }
    })
      .then(response => response.json());    
    yield put({ type: "NEWS_RECEIVED", json: json.articles,filterName: data.news_name ? data.news_name : null });
  } catch (e) {
    console.log(e)
  }
}

function* getSearchInputData(data) {
  let url, value = data.data && data.data.datas;
  if(value){
    url = BASE_URL+"/everything?sources="+value.news_id+"&q="+data.data.keyword+"&page="+data.data.count;
  }else{
    url = BASE_URL+"/everything?q="+data.data.keyword+"&page="+data.data.count;
  }
  console.log(url)
  try {
    const json = yield fetch(url,{
      headers: {
        "X-Api-Key": APIKEY
      }
    })
      .then(response => response.json());    
    yield put({ type: "SEARCH_BY_INPUT_SUCESS", json: json.articles,filterName: value && value.news_name ? value.news_name :null });
  } catch (e) {
    console.log(e)
  }
}

function* getsources() {
  try {
    const json = yield fetch(BASE_URL+"/sources",{
      headers: {
        "X-Api-Key": APIKEY
      }
    })
      .then(response => response.json());    
    yield put({ type: "GET_SOURCES_SUCCESS", json: json.sources });
  } catch (e) {
    console.log(e)
  }
}

function* getDetailedNews(data) {
  yield put({ type: "DETAILED_NEWS_RECEIVED", payload: data, });
}

function* clearFilterData() {
  yield put({ type: "CLEAR_FILTER_SUCCESS"});
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

function* clearFilter(){
  yield takeLatest('CLEAR_FILTER',clearFilterData)
}

function* getSources() {
  yield takeLatest('GET_SOURCES', getsources)
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